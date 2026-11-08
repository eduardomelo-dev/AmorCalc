const { app, BrowserWindow, shell } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const developmentUrl = 'http://127.0.0.1:5173';
const isDevelopment = !app.isPackaged && process.argv.includes('--dev');

function isExternalWebUrl(value) {
  return value.startsWith('https://') || value.startsWith('http://');
}

function createWindow() {
  const indexPath = path.resolve(__dirname, '../dist/index.html');
  const appUrl = isDevelopment ? developmentUrl : pathToFileURL(indexPath).href;
  const window = new BrowserWindow({
    width: 1180,
    height: 820,
    minWidth: 360,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    icon: path.resolve(__dirname, '../build/icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  window.once('ready-to-show', () => window.show());
  window.webContents.setWindowOpenHandler(({ url }) => {
    if (isExternalWebUrl(url)) {
      void shell.openExternal(url);
    }
    return { action: 'deny' };
  });
  window.webContents.on('will-navigate', (event, url) => {
    if (url === appUrl || url.startsWith(`${appUrl}#`)) {
      return;
    }

    event.preventDefault();
    if (isExternalWebUrl(url)) {
      void shell.openExternal(url);
    }
  });

  if (isDevelopment) {
    void window.loadURL(developmentUrl);
  } else {
    void window.loadFile(indexPath);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
