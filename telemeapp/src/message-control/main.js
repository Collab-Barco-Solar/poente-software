const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./banco_dados/banco1.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) console.error('Database opening error: ', err);
});


ipcMain.on('asynchronous-message', (event, arg) => {
    const sql = arg;

    //usar .each em vez de .all Talvez
    database.all(sql, (err, rows) => {
      event.reply('asynchronous-reply', (err && err.message) || rows);
    });
});