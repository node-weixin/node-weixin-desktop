
module.exports = {
  tray: {
    title: 'WeTop',
    icon: 'lib/frontend/images/app.png',
    iconMac: 'lib/frontend/images/mac.png'
  },
  windows: {
    splash: {
      path: '../frontend/views/splash.html',
      width: 400,
      height: 160,
      title: 'WeTop微信伴侣',
      icon: 'lib/frontend/images/app.png',
      delay: 3
    },
    main: {
      width: 400,
      height: 600,
      path: '../frontend/views/main.html',
      title: 'WeTop微信伴侣',
      icon: 'lib/frontend/images/app.png',
      delay: 3
    }
  }
};
