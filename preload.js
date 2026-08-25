const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectDirectorySync: () => ipcRenderer.sendSync('select-directory-sync'),
    saveDataSync: (args) => ipcRenderer.sendSync('save-data-sync', args),
    loadDataSync: (args) => ipcRenderer.sendSync('load-data-sync', args),
    createBackupSync: (args) => ipcRenderer.sendSync('create-backup-sync', args)
});


window.addEventListener('DOMContentLoaded', () => {
    console.log('Electron Preload: Application Loaded');
});
