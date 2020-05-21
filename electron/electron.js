const {app, BrowserWindow, Tray, Menu, dialog} = require('electron');
const path = require("path");
let mainWindow;

function createMainWindow() {
    let win = new BrowserWindow({
        width: 900,
        height: 493,
        icon: path.join(__dirname, 'yn.ico'),
        transparent: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false

        },
        autoHideMenuBar: true,
        center: true,
        thickFrame: true,
    });
    win.setBackgroundColor('#00000000');


    const url = "http://localhost:3002";

    win.loadURL(url).then(() => console.log("URL loaded."));

    let appIcon = null;
    win.on('minimize', function (event) {
        event.preventDefault();
        win.hide();
        appIcon = createTray();
    });

    win.on('restore', function (event) {
        win.show();
        appIcon.destroy();
    });


    return win;
}

function createTray() {
    let appIcon = new Tray(path.join(__dirname, "yn.ico"));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Göster', click: function () {
                mainWindow.show();
            }
        },
        {
            label: 'Çıkış', click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    appIcon.on('double-click', function (event) {
        mainWindow.show();
    });
    appIcon.setToolTip('Yeni Nesil Gaming Client');
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
