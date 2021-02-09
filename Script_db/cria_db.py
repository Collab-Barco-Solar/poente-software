import sqlite3

db = sqlite3.connect('banco1.db')

cursor = db.cursor()

cursor.execute("""CREATE TABLE dados (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    emergencia INTEGER,
    dms INTEGER,
    onOFF INTEGER,
    re INTEGER,
    freio INTEGER,
    cruzeiro INTEGER,
    temperatura DOUBLE,
    tBarramento DOUBLE,
    tModulos DOUBLE,
    tBaterias DOUBLE,
    tBateriasAux DOUBLE,
    cBarramento DOUBLE,
    cModulos DOUBLE,
    cBaterias DOUBLE,
    cBateriasAux DOUBLE,
    pPotenciometro DOUBLE,
    velocidade DOUBLE,
    latitude DOUBLE,
    longitude DOUBLE
    );
    
    """)

print('tabela criada com sucesso')