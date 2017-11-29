const electron = require('electron');
const fs = require('fs');
const {
    app
} = electron;
const {
    BrowserWindow
} = electron;
const action = require('./self/action.js');


global.action = action;
let win;


function createWindow() {
    win = new BrowserWindow({
        width: 3000,
        height: 2000,
        autoHideMenuBar: true
    });
    win.loadURL(`file://${__dirname}/web/index.html`);

    // 打开窗口的调试工具
    win.webContents.openDevTools();

    // 窗口关闭的监听
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
