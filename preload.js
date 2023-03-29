const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mdAPI', {

    save: (fileContents) => ipcRenderer.send('save-action', fileContents),
    open: () => ipcRenderer.send('open-action'),

    handleEditorEvent: (callback) => ipcRenderer.on('editor-event', callback)
    
})