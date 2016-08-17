'use strict';

const path = require('path');
const {BrowserWindow} = require('electron');
const config = require('../config').windows.main;
const notifier = require('node-notifier');
const fs = require('fs');

class MainWindow {
  constructor() {
    let icon = path.join(__dirname, config.icon);

    if (!fs.existsSync(icon)) {
      notifier.notify({
        title: 'File Not Found!',
        message: icon
      });
      app.exit();
    }

    this.window = new BrowserWindow({
      width: config.width,
      height: config.height,
      title: config.title,
      center: true,
      show: false,
      icon: icon
    });
    this.window.loadURL('file://' + path.join(__dirname, config.path));
    this.isShown = false;
    this.window.webContents.openDevTools();
  }

  show() {
    this.window.show();
    this.isShown = true;
  }

  hide() {
    this.window.hide();
    this.isShown = false;
  }
  close() {
    this.window.close();
  }
  once(ev, cb) {
    this.window.once(ev, cb);
  }
}

module.exports = MainWindow;
