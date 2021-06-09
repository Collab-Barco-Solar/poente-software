const electron = require('electron');

const { app } = electron;
const Tray = electron.Tray;
const { BrowserWindow } = electron;
const {Menu,MenuItem} = require('electron')

const path = require('path');
const isDev = require('electron-is-dev');

//Message Control
require('../src/message-control/main'); 

let mainWindow;

function createWindow() {
  const appIcon = new Tray(__dirname+'/logo_Sol.png')
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
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