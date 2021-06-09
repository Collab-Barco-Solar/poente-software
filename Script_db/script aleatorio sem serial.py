import sqlite3
import random
import time

# conexões relacionadas ao db e a porta serial
db = sqlite3.connect('../telemeapp/banco_dados/banco1.db')

cursor = db.cursor()


def AtualizaDB():
    emergencia_db = random.randint(0, 1)
    dms_db = random.randint(0, 1)
    onOFF_db = random.randint(0, 1)
    re_db = random.randint(0, 1)
    freio_db = random.randint(0, 1)
    cruzeiro_db = random.randint(0, 1)


    temperatura_db = random.uniform(20.0, 50.0)
    tBarramento_db = random.uniform(20.0, 50.0)
    tModulos_db = random.uniform(20.0, 50.0)
    tBaterias_db = random.uniform(20.0, 50.0)
    tBateriasAux_db = random.uniform(20.0, 50.0)
    cBarramento_db = random.uniform(20.0, 50.0)
    cModulos_db = random.uniform(20.0, 50.0)
    cBaterias_db = random.uniform(20.0, 50.0)
    cBateriasAux_db = random.uniform(20.0, 50.0)
    pPotenciometro_db = random.uniform(20.0, 50.0)
    velocidade_db = random.uniform(20.0, 50.0)
    latitude_db = random.uniform(20.0, 50.0)
    longitude_db = random.uniform(20.0, 50.0)



    cursor.execute("""
    INSERT INTO dados (emergencia,dms,onOFF,re,freio,cruzeiro,temperatura,tBarramento,tModulos,tBaterias,
    tBateriasAux,cBarramento,cModulos,cBaterias,cBateriasAux,pPotenciometro,velocidade,latitude,longitude)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """,(emergencia_db,dms_db,onOFF_db,re_db,freio_db,cruzeiro_db,temperatura_db,tBarramento_db,
    tModulos_db,tBaterias_db,tBateriasAux_db,cBarramento_db,cModulos_db,cBaterias_db,cBateriasAux_db,
    pPotenciometro_db,velocidade_db,latitude_db,longitude_db
    ))
    db.commit()    


while(True):
    AtualizaDB()
    print("Banco de dados atualizado com sucesso!")

    time.sleep(0.1)

    