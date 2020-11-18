import sqlite3

db = sqlite3.connect('teste.db')

cursor = db.cursor()

cursor.execute("""CREATE TABLE dados (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    num TEXT NOT NULL

    );
    
    """)

print('tabela criada com sucesso')