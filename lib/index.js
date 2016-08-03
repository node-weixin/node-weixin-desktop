const {app, Menu} = require('electron');
const SplashWindow = require('./windows/splash');
const MainWindow = require('./windows/main');
const Tray = require('./tray');
const {windows} = require('./config');
const menuTemplate = require('./menu');
var menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let main;
let splash;
let tray;

function createWindow() {
  splash = new SplashWindow();
  splash.show();

  setTimeout(function () {
    splash.close();
  }, windows.splash.delay * 1000);

  // Create the browser window.
  main = new MainWindow();
  main.once('ready-to-show', () => {
    main.show();
  });

  tray = new Tray(splash, main);

  // and load the index.html of the app.
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (main === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
