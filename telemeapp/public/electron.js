const electron = require('electron');
const {dialog} = require('electron');
const fs = require('fs')

const { app } = electron;
const Tray = electron.Tray;
const { BrowserWindow } = electron;
const {Menu,MenuItem} = require('electron')

const path = require('path');
const isDev = require('electron-is-dev');


function buscarArquivo(){
  // If the platform is 'win32' or 'Linux'
  if (process.platform !== 'darwin') {
      // Resolves to a Promise<Object>
      dialog.showOpenDialog({
          title: 'Select the File to be uploaded',
          defaultPath: path.join(__dirname, '../assets/'),
          buttonLabel: 'Upload',
          // Restricting the user to only Text Files.
          filters: [
              {
                  name: 'Text Files',
                  extensions: ['txt', 'docx']
              }, ],
          // Specifying the File Selector Property
          properties: ['openFile']
      }).then(file => {
          // Stating whether dialog operation was
          // cancelled or not.
          console.log(file.canceled);
          if (!file.canceled) {
            // Updating the GLOBAL filepath variable 
            // to user-selected file.
            global.filepath = file.filePaths[0].toString();
            console.log(global.filepath);
            
            //lendo arquivo de texto usando modulo fs do node
            if (global.filepath && !file.canceled) {
              fs.readFile(global.filepath, {encoding: 'utf-8'}, function(err,data) {
                 if (!err) {
                      console.log('received data: ' + data);
                 } else {
                      console.log(err);
                  }
               });
             }

          }  
      }).catch(err => {
          console.log(err)
      });
  }
  else {
      // If the platform is 'darwin' (macOS)
      dialog.showOpenDialog({
          title: 'Select the File to be uploaded',
          defaultPath: path.join(__dirname, '../assets/'),
          buttonLabel: 'Upload',
          filters: [
              {
                  name: 'Text Files',
                  extensions: ['txt', 'docx']
              }, ],
          // Specifying the File Selector and Directory 
          // Selector Property In macOS
          properties: ['openFile', 'openDirectory']
      }).then(file => {
          console.log(file.canceled);
          if (!file.canceled) {
            global.filepath = file.filePaths[0].toString();
            console.log(global.filepath);
            //lendo arquivo de texto usando modulo fs do node
            if (global.filepath && !file.canceled) {
              fs.readFile(global.filepath, {encoding: 'utf-8'}, function(err,data) {
                 if (!err) {
                      console.log('received data: ' + data);
                 } else {
                      console.log(err);
                  }
               });
             }


          }  
      }).catch(err => {
          console.log(err)
      });
  }


  //testando
  
}



//Message Control
require('../src/message-control/main'); 

let mainWindow;

function createWindow() {
  const appIcon = new Tray(__dirname+'/logo_Sol.png')
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
    icon :__dirname+'/logo_Sol.png'
  });

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.resolve(__dirname, '..', 'build', 'index.html')}`,
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

const menu = Menu.buildFromTemplate([
  {
    label:"File",
    submenu: [
      {
        label:"Inserir corrida",
        click: (MenuItem,BrowserWindow,event) =>{buscarArquivo()}
      }
    ]
  },
  {
    label:"Visualizador",
    submenu: [
      {
        role:'reload'
      },
      {
        role:'toggleDevTools'
      },
      {
        role:'resetZoom'
      },
      {
        role:'zoomIn'
      },
      {
        role:'zoomOut'
      },
      {
        role:'togglefullscreen'
      }
    ]
  }
]);

Menu.setApplicationMenu(menu);

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});


