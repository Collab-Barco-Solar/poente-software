import serial
import sqlite3


db = sqlite3.connect('teste.db')

cursor = db.cursor()




porta = "/dev/ttyUSB0"
velocidade = 9600

conexao = serial.Serial(porta,velocidade)

while(1):
    leitura = conexao.read()
    cursor.execute("""
    INSERT INTO dados (num)
    VALUES(?)
    """,(leitura,))
    db.commit()
    print("dado inserido")