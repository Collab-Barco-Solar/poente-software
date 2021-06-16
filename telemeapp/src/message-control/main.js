const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./banco_dados/banco1.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) console.log('Database opening error: ' + err);
});


ipcMain.on('asynchronous-message', (event, arg) => {
    const sql_command = arg;

    database.all(sql_command, (err, rows) => {
        event.reply('asynchronous-reply', (err && err.message) || rows);
    });
}); 
