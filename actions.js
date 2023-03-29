const { BrowserWindow, dialog } = require('electron');
const fs = require('fs');

//exports.saveAction = function(fileContents) {
export function saveAction() {
    const options = {
        title: 'Save Markdown File',
        filters: [{
            name: 'MyFile',
            extensions: ['md'],
        }]
    };
    dialog.showSaveDialog(options).then(file => {
        if(!file.canceled) {
            fs.writeFileSync(file.filePath.toString(), fileContents);
        };
    }).catch(err => {
        console.log(err);
    })
}

//exports.openAction = function() {
export function openAction() {
    const window = BrowserWindow.getFocusedWindow();
    const options = {
        title: 'Pick a MarkDown File',
        filters: [
            { name: 'Markdown files', extensions: ['md']},
            { name: 'Text files', extensions: ['txt']}
        ]
    };
    dialog.showOpenDialog(window, options).then(result => {
        if(!result.canceled) {
            const content = fs.readFileSync(result.filePaths[0]).toString();
            window.webContents.send('editor-event', { action: 'load', data: content });
        };
    }).catch(err => {
        console.log(err);
    });
}