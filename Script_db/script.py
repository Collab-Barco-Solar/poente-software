import serial
import sqlite3

# conexões relacionadas ao db e a porta serial
#db = sqlite3.connect('teste.db')

#cursor = db.cursor()

#porta = "/dev/ttyUSB0"
#velocidade = 9600

#conexao = serial.Serial(porta,velocidade)

class Acionamento:
    def __init__(self):
        self.__emergencia = ''
        self.__dms = ''
        self.__onOff = ''
        self.__re = ''
        self.__freio = ''
        self.__cruzeiro = ''

    def getEmergencia(self):
        return self.__emergencia
    def setEmergencia(self,valor):
        self.__emergencia = valor
    def getDms(self):
        return self.__dms
    def setDms(self,valor):
        self.__dms = valor
    def getOnOff(self):
        return self.__onOff
    def setOnOff(self,valor):
        self.__onOff = valor
    def getRe(self):
        return self.__re
    def setRe(self,valor):
        self.__re = valor
    def getFreio(self):
        return self.__freio
    def setFreio(self,valor):
        self.__freio = valor
    def getCruzeiro(self):
        return self.__cruzeiro
    def setCruzeiro(self,valor):
        self.__cruzeiro = valor


class dados:
    
    def __init__(self):


        self.acionamentos = Acionamento()
        self.__temperatura = ''
        self.__tensao_barramento = ''
        self.__tensao_modulos = ''
        self.__tensao_baterias = ''
        self.__tensao_baterias_aux = ''
        self.__corrente_barramento = ''
        self.__corrente_modulos = ''
        self.__corrente_baterias = ''
        self.__corrente_baterias_aux = ''
        self.__posicao_potenciometro = ''
        self.__velocidade = ''
        self.__latitude = ''
        self.__longitude = ''


    #acionamentos
    
    def getTemperatura(self):
        return self.__temperatura
    
    def setTemperatura(self,valor):
        self.__temperatura = valor

    def getTensaoBarramento(self):
        return self.__tensao_barramento

    def setTensaoBarramento(self,valor):
        self.__tensao_barramento = valor  
    
    def getTensaoModulos(self):
        return self.__tensao_modulos
    
    def setTensaoModulos(self,valor):
        self.__tensao_modulos = valor
    
    def getTensaoBaterias(self):
        return self.__tensao_baterias
    
    def setTensaoBaterias(self,valor):
        self.__tensao_baterias = valor

    def getTensaoBateriasAux(self):
        return self.__tensao_baterias_aux
    
    def setTensaoBateriasAux(self,valor):
        self.__tensao_baterias_aux = valor



    def getCorrenteBarramento(self):
        return self.__corrente_barramento

    def setCorrenteBarramento(self,valor):
        self.__corrente_barramento = valor

    def getCorrenteModulos(self):
        return self.__corrente_modulos

    def setCorrenteModulos(self, valor):
        self.__corrente_modulos = valor 

    def getCorrenteBaterias(self):
        return self.__corrente_baterias

    def setCorrenteBaterias(self, valor):
        self.__corrente_baterias = valor

    def getCorrenteBateriasAux(self):
        return self.__corrente_baterias_aux
    
    def setCorrenteBateriasAux(self, valor):
        self.__corrente_baterias_aux = valor

    def getPosicaoPotenciometro(self):
        return self.__posicao_potenciometro
    
    def setPosicaoPotenciometro(self,valor):
        self.__posicao_potenciometro = valor

    def getVelocidade(self):
        return self.__velocidade

    def setVelocidade(self,valor):
        self.__velocidade = valor

    def getLatitude(self):
        return self.__latitude
    def setLatitude(self, valor):
        self.__latitude = valor
    def getLongitude(self):
        return self.__longitude
    def setLongitude(self,valor):
        self.__longitude = valor

#decodifica o pacote e armazena no objeto

def DecodificaAcionamentos(dados, pacote):

    decimal = ord(pacote[0])
    binario = f'{decimal:b}'

    dados.acionamentos.setEmergencia(binario[0])
    dados.acionamentos.setDms(binario[1])
    dados.acionamentos.setOnOff(binario[2])
    dados.acionamentos.setRe(binario[3])
    dados.acionamentos.setFreio(binario[4])
    dados.acionamentos.setCruzeiro(binario[5])


    return dados




def Decodifica(dados,pacote):
    #tamPacote = len(pacote)
    i=1
    #acionamento = pacote(0)
    dados = DecodificaAcionamentos(dados,pacote)




    temp = ''
    tensaoBarramento = ''
    tensaoNosModulos = ''
    tensaoNasBaterias = ''
    tensaoNasBateriasAux = ''
    correnteBarramento = ''
    correnteModulo = ''
    correnteBaterias = ''
    correnteBateriasAux = ''
    posicaoPotenciometro = ''
    velocidade = ''
    latitude = ''
    longitude = ''

    while (True):
        if(i>=1 and i<=5):
            temp = temp + pacote[i] # concatenando os caracteres da temperatura
        if(i>=6 and i<=10):
            tensaoBarramento = tensaoBarramento + pacote[i] # concatenando os caracteres da tensao no barramento
        if(i>=11 and i<=15):
            tensaoNosModulos = tensaoNosModulos + pacote[i] # concatenando...
        if(i>=16 and i<=20):
            tensaoNasBaterias = tensaoNasBaterias + pacote[i] # concatenando...
        if(i>=21 and i<=25):
            tensaoNasBateriasAux = tensaoNasBateriasAux + pacote[i] #concatenando...

        if(i>=26 and i<=30):
            correnteBarramento = correnteBarramento + pacote[i] #concatenando...
        if(i>=31 and i<=35):
            correnteModulo = correnteModulo + pacote[i] #concatenando...

        if(i>=36 and i<=40):
            correnteBaterias = correnteBaterias + pacote[i] #concatenando...
        if(i>=41 and i<=45):
            correnteBateriasAux = correnteBateriasAux + pacote[i] #concatenando...
        if(i>=46 and i<=49):
            posicaoPotenciometro = posicaoPotenciometro + pacote[i] #concatenando...
        if(i>=50 and i<=54):
            velocidade = velocidade + pacote[i]
        if(i>=55 and i<=63):
            latitude = latitude + pacote[i]
        if(i>=64 and i<=72):
            longitude = longitude + pacote[i]

        if(i>72):
            break
        i= i +1

    dados.setTemperatura(float(temp))
    dados.setTensaoBarramento(float(tensaoBarramento))
    dados.setTensaoModulos(float(tensaoNosModulos))
    dados.setTensaoBaterias(float(tensaoNasBaterias))
    dados.setTensaoBateriasAux(float(tensaoNasBateriasAux))
    dados.setCorrenteBarramento(float(correnteBarramento))
    dados.setCorrenteModulos(float(correnteModulo))
    dados.setCorrenteBaterias(float(correnteBaterias))
    dados.setTensaoBateriasAux(float(correnteBateriasAux))
    dados.setPosicaoPotenciometro(float(posicaoPotenciometro))
    dados.setVelocidade(float(velocidade))
    dados.setLatitude(float(latitude))
    dados.setLongitude(float(longitude))

    
    


    return dados

teste = dados()
pacote = '¬423.132.5443.4334.5656.3256.7843.6787.5465.6345.956.76-32.45365+34.32453' #pacote teste
teste = Decodifica(teste,pacote)


#prints para testar acionamentos
print(teste.acionamentos.getEmergencia())
print(teste.acionamentos.getDms())
print(teste.acionamentos.getOnOff())
print(teste.acionamentos.getRe())
print(teste.acionamentos.getFreio())
print(teste.acionamentos.getCruzeiro())







#prints para testar
print(teste.getTemperatura())
print(teste.getTensaoBarramento())
print(teste.getTensaoModulos())
print(teste.getTensaoBaterias())
print(teste.getTensaoBateriasAux())
print(teste.getCorrenteBarramento())
print(teste.getCorrenteModulos())
print(teste.getCorrenteBaterias())
print(teste.getCorrenteBateriasAux())
print(teste.getPosicaoPotenciometro())
print(teste.getVelocidade())
print(teste.getLatitude())
print(teste.getLongitude())




