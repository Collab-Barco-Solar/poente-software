import sqlite3
import random
import time

def AtualizaDB(vetor):
    emergencia_db = random.randint(0, 1)
    dms_db = random.randint(0, 1)
    onOFF_db = random.randint(0, 1)
    re_db = random.randint(0, 1)
    freio_db = random.randint(0, 1)
    cruzeiro_db = random.randint(0, 1)


    vetor[0] = vetor[0] + random.uniform(-2.0, 2.0)
    vetor[1] = vetor[1] + random.uniform(-2.0, 2.0)
    vetor[2] = vetor[2] + random.uniform(-2.0, 2.0)
    vetor[3] = vetor[3] + random.uniform(-2.0, 2.0)
    vetor[4] = vetor[4] + random.uniform(-2.0, 2.0)
    vetor[5] = vetor[5] + random.uniform(-2.0, 2.0)
    vetor[6] = vetor[6] + random.uniform(-2.0, 2.0)
    vetor[7] = vetor[7] + random.uniform(-2.0, 2.0)
    vetor[8] = vetor[8] + random.uniform(-2.0, 2.0)
    vetor[9] = vetor[9] + random.uniform(-2.0, 2.0)
    vetor[10] = vetor[10] + random.uniform(-2.0, 2.0)
    vetor[11] = vetor[11] + random.uniform(-2.0, 2.0)
    vetor[12] = vetor[12] + random.uniform(-2.0, 2.0)

    temperatura_db = vetor[0]
    tBarramento_db = vetor[1]
    tModulos_db = vetor[2]
    tBaterias_db = vetor[3]
    tBateriasAux_db = vetor[4]
    cBarramento_db = vetor[5]
    cModulos_db = vetor[6]
    cBaterias_db = vetor[7]
    cBateriasAux_db = vetor[8]
    pPotenciometro_db = vetor[9]
    velocidade_db = vetor[10]
    latitude_db = vetor[11]
    longitude_db = vetor[12]



    cursor.execute("""
    INSERT INTO dados (emergencia,dms,onOFF,re,freio,cruzeiro,temperatura,tBarramento,tModulos,tBaterias,
    tBateriasAux,cBarramento,cModulos,cBaterias,cBateriasAux,pPotenciometro,velocidade,latitude,longitude)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """,(emergencia_db,dms_db,onOFF_db,re_db,freio_db,cruzeiro_db,temperatura_db,tBarramento_db,
    tModulos_db,tBaterias_db,tBateriasAux_db,cBarramento_db,cModulos_db,cBaterias_db,cBateriasAux_db,
    pPotenciometro_db,velocidade_db,latitude_db,longitude_db
    ))
    db.commit()    

    return vetor


# conexões relacionadas ao db e a porta serial
db = sqlite3.connect('../telemeapp/banco_dados/banco1.db')

cursor = db.cursor()

vetor = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
vetor[0] = random.uniform(20.0, 50.0)
vetor[1] = random.uniform(20.0, 50.0)
vetor[2] = random.uniform(20.0, 50.0)
vetor[3] = random.uniform(20.0, 50.0)
vetor[4] = random.uniform(20.0, 50.0)
vetor[5] = random.uniform(20.0, 50.0)
vetor[6] = random.uniform(20.0, 50.0)
vetor[7] = random.uniform(20.0, 50.0)
vetor[8] = random.uniform(20.0, 50.0)
vetor[9] = random.uniform(20.0, 50.0)
vetor[10] = random.uniform(20.0, 50.0)
vetor[11] = random.uniform(20.0, 50.0)
vetor[12] = random.uniform(20.0, 50.0)

while(True):
    vetor = AtualizaDB(vetor)
    print("Banco de dados atualizado com sucesso!")

    time.sleep(0.1)

    