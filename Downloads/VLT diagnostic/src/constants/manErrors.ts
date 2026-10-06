export const MAN_ENGINE_MANUAL_DATA = `
DADOS TÉCNICOS DO MANUAL MAN (MOTOR D 2876 LUE 6..):
SISTEMA: Injeção Diesel regulada eletronicamente (EDC MS5).

CÓDIGOS DE FALHA (CÓDIGOS DE PISCAS / PISCADAS DE LED):
- 1x curto (81H): Sensor do valor do pedal de acelerador / Ajuste do nível de marcha.
- 3x curto (83H): Registro de temperatura do ar de admissão (Intercooler).
- 4x curto (84H): Sensor do número de rotações do motor (DZG 1).
- 5x curto (85H): Sensor da pressão de sobrealimentação do turbo.
- 6x curto (86H): Registro de pressão de carga do turbocompressor.
- 7x curto (87H): Registro de temperatura do líquido de arrefecimento do motor.
- 10x curto (8AH): Mecanismo de regulagem de vazão, discrepância de regulagem.
- 14x curto (8EH): Transmissor auxiliar de rotações (DZG 2).
- 1 longo, 1 curto (11H): Registro de temperatura do combustível.
- 1 longo, 3 curto (13H): Subtensão / Tensão de alimentação baixa.
- 1 longo, 6 curto (96H): Unidade de controle EDC (interface de comunicação).
- 1 longo, 7 curto (17H): Rotação excessiva do motor (Sobrerrotação).
- 1 longo, 8 curto (18H): Desvio da regulagem do início de injeção.
- 1 longo, 10 curto (1AH): Sensor do movimento da agulha do injetor (NBF).
- 1 longo, 12 curto (1CH): Resistor de ajuste da unidade de comando EDC (Pino 35).
- 1 longo, 13 curto (1DH): Painel / Unidade de operação do condutor.
- 1 longo, 15 curto (1FH): Unidade de controle (Rede CAN do veículo).
- 2 longo, 5 curto (25H): Relé principal do sistema EDC.
- 2 longo, 7 curto (A7H): Resistor de ajuste da unidade de comando EDC (Pino 54).
- 2 longo, 8 curto (A8H): Registro de pressão atmosférica ambiental.
- 2 longo, 13 curto (2DH): Transmissão de mensagem do barramento CAN (TSC1-FM).
- 3 longo, 1 curto (31H): Relé de segurança.
- 3 longo, 2 curto (32H): Erro na memória EEPROM do computador 1.
- 3 longo, 3 curto (33H): Erro na memória EEPROM do computador 2.
- 3 longo, 4 curto (34H): Sinal de parada externa ativado.
- 3 longo, 6 curto (36H): Intercooler / Arrefecimento do ar de carga.
- 3 longo, 7 curto (37H): Erro no estágio final do driver de injeção.
- 3 longo, 8 curto (38H): Marcha em inércia não finalizada.
- 3 longo, 9 curto (39H): Erro de Watchdog no microprocessador.
- 3 longo, 10 curto (3AH): Sensor do percurso de regulagem - mau contato no chicote.
- 3 longo, 11 curto (3BH): Regulador da válvula EGR.

NORMAS DE SEGURANÇA CRÍTICAS DE CAMPO:
- Não tocar no motor em temperatura de serviço: Risco de queimaduras graves.
- Abrir o circuito do líquido de arrefecimento apenas com o motor frio.
- Desconectar a bateria ao realizar trabalhos no sistema elétrico.
- Não dar partida no motor com carregador de bateria rápido conectado.
- Retirar o conector do chicote de cabos das unidades de controle apenas com a ignição desligada.
`;
