export const VOITH_MANUAL_DATA = `
DADOS TÉCNICOS DO MANUAL VOITH TURBO (VLT):

ERRO 3: Transistor de segurança Grupo de válvulas magnéticas 2 (LOW-SIDE) anômalo.
- Categoria: Erro de controle.
- Efeito imediato: Todas as válvulas magnéticas do grupo 2 estão desligadas.
- Causas de diferenciação:
  * 0000 0001: Rotura de fio no transistor de segurança SiTr2.
  * 0000 0010: Curto-circuito no transistor SiTr2; Cabo ou bobina com curto-circuito a 0 V (bateria) ou à caixa dos redutores.
  * 0000 0100: Suprimento externo a uma ou várias válvulas magnéticas do grupo 2.

ERRO 4: Transistor de segurança Grupo de válvulas magnéticas 3 (LOW-SIDE) defeituoso (Sicherheitstransistor der Magnetventilgruppe 3 defekt).
- Categoria: Erro de controle (Steuerungsfehler).
- Efeito imediato: Todas as válvulas magnéticas do grupo 3 desligadas.
- Causas de diferenciação:
  * 0000 0001: Rotura de fio no transistor SiTr3 (Drahtbruch).
  * 0000 0010: Curto-circuito no transistor SiTr3 ou no cabo/bobina para 0 V (bateria) ou caixa dos redutores (Kurzschluss).
  * 0000 0100: Suprimento externo ao grupo 3 (Fremdeinspeisung).

ERRO 6: Erro de controle memória.
- Categoria: Erro de controle.
- Efeito imediato: Software de controle não funciona em condições perfeitas.
- Causas de diferenciação:
  * 0000 0001: Erro Flash (soma de controle CRC).
  * 0000 0010: Erro IRAM.
  * 0000 0100: Erro área XRAM 1.
  * 0000 1000: Erro área XRAM 2.
  * 0001 0000: RAM externo anômalo.
  * 0010 0000: Célula de memória do contador de frações de tempo anômala.

ERRO 7: Erro de controle Watchdog.
- Categoria: Erro de controle.
- Efeito imediato: Software de controle não funciona em condições perfeitas.
- Causas de diferenciação:
  * 0000 0001: Watchdog anômalo.
  * 0000 0010: Ocorreu reset do Watchdog.
  * 0000 0100: Célula de memória de teste do Watchdog anômala.
  * 0000 1000: Célula de cache para estouro negativo/estouro da pilha do sistema anômala.
  * 0001 0000: Contador do Watchdog parou de contar.
  * 0010 0000: Não é possível repor o contador do Watchdog.

ERRO 8: Erro de controle Processador.
- Categoria: Erro de controle.
- Efeito imediato: Software de controle não funciona em condições perfeitas.
- Causas de diferenciação:
  * 0000 0001: Erro de estouro da pilha do sistema.
  * 0000 0010: Erro de estouro da pilha de usuário.
  * 0000 0100: Conversor A/D anômalo.

ERRO 11: Erro de controle TRAP.
- Categoria: Erro de controle.
- Causas de diferenciação:
  * 0000 0001: Estouro da pilha do sistema TRAP.
  * 0000 0010: Estouro negativo da pilha do sistema TRAP.
  * 0000 0100: Código de comando inválido.
  * 0000 1000: Código de comando 1 inválido.
  * 0001 0000: Acesso de palavra em endereço ímpar.
  * 0010 0000: Código de comando em endereço ímpar.
  * 0100 0000: Acesso a barramento externo não configurado.
  * 1000 0000: NMI-TRAP desencadeado por flanco descendente no pino NMI.

ERRO 12: Erro de controle voltagem 5V.
- Causas: Subvoltagem (0001), Sobrevoltagem (0010).

ERRO 13: Erro de controle voltagem do sensor 12V A.
- Efeito: Sinais do sensor não podem mais ser avaliados de forma inequívoca.
- Causas: Subvoltagem (0001), Sobrevoltagem (0010).

ERRO 15: Erro de controle voltagem 12,5V.
- Efeito: Sinais do sensor não podem mais ser avaliados de forma inequívoca.
- Causas: Subvoltagem (0001), Sobrevoltagem (0010).

ERRO 16: Erro de voltagem 24V.
- Categoria: Erro de controle externo.
- Efeito: Válvulas magnéticas não são acionadas corretamente.
- Causas: Subvoltagem (0001), Sobrevoltagem (0010).

ERRO 17: Erro de controle nvSRAM.
- Causas: Erro de CRC dados identificação hardware (0001), Erro CRC ajustamento (0010), Erro CRC controle (0100), Erro CRC conjunto de dados (1000), Erro gravação página (0001 0000), Erro gravação byte (0010 0000).

ERRO 18: Erro de controle Dados nvSRAM.
- Causas: Memória erros redutores inconsistente (0001), Memória erros motor inconsistente (0010), Memória erros resfriamento inconsistente (0100), Memória erros geral inconsistente (1000), Dados estatísticos inconsistentes (0001 0000).

ERRO 19: Erro de controle TRAP 2.
- Causa: TRAP System Request 0 (0001).

ERRO 20: Erro de controle voltagem 3,3V.
- Causas: Subvoltagem (0001), Sobrevoltagem (0010).

ERRO 21: Erro de controle voltagem de referência conversor AD.
- Causas: Subvoltagem (0001), Sobrevoltagem (0010).

ERRO 22: Temperatura excessiva aparelho de controle interno.
- Efeito: O controle registra que foi atingido um limiar de temperatura.
- Causa: Pré-aviso temperatura excessiva atingido (0001).

ERRO 23: Pré-aviso temperatura do aparelho de controle interno.
- Efeito: O controle registra que foi atingido um limiar de temperatura.
- Causa: Pré-aviso limiar de temperatura atingido (0001).

ERRO 24: Erro de controle pulso de sistema.
- Efeito: Software de controle não funciona em condições perfeitas.
- Causa: Frequência de pulso errada (0001).

ERRO 41: Erro de inicialização Interface CAN.
- Categoria: Erro de controle.
- Efeito imediato: O controle não consegue receber dados corretos ou mesmo nenhuns dados através do barramento CAN.
- Causas de diferenciação:
  * 0000 0001: Controlador CAN 1 e/ou 2 anômalo.
  * 0000 0010: Erro de software interno.
  * 0000 0100: Erro de software interno.

ERRO 45: Erro de protocolo VTCnet.
- Categoria: Erro de controle.
- Efeito imediato: O controle não consegue receber dados corretos ou mesmo nenhuns dados através do barramento CAN.
- Causas de diferenciação:
  * 0000 0001: Erro de software interno.
  * 0000 0010: Tempo esgotado de pelo menos uma mensagem de recepção.

ERRO 46: Erro de protocolo SAE J1939.
- Categoria: Erro de controle.
- Efeito imediato: O controle não consegue receber dados corretos ou mesmo nenhuns dados através do barramento CAN.
- Causas de diferenciação:
  * 0000 0001: Erro de software interno.
  * 0000 0010: Tempo esgotado de pelo menos uma mensagem de recepção.

ERRO 48: Erro de comunicação Gateway CAN I/O.
- Categoria: Erro de controle.
- Efeito imediato: O controle não consegue receber dados corretos ou mesmo nenhuns dados através do barramento CAN.
- Causas de diferenciação:
  * 0000 0001: Erro de software interno.
  * 0000 0010: Tempo esgotado da mensagem de pulsação.
  * 0000 0100: Erro de software interno.
  * 0000 1000: Erro de software interno.
  * 0001 0000: Erro de software interno.
  * 0010 0000: Erro de software interno.
  * 0100 0000: Erro de software interno.
  * 1000 0000: Módulo com status de erro.

ERRO 49: Mensagem de emergência Gateway CAN I/O.
- Categoria: Erro de controle.
- Efeito imediato: O controle não consegue receber dados corretos ou mesmo nenhuns dados através do barramento CAN.
- Causas de diferenciação:
  * 0000 0001: Curto-circuito nas saídas digitais.
  * 0000 0010: Erro de comunicação CAN.
  * 0000 0100: Erro de comunicação no módulo do barramento L.
  * 0000 1000: Entradas analógicas no modo de erro.
  * 0001 0000: Saídas analógicas no modo de erro.
  * 0010 0000: Entradas digitais no modo de erro.
  * 0100 0000: Saídas digitais no modo de erro.
  * 1000 0000: Erro na EEPROM.

ERRO 100: Cabo do sensor não plugado.
- Categoria: Erro da fiação.
- Efeito imediato: O controle não consegue receber sinais dos sensores.
- Causas de diferenciação:
  * 0000 0001: Cabo do sensor não plugado.

ERRO 118: Sensor de temperatura Aparelho de controle interno (TS_VTIC) anômalo.
- Categoria: Erro do sensor.
- Efeito imediato: A temperatura no aparelho de controle já não pode ser determinada.
- Causas de diferenciação:
  * 0000 0001: Rotura de fio junto ao/no TS_VTIC.
  * 0000 0010: Curto-circuito junto ao/no TS_VTIC.
  * 0000 0100: Contato intermitente no TS_VTIC.

ERRO 136: Sensor de freqüência Velocidade de saída 1 (FS_N2_1) anômalo.
- Categoria: Erro do sensor.
- Efeito imediato: A velocidade de saída já não pode ser determinada com o FS_N2_1.
- Causas de diferenciação:
  * 0000 0001: Rotura de fio no chicote de fiação elétrica dos sensores/na fiação ou no FS_N2_1.
  * 0000 0010: Curto-circuito no chicote de fiação elétrica dos sensores/na fiação ou no FS_N2_1.
  * 0000 0100: Freqüência máxima excedida.

ERRO 139: Pelo menos um sensor de freqüência velocidade de saída e informação de velocidade redundante anômalo.
- Categoria: Erro do sensor.
- Efeito imediato: A velocidade de saída já não pode ser determinada.
- Causas de diferenciação:
  * 0000 0001: Erro de redundância.

ERRO 140: Chave de proximidade Inversão Sentido de giro A (NS_WS_A) anômala.
- Categoria: Erro do sensor.
- Efeito imediato: A posição final do sentido de giro A já não pode ser determinada.
- Causas de diferenciação:
  * 0000 0001: Rotura de fio no chicote de fiação elétrica dos sensores/na fiação ou no NS_WS_A.
  * 0000 0010: Curto-circuito no chicote de fiação elétrica dos sensores/na fiação ou no NS_WS_A.

ERRO 141: Chave de proximidade Inversão Sentido de giro B (NS_WS_B) anômala.
- Categoria: Erro do sensor.
- Efeito imediato: A posição final do sentido de giro B já não pode ser determinada.
- Causas de diferenciação:
  * 0000 0001: Rotura de fio no chicote de fiação elétrica dos sensores/na fiação ou no NS_WS_B.
  * 0000 0010: Curto-circuito no chicote de fiação elétrica dos sensores/na fiação ou no NS_WS_B.

ERRO 223: Válvula magnética Inversão Sentido de giro A (MV_WS_A) anômala.
- Categoria: Erro da válvula magnética.
- Efeito imediato: O MV_WS_A é desligado. O sentido de giro A não pode ser carregado.
- Causas de diferenciação:
  * 0000 0001: Rotura de fio no chicote de fiação elétrica dos atuadores/na fiação ou no MV_WS_A.
  * 0000 0010: Curto-circuito no chicote de fiação elétrica dos atuadores/na fiação ou no MV_WS_A.

ERRO 224: Corrente inadmissível na válvula magnética Inversão Sentido de giro A (MV_WS_A).
- Categoria: Erro da válvula magnética.
- Efeito imediato: O MV_WS_A pode ser ligado sem permissão; O MV_WS_A não é regulado corretamente.
- Causas de diferenciação:
  * 0000 0001: O controle mede uma corrente inadmissível no MV_WS_A desligado.
  * 0000 0010: A corrente real do MV_WS_A é maior do que a corrente nominal do controle.
  * 0000 0100: A corrente real do MV_WS_A é menor do que a corrente nominal do controle.

ERRO 225: Válvula magnética Inversão Sentido de giro B (MV_WS_B) anômala.
- Categoria: Erro da válvula magnética.
- Efeito imediato: O MV_WS_B é desligado. O sentido de giro B não pode ser carregado.
- Causas de diferenciação:
  * 0000 0001: Rotura de fio no chicote de fiação elétrica dos atuadores/na fiação ou no MV_WS_B.
  * 0000 0010: Curto-circuito no chicote de fiação elétrica dos atuadores/na fiação ou no MV_WS_B.

ERRO 226: Corrente inadmissível na válvula magnética Inversão Sentido de giro B (MV_WS_B).
- Categoria: Erro da válvula magnética.
- Efeito imediato: O MV_WS_B pode ser ligado sem permissão; O MV_WS_B não é regulado corretamente.
- Causas de diferenciação:
  * 0000 0001: O controle mede uma corrente inadmissível no MV_WS_B desligado.
  * 0000 0010: A corrente real do MV_WS_B é maior do que a corrente nominal do controle.
  * 0000 0100: A corrente real do MV_WS_B é menor do que a corrente nominal do controle.

ERRO 300: Sinal de liberação UTR1 anômalo.
- Categoria: Erro de controle externo.
- Efeito imediato: O transistor de segurança controlado pelo controlo do veículo recebe um sinal indefinido entre a SAÍDA e a ENTRADA.
- Causas de diferenciação:
  * 0000 0001: Sinal de liberação UTR1 anômalo.

ERRO 319: Unidade de inversão abandona posição final.
- Categoria: Erro dos redutores.
- Efeito imediato: Funcionamento de comutação de regimes/inversão de marcha anômalo.
- Causas de diferenciação:
  * 0000 0001: Veio deslizante sai da posição final A apesar de a válvula magnética MV_WS_A estar ligada.
  * 0000 0010: Veio deslizante sai da posição final B apesar de a válvula magnética MV_WS_B estar ligada.
  * 0000 0100: Veio deslizante sai da posição final Neutra apesar de a válvula magnética estar desligada.

ERRO 324: Velocidade excessiva veio de entrada.
- Categoria: Erro dos redutores.
- Efeito imediato: A proteção contra velocidade excessiva do veio de entrada é ativada.
- Causas de diferenciação:
  * 0000 0001: Velocidade excessiva veio de entrada.

ERRO 325: Combinação incorreta/engrenamento duplo da unidade de inversão.
- Categoria: Erro dos redutores.
- Efeito imediato: Funcionamento de comutação de regimes/inversão de marcha anômalo.
- Causas de diferenciação:
  * 0000 0001: Chave de proximidade Inversão Sentido de giro B (NS_WS_B) sem amortecimento com Inversão Sentido de giro A.
  * 0000 0010: Chave de proximidade Inversão Sentido de giro A (NS_WS_A) sem amortecimento com Inversão Sentido de giro B.
  * 0000 0100: Chave de proximidade Inversão Sentido de giro A (NS_WS_A) e chave de proximidade Inversão Sentido de giro B (NS_WS_B) sem amortecimento.
  * 0000 1000: Chave de proximidade Inversão Sentido de giro B (NS_WS_B) com amortecimento na posição final A.
  * 0001 0000: Chave de proximidade Inversão Sentido de giro A (NS_WS_A) com amortecimento na posição final B.
  * 0010 0000: Chave de proximidade Inversão Sentido de giro A (NS_WS_A) e chave de proximidade Inversão Sentido de giro B (NS_WS_B) com amortecimento quando motor parado.
  * 0100 0000: Chave de proximidade Inversão Sentido de giro A (NS_WS_A) com amortecimento quando motor parado.
  * 1000 0000: Chave de proximidade Inversão Sentido de giro B (NS_WS_B) com amortecimento quando motor parado.

ERRO 326: VTDC somente recebe um comando fictício.
- Categoria: Erro de controle externo.
- Efeito imediato: O controle não consegue processar sinais contraditórios.
- Causas de diferenciação:
  * 0000 0001: Sinal de liberação UTR1 = LIG., Sinal de tração CAN/MVB = DESL. e Sinal de freagem CAN/MVB = DESL.
  * 0000 0010: Sinal de liberação UTR1 = DESL. e Sinal de tração CAN/MVB = LIG.
  * 0000 0100: Sinal de liberação UTR1 = DESL. e Sinal de freagem CAN/MVB = LIG.
  * 0000 1000: Sinal de freagem CAN/MVB = LIG. e Sinal de tração CAN/MVB = LIG.

ERRO 327: VTDC recebe duplo comando de sentido de giro.
- Categoria: Erro de controle externo.
- Efeito imediato: O controle não consegue processar sinais contraditórios.
- Causas de diferenciação:
  * 0000 0001: VTDC recebe simultaneamente o comando de sentido de giro A e B.

ERRO 328: Pré-aviso da temperatura do óleo dos redutores antes do permutador de calor.
- Categoria: Erro dos redutores.
- Efeito imediato: O controle registra que foi atingido um limiar de temperatura.
- Causas de diferenciação:
  * 0000 0001: Pré-aviso limiar de temperatura atingido.

ERRO 329: Pré-aviso temperatura da caixa conversor 1 sentido de giro A.
- Categoria: Erro dos redutores.
- Efeito imediato: O controle registra que foi atingido um limiar de temperatura.
- Causas de diferenciação:
  * 0000 0001: Pré-aviso limiar de temperatura atingido.

ERRO 331: Temperatura excessiva do óleo dos redutores antes do permutador de calor.
- Categoria: Erro dos redutores.
- Efeito imediato: O controle registra que foi atingido um limiar de temperatura.
- Causas de diferenciação:
  * 0000 0001: Pré-aviso temperatura excessiva atingido.

ERRO 332: Temperatura excessiva caixa conversor 1 sentido de giro A.
- Categoria: Erro dos redutores.
- Efeito imediato: O controle registra que foi atingido um limiar de temperatura.
- Causas de diferenciação:
  * 0000 0001: Pré-aviso temperatura excessiva atingido.

ERRO 335: Inversão interrompida devido a tempo esgotado.
- Categoria: Erro dos redutores.
- Efeito imediato: Funcionamento de comutação de regimes/inversão de marcha anômalo.
- Causas de diferenciação:
  * 0000 0001: Inversão interrompida devido a tempo esgotado de passagem de posição neutra para posição final A.
  * 0000 0010: Inversão interrompida devido a tempo esgotado de passagem de posição neutra para posição final B.
  * 0000 0100: Inversão interrompida devido a tempo esgotado de passagem de posição final A para posição neutra.
  * 0000 1000: Inversão interrompida devido a tempo esgotado de passagem de posição final B para posição neutra.
  * 0001 0000: Inversão interrompida devido a tempo esgotado por turbinas estarem girando.
  * 0010 0000: Inversão interrompida devido a tempo esgotado por veio de saída estar girando.

ERRO 339: Unidade de inversão não atinge posição neutra.
- Categoria: Erro dos redutores.
- Efeito imediato: Funcionamento de comutação de regimes/inversão de marcha anômalo.
- Causas de diferenciação:
  * 0000 0001: Veio deslizante não atinge posição neutra a partir da posição A.
  * 0000 0010: Veio deslizante bloqueia aquando da parada do motor, a partir da posição final A.
  * 0000 0100: Veio deslizante não atinge posição neutra a partir da posição B.
  * 0000 1000: Veio deslizante bloqueia aquando da parada do motor, a partir da posição final B.

ERRO 348: Comando simultâneo da tração e do freio hidrodinâmico.
- Categoria: Erro de controle externo.
- Efeito imediato: O controle não consegue processar sinais contraditórios.
- Causas de diferenciação:
  * 0000 0001: Sinais do controle do veículo não são corretos.

ERRO 351: Velocidade de acionamento demasiado alta para comutação de regimes/inversão de marcha.
- Categoria: Erro do motor.
- Efeito imediato: Funcionamento de comutação de regimes/inversão de marcha anômalo.
- Causas de diferenciação:
  * 0000 0001: Velocidade de acionamento (velocidade do motor) demasiado alta para comutação de regimes/inversão de marcha.

ERRO 352: Velocidade excessiva veio de saída.
- Categoria: Erro dos redutores.
- Efeito imediato: A proteção contra velocidade excessiva do veio de saída é ativada.
- Causas de diferenciação:
  * 0000 0001: Velocidade excessiva veio de saída.

ERRO 353: Limitação da velocidade devido à temperatura do óleo dos redutores.
- Categoria: Erro dos redutores.
- Efeito imediato: O controle registra que foi atingido um limiar de temperatura.
- Causas de diferenciação:
  * 0000 0001: Limitação da velocidade devido à temperatura do óleo dos redutores.

ERRO 362: Controlo dos redutores DIWA anómalo.
- Categoria: Erro dos redutores.
- Efeito imediato: Funcionamento do controlo dos redutores DIWA anómalo.
- Causas de diferenciação:
  * 0000 0001: Velocidade de saída DIWA detectada como anómala com base na velocidade de saída.
  * 0000 0010: Velocidade de saída DIWA detectada como anómala com base na velocidade de accionamento e marcha actual.
  * 0000 0100: Marcha actual anómala.

ERRO 368: Desvio do valor nominal/real do freio hidrodinâmico.
- Categoria: Erro dos redutores.
- Efeito imediato: A força de freagem nominal desejada não pode ser regulada.
- Causas de diferenciação:
  * 0000 0001: Desvio do valor nominal/real do freio hidrodinâmico.

ERRO 369: Os redutores DIWA não desligam.
- Categoria: Erro dos redutores.
- Efeito imediato: Os redutores DIWA já não desligam.
- Causas de diferenciação:
  * 0000 0001: Monitorização reversiva anómala.
  * 0000 0010: Monitorização neutra anómala.

ERRO 1104: Sensor de pressão do óleo do motor anômalo.
- Categoria: Erro do sensor.
- Efeito imediato: A pressão do óleo no motor já não pode ser determinada.
- Causas de diferenciação:
  * 0000 0001: Rotura de fio no chicote de fiação elétrica dos sensores/na fiação ou no sensor de pressão do óleo do motor.
  * 0000 0010: Curto-circuito no chicote de fiação elétrica dos sensores/na fiação ou no sensor de pressão do óleo do motor.
  * 0000 0100: Sensor de pressão do óleo do motor fora da tolerância definida.

ERRO 1172: Informação de rotações do motor redundante anômala.
- Categoria: Erro do motor.
- Efeito imediato: As rotações do motor já não podem ser determinadas pelo aparelho de controle.
- Causas de diferenciação:
  * 0000 0001: Erro de redundância.

ERRO 1321: Sensor de concentração de óxido de nitrogênio (KS_NOX) com defeito.
- Categoria: Erro do sensor.
- Efeito imediato: A concentração de óxido de nitrogênio já não pode ser determinada com o KS_NOX.
- Causas de diferenciação:
  * 0000 0001: Ruptura do cabo no aquecimento do elemento do sensor.
  * 0000 0010: Curto-circuito no aquecimento do elemento do sensor.
  * 0000 0100: Ruptura do cabo na célula de medição de NOx.
  * 0000 1000: Curto-circuito na célula de medição de NOx.
  * 0001 0000: Fornecimento de energia fora do intervalo definido.

ERRO 1322: Concentração de óxido de nitrogênio ultrapassada.
- Categoria: Erro do sensor.
- Efeito imediato: O controle registra que foi atingido um limiar de concentração.
- Causas de diferenciação:
  * 0000 0001: Concentração de óxido de nitrogênio ultrapassada.

ERRO 1330: Descida abaixo da pressão mínima do óleo do motor.
- Categoria: Erro do motor.
- Efeito imediato: O motor diesel não recebe um suprimento de óleo suficiente.
- Causas de diferenciação:
  * 0000 0001: Descida abaixo da pressão mínima do óleo do motor.

ERRO 1351: Limitação da velocidade devido à temperatura do óleo dos redutores.
- Categoria: Erro do motor.
- Efeito imediato: O controle registra que foi atingido um limiar de temperatura.
- Causas de diferenciação:
  * 0000 0001: Limitação da velocidade devido à temperatura do óleo dos redutores.

ERRO 1355: Limitação da velocidade devido à temperatura do ar de alimentação.
- Categoria: Erro do motor.
- Efeito imediato: O controle registra que foi atingido um limiar de temperatura.
- Causas de diferenciação:
  * 0000 0001: Limitação da velocidade devido à temperatura do ar de alimentação.

ERRO 1356: Pressão do ar de alimentação demasiado baixa.
- Categoria: Erro do motor.
- Efeito imediato: O controle registra que a pressão do ar de alimentação não foi atingida.
- Causas de diferenciação:
  * 0000 0001: Descida abaixo da pressão do ar de alimentação mínima.

ERRO 1366: O VTDC detectou o comando do motor como anómalo.
- Categoria: Erro do motor.
- Efeito imediato: Funcionamento anómalo do comando do motor.
- Causas de diferenciação:
  * 0000 0001: Funcionamento de tracção.
  * 0000 0010: Funcionamento de arrasto.
  * 0000 0100: Funcionamento de velejo.
  * 0000 1000: Funcionamento de travagem HD.

ERRO 1394: Descida abaixo do nível mínimo do óleo do motor.
- Categoria: Erro do motor.
- Efeito imediato: O controle registra que houve descida abaixo de um limiar de nível de enchimento.
- Causas de diferenciação:
  * 0000 0001: Descida abaixo do limiar do nível de enchimento mínimo (VL LEV).

ERRO 1395: Nível máximo do óleo do motor excedido.
- Categoria: Erro do motor.
- Efeito imediato: O controle registra que houve subida acima de um limiar de nível de enchimento.
- Causas de diferenciação:
  * 0000 0001: Subida acima do limiar do nível de enchimento máximo (MLEV).

ERRO 2111: Sensor de temperatura do óleo dos redutores antes do permutador de calor (TS_OEL_VWT) e informação de temperatura redundante anômalo.
- Categoria: Erro do sensor.
- Efeito imediato: A temperatura do óleo dos redutores antes do permutador de calor já não pode ser determinada.
- Causas de diferenciação:
  * 0000 0001: Erro de redundância.

ERRO 2112: Sensor de temperatura do ar de alimentação (TS_LL) e informação de temperatura redundante anômalo.
- Categoria: Erro do sensor.
- Efeito imediato: A temperatura do ar de alimentação já não pode ser determinada.
- Causas de diferenciação:
  * 0000 0001: Erro de redundância.

ERRO 2113: Sensor de temperatura do ar de alimentação (TS_LL) anômalo.
- Categoria: Erro do sensor.
- Efeito imediato: A temperatura do ar de alimentação já não pode ser determinada com o TS_LL.
- Causas de diferenciação:
  * 0000 0001: Rotura de fio no chicote de fiação elétrica dos sensores/na fiação ou no TS_LL.
  * 0000 0010: Curto-circuito no chicote de fiação elétrica dos sensores/na fiação ou no TS_LL.
  * 0000 0100: Contato intermitente no chicote de fiação elétrica dos sensores/na fiação ou no TS_LL.

ERRO 2116: Sensor de temperatura da água de resfriamento do circuito de alta temperatura (TS_KW_HT) anômalo.
- Categoria: Erro do sensor.
- Efeito imediato: A temperatura da água de resfriamento HT já não pode ser determinada com o TS_KW_HT.
- Causas de diferenciação:
  * 0000 0001: Rotura de fio no chicote de fiação elétrica dos sensores/na fiação ou no TS_KW_HT.
  * 0000 0010: Curto-circuito no chicote de fiação elétrica dos sensores/na fiação ou no TS_KW_HT.
  * 0000 0100: Contato intermitente no chicote de fiação elétrica dos sensores/na fiação ou no TS_KW_HT.

ERRO 2117: Sensor de temperatura do óleo hidrostático (TS_OEL_HS) anômalo.
- Categoria: Erro do sensor.
- Efeito imediato: A temperatura do óleo hidrostático já não pode ser determinada com o TS_OEL_HS.
- Causas de diferenciação:
  * 0000 0001: Rotura de fio no chicote de fiação elétrica dos sensores/na fiação ou no TS_OEL_HS.
  * 0000 0010: Curto-circuito no chicote de fiação elétrica dos sensores/na fiação ou no TS_OEL_HS.
  * 0000 0100: Contato intermitente no chicote de fiação elétrica dos sensores/na fiação ou no TS_OEL_HS.

ERRO 2119: Sensor de temperatura da água de resfriamento do circuito de alta temperatura (TS_KW_HT) e informação de temperatura redundante anômalo.
- Categoria: Erro do sensor.
- Efeito imediato: A temperatura da água de resfriamento HT já não pode ser determinada.
- Causas de diferenciação:
  * 0000 0001: Erro de redundância.

ERRO 2247: Válvula magnética proporcional ventilador hidrostático circuito de alta/baixa temperatura (PV_HS_VENT_HTNT) anômala.
- Categoria: Erro da válvula magnética.
- Efeito imediato: Ventilador HT-NT girando com velocidade excessiva.
- Causas de diferenciação:
  * 0000 0001: Rotura de fio no chicote de fiação elétrica dos atuadores/na fiação ou no PV_HS_VENT_HTNT.
  * 0000 0010: Curto-circuito no chicote de fiação elétrica dos atuadores/na fiação ou no PV_HS_VENT_HTNT.

ERRO 2248: Corrente inadmissível na válvula magnética proporcional ventilador hidrostático circuito de alta/baixa temperatura (PV_HS_VENT_HTNT).
- Categoria: Erro da válvula magnética.
- Efeito imediato: O PV_HS_VENT_HTNT pode ser ligado sem permissão; O PV_HS_VENT_HTNT não é regulado corretamente.
- Causas de diferenciação:
  * 0000 0001: O controle mede uma corrente inadmissível no PV_HS_VENT_HTNT desligado.
  * 0000 0010: A corrente real do PV_HS_VENT_HTNT é maior do que a corrente nominal do controle.
  * 0000 0100: A corrente real do PV_HS_VENT_HTNT é menor do que a corrente nominal do controle.

ERRO 2311: Descida abaixo do nível mínimo da água de resfriamento.
- Categoria: Erro do sistema de resfriamento.
- Efeito imediato: O controle registra que houve descida abaixo de um limiar de nível de enchimento.
- Causas de diferenciação:
  * 0000 0001: Descida abaixo do limiar do nível de enchimento mínimo (VL LEV).

ERRO 2313: Descida abaixo do nível mínimo do óleo hidrostático.
- Categoria: Erro do sistema de resfriamento.
- Efeito imediato: O controle registra que houve descida abaixo de um limiar de nível de enchimento.
- Causas de diferenciação:
  * 0000 0001: Descida abaixo do limiar do nível de enchimento mínimo (VL LEV).

ERRO 2351: Pré-aviso da temperatura da água de resfriamento.
- Categoria: Erro do sistema de resfriamento.
- Efeito imediato: O controle registra que foi atingido um limiar de temperatura.
- Causas de diferenciação:
  * 0000 0001: Pré-aviso limiar de temperatura atingido.

ERRO 2352: Temperatura excessiva da água de resfriamento.
- Categoria: Erro do sistema de resfriamento.
- Efeito imediato: O controle registra que foi atingido um limiar de temperatura.
- Causas de diferenciação:
  * 0000 0001: Pré-aviso temperatura excessiva atingido.

ERRO 2353: Pré-aviso da temperatura da água de resfriamento no circuito de alta temperatura.
- Categoria: Erro do sistema de resfriamento.
- Efeito imediato: O controle registra que foi atingido um limiar de temperatura.
- Causas de diferenciação:
  * 0000 0001: Pré-aviso limiar de temperatura atingido.

ERRO 2354: Temperatura excessiva da água de resfriamento no circuito de alta temperatura.
- Categoria: Erro do sistema de resfriamento.
- Efeito imediato: O controle registra que foi atingido um limiar de temperatura.
- Causas de diferenciação:
  * 0000 0001: Pré-aviso temperatura excessiva atingido.

ERRO 2357: Pré-aviso da temperatura do óleo hidrostático.
- Categoria: Erro do sistema de resfriamento.
- Efeito imediato: O controle registra que foi atingido um limiar de temperatura.
- Causas de diferenciação:
  * 0000 0001: Pré-aviso limiar de temperatura atingido.

ERRO 2358: Temperatura excessiva do óleo hidrostático.
- Categoria: Erro do sistema de resfriamento.
- Efeito imediato: O controle registra que foi atingido um limiar de temperatura.
- Causas de diferenciação:
  * 0000 0001: Pré-aviso temperatura excessiva atingido.

ERRO 2371: Erro do alternador Voltagem 24V.
- Categoria: Erro do sistema de resfriamento.
- Efeito imediato: O alternador já não realiza suprimento de voltagem.
- Causas de diferenciação:
  * 0000 0001: Erro do alternador Voltagem 24V.

NÍVEIS DE PRIORIDADE DE EVENTOS / FALHAS (VOITH):
- Nível 1: Falha grave que compromete a dirigibilidade e/ou segurança. Parar o veículo imediatamente! Transmissão entra em Neutro.
- Nível 2: Falha que requer visita direta à oficina. Continuação da viagem até a oficina é possível com funções limitadas.
- Nível 3: Falha leve que gera recomendação de ação antes de iniciar a viagem. Comportamento de condução pouco ou nada limitado.
- Nível 4: Falha leve que gera recomendação de ação na próxima visita à oficina. Comportamento de condução não limitado.
- Nível 5: Aviso de que a transmissão/retardador está operando fora da faixa permitida (ex: sobretemperatura). Não representa falha da transmissão.
- Nível 6: Aviso de que a transmissão está operando fora da faixa ideal (ex: temperatura elevada). Não representa falha da transmissão.
- Nível 7: Mensagens do sistema de pré-aviso. Indicação de desgaste / trabalhos de manutenção.
- Nível 8: Informação de desenvolvedor / teste.

--------------------------------------------------
MANUAL TÉCNICO COMPLETO - VOITH TURBO DIWA.5
Referência de Reparação e Instalação (Nível de Reparação 150.00368913_EN)
Fabricante: Voith Turbo GmbH & Co. KG

1. ESPECIFICAÇÃO DE NOMENCLATURA E MODELOS DIWA.5:
- Exemplos de Modelos: D 824.5, D 854.5, D 864.5, D 884.5
- Significado de "864.5 C3VT0R2W50-8.5":
  * Primeiro dígito (8): Geração da Transmissão (Série DIWA.5)
  * Segundo dígito antes do ponto (2/5/6/8): Indica o número de marchas (4 marchas à frente, por exemplo D 864.5).
  * 864.5 é projetada para torques de motor mais altos que a 854.5.
  * .5: Transmissões da 5ª Geração (.5).
  * C/D: Variante da tampa de acionamento (Drive cover).
  * 3/4: Relação de transmissão do diferencial de entrada (Input differential).
    - Diff 3 yields ratio without angle drive: i = 1.43 em 2ª marcha, i = 1 em 3ª marcha, i = 0.7 em 4ª marcha.
    - Diff 4 yields ratio without angle drive: i = 1.36 em 2ª marcha, i = 1 em 3ª marcha, i = 0.735 em 4ª marcha.
  * V/H/X/K: Variante do rotor da bomba de óleo (Converter pump impeller).
  * T0/T2: Variante do rotor da turbina (Turbine profile diameter: T0 = 168 mm, T2 = 183 mm).
  * R0/R2: Relação do reversor (Turbine ratio iT = n_turbine / n_output_drive: R0 = -6.59, R2 = -7.41).
  * W50/W51/W52/W53/W54: Tipo de acoplamento de saída em ângulo (Angle drive on output side).
    - W50: Relação iWAb = 1.087, ângulo de 80º em 1 nível.
    - W51: Relação iWAb = 0.987, ângulo de 100º em 2 níveis.
    - W52: Relação iWAb = 1.002, ângulo de 80º em 1 nível.
    - W53: Relação iWAb = 0.952, ângulo de 80º em 1 nível.
    - W54: Relação iWAb = 1.087, ângulo de 80º em 1 nível.
  * 8.5/9.5/10.5: Ajuste de pressão operacional (Operating pressure setting in [bar]).
    - 8.5 bar: Padrão (Standard).
    - 9.5 bar: Para torques de entrada de até 1750 Nm.
    - 10.5 bar: Para torques de entrada de 1600 a 1900 Nm.

2. DIFERENÇAS EM RELAÇÃO ÀS TRANSMISSÕES DIWA.3E:
- Filtro de óleo: Localizado externamente à carcaça do cárter de óleo e pode ser trocado separadamente. Vantagem: Não é necessário drenar o óleo da transmissão para trocar o filtro.
- Tubulações de óleo para o trocador de calor (Heatexchanger): Integradas diretamente na carcaça da transmissão em aplicações em linha. Vantagem: Instalação otimizada e livre de manutenção de tubos externos.
- Sensores: Novo sensor de temperatura para a área do conversor/retardador. Novo sensor combinado de nível de óleo e temperatura no cárter de óleo. Os sensores de velocidade N1, N2, N3 e o sensor de temperatura do conversor são fixados diretamente abaixo da tampa da unidade de controle elétrico, oferecendo facilidade de manutenção e acesso simplificado.

3. DADOS TÉCNICOS E LIMITES DE APLICAÇÃO DIWA.5:
- Potência de Entrada sob Velocidade Nominal:
  * 824.5: 180 kW
  * 854.5: 220 kW
  * 864.5: 260 kW (nas marchas 1 e 2), 290 kW (nas marchas 3 e 4)
  * 884.5: 260 kW (na 1ª marcha), 300 kW (na 2ª marcha), 320 kW (nas marchas 3 e 4)
- Torque Máximo de Entrada (sem redução de torque do motor):
  * 824.5: até 650 Nm
  * 854.5: 800 a 1100 Nm
  * 864.5: 1100 a 1250 Nm
- Rotação de Entrada no Início da Redução do Motor: 1900 a 2500 rpm.
- Rotação de Marcha Lenta do Motor com Marcha Engatada: 550 a 700 rpm.
- Peso Seco da Transmissão (sem trocador de calor):
  * 824.5: 295 kg
  * 854.5: 300 kg
  * 864.5: 305 kg
  * 884.5: 310 kg
  * Componentes adicionais: Flange de conexão em linha pesa 6 kg; Flange para transmissão em ângulo pesa 11 kg; Flange de suspensão pesa 18 kg; Trocador de calor pesa 33 kg.
- Quantidade e Capacidade de Óleo:
  * 31 litros: Aplicação padrão em linha.
  * 31 litros: Aplicação com transmissão em ângulo sem engrenagem cilíndrica auxiliar.
  * 37 litros: Aplicação com transmissão em ângulo com engrenagem cilíndrica auxiliar.

4. REQUISITOS MECÂNICOS DE MONTAGEM E INSTALAÇÃO:
- Inclinação de Montagem Permitida da Transmissão:
  * Sentido Longitudinal (Longitudinal): Máximo de 7º.
  * Sentido Transversal (Transverse): Máximo de ±4º.
- Distância Mínima de Fontes de Calor (ex: cano de escapamento / gases >= 120ºC): Deve ser de no mínimo 100 mm. Caso contrário, é obrigatória a instalação de uma placa defletora de calor (Screening plate).
- Tubulações de Mangueiras de Óleo (Oil hose lines):
  * Devem ser instaladas utilizando a menor distância possível.
  * Raio mínimo de curvatura (Bending radius): Deve-se respeitar estritamente o limite mínimo de 300 mm.
  * Não devem sofrer tensões de tração mecânica ou torção após a montagem.

5. INSTALAÇÃO ELÉTRICA E REQUISITOS DA UNIDADE DE CONTROLE (TCU E300/E300.1):
- A unidade de controle elétrico (TCU E300.1) possui conector multiponto macho "Junior Power Timer" de 69 pinos (AMP nº 967 689) composto por 4 conectores individuais (3x18 e 1x15 contatos).
- Posição de Instalação Permitida da TCU:
  * Deve ser montada em local protegido contra respingos de água.
  * O conector principal deve apontar para baixo (max. 90º de inclinação em relação à vertical para evitar penetração de água condensada).
- Temperaturas Operacionais de Serviço da Unidade de Controle:
  * Temperatura de Armazenamento: -40ºC a +95ºC.
  * Temperatura de Operação E300.1: -40ºC a +80ºC.
  * Temperatura de Operação E300 (anterior): -40ºC a +72ºC.
- Tensões Elétricas Permitidas:
  * Tensão Nominal: 24 V.
  * Tensão de Operação Real: 16 V a 32 V.
  * Limites de Sobretensão (Overvoltage): Máximo de 36 V por até 60 minutos | Máximo de 45 V por no máximo 10 segundos. Se a tensão cair abaixo de 16 V, o controle não pode garantir o acionamento das válvulas magnéticas e a transmissão muda automaticamente para Neutro por segurança.
- Consumo de Corrente Elétrica Máximo Permitido: 7.0 A.
- Atribuição Fixa de Pinos de Entrada Elétrica (E300.1):
  * Pino C7 (FLEXI-7): Entrada dedicada para o sinal de ativação do sistema ANS (Automatic Neutral at Standstill).
  * Pino C9 (FLEXI-9): Entrada para sinal PWM de torque do motor (ENG-PWM) vindo da ECU do motor.
  * Pino C10 (FLEXI-10): Entrada para sinal analógico do pedal de freio (FB-ANA) - aceita apenas sinal tipo HSS (+24 V).
  * Pino D3 (FLEXI-11): Entrada dedicada para o sinal do interruptor de marcha de emergência (Limp-Home). Em modo Limp-home, o VLT opera com limitações e a velocidade é travada no máximo na 2ª marcha.
- Sinais das Saídas Digitais da TCU:
  * FLEXO-1L (Pino D16): Tipo LSS (interruptor para terra) com capacidade máx. 200 mA.
  * FLEXO-2H (Pino C11): Tipo HSS (interruptor para +24V) com capacidade máx. 1.0 A.
  * FLEXO-3H (Pino C13): Tipo HSS (interruptor para +24V) com capacidade máx. 150 mA.
  * FLEXO-4H (Pino C12): Tipo HSS (interruptor para +24VI) com capacidade máx. 150 mA.
  * FLEXO-5L (Pino C14): Tipo LSS (interruptor para terra) com capacidade máx. 200 mA.

6. FLUXO DE POTÊNCIA E ESTADOS DAS EMBREAGENS (SHIFTING FUNCTIONS):
- Neutro (Neutral): Botão N pressionado, embreagem de entrada EK (c) aberta, todas as embreagens e freios de discos múltiplos (f, g, h) desengatados. Apenas a bomba de óleo acoplada (n) é acionada gerando pressão.
- 1ª Marcha (DIWA drive range): Embreagem de entrada EK (c) FECHADA, freio da turbina TB (g) FECHADO. O divisor de torque mecânico de entrada divide a potência em um fluxo mecânico direto e um fluxo hidráulico através do conversor de torque.
- 2ª Marcha (2nd gear): Embreagem EK (c) fechada, freio da turbina TB (g) abre, e o freio da bomba PB (f) FECHA (travando o rotor da bomba, o que cessa o fluxo hidráulico e torna a transmissão 100% mecânica).
- 3ª Marcha (3rd gear): Embreagem EK (c) abre, e a embreagem de travamento (Lock-up clutch) DK (d) FECHA. Relação direta i = 1.0.
- 4ª Marcha (4th gear): Embreagem DK (d) abre, e a embreagem de sobremarcha (Overdrive clutch) SK (e) FECHA. Relação de multiplicação i = 0.70 (Diff 3) ou i = 0.73 (Diff 4).
- Marcha Ré (Reverse gear): Embreagem de entrada EK (c) fechada, freio de marcha ré RB (h) FECHADO, freio da turbina TB (g) aberto. Velocidade máxima de ré é limitada a aproximadamente 10% da velocidade máxima de avanço.
- Ativação do ANS (Automatic Neutral at Standstill): Quando o VLT para em estações ou semáforos, a embreagem EK (c) abre e fecha-se mecanicamente os freios de turbina TB (g) e freio traseiro RB (h) para travar o veículo e evitar deslizamento (Rollback protection) e reduzir o arrasto hidrodinâmico no motor diesel, economizando combustível. Requisitos para ativação do ANS: Pedal de acelerador em repouso (L0), velocidade abaixo de 1 km/h, marcha à frente selecionada, rotação do motor < 1000 rpm, sensores de velocidade OK, ABS inativo, válvulas solenoides TB e RBK saudáveis.

7. ESPECIFICAÇÃO DE TESTES E CONTROLE ADAPTATIVO:
- Sistema de Alerta Precoce (Early Warning System): Monitora constantemente as velocidades do eixo e os tempos de mudança de marcha. Caso a pressão de controle calculada pela adaptação (pR) ultrapasse o limite superior (p2) de 7.4 bar (ou 8.0 bar nas transmissões tipo 884) durante trocas de marcha de 2-3 ou 3-4, o sistema acusa erro.
- Monitoramento de Deslizamento (Slip Monitoring): Monitora a relação de velocidade de rotação entre a entrada e a saída da marcha engatada. Se for detectado um escorregamento superior a 50 RPM por mais de 1.0 segundo, um código de falha é registrado imediatamente na memória de eventos (Event memory).
- Diagnóstico e Softwares:
  * ALADIN (Analysis and Diagnostic Network): Software oficial para leitura de dados de operação, memória de eventos, arquivos de log (.ECU), testes de atuadores e cargas de software.
  * DIANA (DIWA Diagnosis Software): Programa para gravação em tempo real e avaliação detalhada de parâmetros funcionais e dinâmicos em bancadas de testes ou rotas operacionais, com rastreamento opcional de dados GPS e sensores analógicos extras.
`;
