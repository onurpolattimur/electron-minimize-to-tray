const {app, BrowserWindow, Tray, Menu, dialog} = require('electron');
const path = require("path");
let mainWindow;

function createMainWindow() {
    let win = new BrowserWindow({
        width: 900,
        height: 493,
        icon: path.join(__dirname, 'cloud_fun.ico'),
        transparent: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
        },
        autoHideMenuBar: true,
        center: true,
        thickFrame: true,
    });


    const url = "http://localhost:3002";

    win.loadURL(url).then(() => console.log("URL loaded."));

    let tray = null;
    win.on('minimize', function (event) {
        event.preventDefault();
        win.hide();
        tray = createTray();
    });

    win.on('restore', function (event) {
        win.show();
        tray.destroy();
    });


    return win;
}

function createTray() {
    let appIcon = new Tray(path.join(__dirname, "cloud_fun.ico"));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show', click: function () {
                mainWindow.show();
            }
        },
        {
            label: 'Exit', click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    appIcon.on('double-click', function (event) {
        mainWindow.show();
    });
    appIcon.setToolTip('Tray Tutorial');
    appIcon.setContextMenu(contextMenu);
    return appIcon;
}

app.whenReady().then(() => {
    mainWindow = createMainWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});
