'use strict';

const path = require('path');
const {BrowserWindow} = require('electron');
const config = require('../config').windows.splash;

class SplashWindow {
  constructor() {
    this.splashWindow = new BrowserWindow({
      width: config.width,
      height: config.height,
      title: config.title,
      resizable: false,
      center: true,
      show: true,
      frame: false,
      autoHideMenuBar: true,
      alwaysOnTop: true,
      icon: config.icon,
      titleBarStyle: 'hidden'
    });
    alert(config.html);
    alert(path)
    this.splashWindow.loadURL('file://' + path.join(__dirname, config.html));
    this.isShown = false;
  }

  show() {
    this.splashWindow.show();
    this.isShown = true;
  }

  hide() {
    this.splashWindow.hide();
    this.isShown = false;
  }
}

module.exports = SplashWindow;