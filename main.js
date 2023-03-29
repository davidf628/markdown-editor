const { app, BrowserWindow, Menu, globalShortcut, ipcMain } = require('electron');
const path = require('path');
const menu = require('./menu');
const { saveAction, openAction } = require('./actions');

let window;

app.on('ready', () => {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    ipcMain.on('save-action', (event, fileContents) => saveAction(fileContents));
    ipcMain.on('open-action', (event) => openAction());

    window.loadFile('index.html');

    globalShortcut.register('CommandOrControl+S', () => {
        window.webContents.send('editor-event', { action: 'save' });
    });
    globalShortcut.register('CommandOrControl+O', () => {
        window.webContents.send('editor-event', { action: 'open' });
    });
});

Menu.setApplicationMenu(menu);

