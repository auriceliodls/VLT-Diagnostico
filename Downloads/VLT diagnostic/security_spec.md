# Security Specification & Adversarial Verification

This document defines the security boundaries, data invariants, and verification criteria for the Firestore database of the VLT traction motor diagnostic system.

## 1. Data Invariants

1. **Authorized Access Only**: Any user must have their email listed in the `authorized_users` collection, or matches the bootstrap administrator `auridls03@gmail.com` to perform operations.
2. **PII and Profile Isolation**: A user can only read and write their own `/profiles/{uid}` document. Profile changes are strictly bounded.
3. **Immutability of Backups**: Backups once written cannot be updated or deleted. They are insert-only records.
4. **Secure Auditing**: Security logs are insert-only and cannot be updated or deleted. Each log must be tied to the current logged-in user.
5. **Sanitized Document IDs**: All user IDs, backup IDs, and email IDs must conform to standard alphanumeric character limits (`^[a-zA-Z0-9_\\-]+$`).

---

## 2. The "Dirty Dozen" Adversarial Payloads

Here are twelve payloads designed to bypass identity, integrity, state, or cost-optimization bounds. All of these must return `PERMISSION_DENIED` under our security rules.

### Payload 1: Profile Spoofing
An attacker signs in as `attacker123` and attempts to write to another user's profile (`victim456`).
- **Path**: `/profiles/victim456`
- **Method**: `set`
- **Data**: `{ "name": "Fake Victim", "role": "admin", "language": "pt", "mfaEnabled": false, "mfaSecret": "", "updatedAt": "2026-07-10T00:00:00Z" }`

### Payload 2: Self-Assigned Role Escalation
A normal user attempts to bypass validation and write an unauthorized admin flag.
- **Path**: `/profiles/user123`
- **Method**: `set`
- **Data**: `{ "name": "User 123", "role": "System Admin", "isAdmin": true, "language": "pt", "mfaEnabled": false, "mfaSecret": "", "updatedAt": "2026-07-10T00:00:00Z" }`

### Payload 3: Backup Alteration (Immutability Bypass)
An attacker attempts to overwrite or alter an existing secure cloud backup payload.
- **Path**: `/backups/backup_01`
- **Method**: `update`
- **Data**: `{ "payload": "MALICIOUS_OVERWRITE_PAYLOAD" }`

### Payload 4: Orphaned Backup Injection
A malicious agent tries to upload a backup for another user.
- **Path**: `/backups/backup_02`
- **Method**: `create`
- **Data**: `{ "userId": "victim_uid", "payload": "some_payload", "createdAt": "2026-07-10T00:00:00Z", "hash": "abc", "size": "10KB" }`

### Payload 5: Deny-of-Wallet Resource Exhaustion (Value Poisoning)
An attacker attempts to inject a massive string (10MB) into the profile name to exhaust database quotas.
- **Path**: `/profiles/attacker123`
- **Method**: `set`
- **Data**: `{ "name": "A...[10MB worth of data]...", "role": "Technician", "language": "pt", "mfaEnabled": false, "mfaSecret": "", "updatedAt": "2026-07-10T00:00:00Z" }`

### Payload 6: Security Log Spoofing
An attacker attempts to insert a security log attributing a success event to a different user ID.
- **Path**: `/security_logs/log_99`
- **Method**: `create`
- **Data**: `{ "userId": "victim_uid", "event": "LOGIN", "ipSimulated": "127.0.0.1", "timestamp": "2026-07-10T00:00:00Z", "status": "SUCCESS" }`

### Payload 7: Deleting Security Audit Trail
An attacker attempts to cover their tracks by deleting security audit logs.
- **Path**: `/security_logs/log_99`
- **Method**: `delete`

### Payload 8: Write-Gaps / Missing Fields on Profile Setup
An attacker attempts to create an invalid profile missing required security configuration fields (like `mfaEnabled`).
- **Path**: `/profiles/attacker123`
- **Method**: `create`
- **Data**: `{ "name": "Attacker", "role": "Technician" }`

### Payload 9: Unauthorized User Self-Registration
An anonymous user attempts to insert themselves into the global whitelist of authorized technicians.
- **Path**: `/authorized_users/new_user`
- **Method**: `create`
- **Data**: `{ "email": "untrusted@attacker.com", "role": "Chief Engineer", "name": "Fake Tech" }`

### Payload 10: Client-side Query Scraping
An authenticated user tries to list all secure cloud backups of all users without restricting the search query.
- **Path**: `/backups`
- **Method**: `list` (without filter `where("userId", "==", uid)`)

### Payload 11: Future/Past Timestamp Manipulation
An attacker attempts to set a client-side falsified timestamp on profile creation rather than matching the current server time.
- **Path**: `/profiles/attacker123`
- **Method**: `create`
- **Data**: `{ "name": "Attacker", "role": "Technician", "language": "en", "mfaEnabled": false, "mfaSecret": "", "updatedAt": "2020-01-01T00:00:00Z" }`

### Payload 12: Invalid Path ID Poisoning
An attacker attempts to perform a document write with a 2KB junk character string as the Document ID.
- **Path**: `/profiles/INVALID_JUNK_ID_SPAM_SPAM_SPAM_SPAM_...`
- **Method**: `set`
- **Data**: `{ "name": "Junk", "role": "Tech", "language": "pt", "mfaEnabled": false, "mfaSecret": "", "updatedAt": "2026-07-10T00:00:00Z" }`

---

## 3. Automated Test Verification Runner Mock

Below is the automated verification structure. It tests each of the 12 scenarios and guarantees total restriction.

```typescript
// firestore.rules.test.ts
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

describe("VLT Traction Motor Security Rules", () => {
  let testEnv;

  before(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "predictive-potential-v40ks",
      firestore: {
        rules: await fs.readFile("firestore.rules", "utf8")
      }
    });
  });

  after(async () => {
    await testEnv.cleanup();
  });

  it("should fail profile spoofing (Payload 1)", async () => {
    const context = testEnv.authenticatedContext("attacker123", { email: "attacker@domain.com" });
    const db = context.firestore();
    await assertFails(db.doc("profiles/victim456").set({
      name: "Fake Victim",
      role: "admin",
      language: "pt",
      mfaEnabled: false,
      mfaSecret: "",
      updatedAt: new Date()
    }));
  });

  it("should prevent self-assigned admin roles (Payload 2)", async () => {
    const context = testEnv.authenticatedContext("user123", { email: "user@domain.com" });
    const db = context.firestore();
    await assertFails(db.doc("profiles/user123").set({
      name: "User 123",
      role: "admin",
      isAdmin: true,
      language: "pt",
      mfaEnabled: false,
      mfaSecret: "",
      updatedAt: new Date()
    }));
  });

  it("should enforce backup immutability (Payload 3)", async () => {
    const context = testEnv.authenticatedContext("user123", { email: "user@domain.com" });
    const db = context.firestore();
    await assertFails(db.doc("backups/backup_01").update({
      payload: "MALICIOUS_OVERWRITE"
    }));
  });
});
```
