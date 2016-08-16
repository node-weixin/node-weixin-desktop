var templateBase = '../views';
// var config = require('../../config').windows.main;
var settings = require('../../settings');
settings.set('started', [], '0');

console.log('inside main');
const electron = require('electron');
const remote = electron.remote;
console.log(remote);
const Menu = remote.Menu;
var template = [
  { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
  { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
  { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
  { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
];
const InputMenu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(InputMenu)

$(document).ready(function () {
  function shortCutHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    let node = e.target;

    while (node) {
      if (node.nodeName.match(/^(input|textarea)$/i) || node.isContentEditable) {
        InputMenu.popup(remote.getCurrentWindow());
        break;
      }
      node = node.parentNode;
    }
  }
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    InputMenu.popup(remote.getCurrentWindow())
  }, false);
  // window.addEventListener('contextmenu', shortCutHandler);
  window.addEventListener('keypress', shortCutHandler);
});
angular.module('wetop', [
  'ngRoute'
])
  .config(
  [
    '$routeProvider',
    function ($routeProvider) {
      // $routeProvider.when('/', {
      //   templateUrl: templateBase + '/home.html',
      //   controller: 'HomeCtrl',
      //   controllerAs: '_ctrl'
      // });
      $routeProvider.when('/', {
        templateUrl: templateBase + '/interface/jssdk.html',
        controller: 'InterfaceCtrl'
      });

      // 接口API测试
      $routeProvider.when('/interface', {
        templateUrl: templateBase + '/interface/index.html',
        controller: 'InterfaceCtrl'
      });
      $routeProvider.when('/interface/auth', {
        templateUrl: templateBase + '/interface/auth.html',
        controller: 'InterfaceCtrl'
      });
      $routeProvider.when('/interface/jssdk', {
        templateUrl: templateBase + '/interface/jssdk.html',
        controller: 'InterfaceCtrl'
      });
      // 设置
      $routeProvider.when('/settings', {
        templateUrl: templateBase + '/settings/main.html',
        controller: 'SettingsCtrl'
      });
      $routeProvider.when('/settings/parameter', {
        templateUrl: templateBase + '/settings/parameters.html',
        controller: 'SettingsCtrl'
      });
      $routeProvider.when('/settings/server', {
        templateUrl: templateBase + '/settings/weixin/server.html',
        controller: 'SettingsCtrl'
      });
      $routeProvider.when('/settings/app', {
        templateUrl: templateBase + '/settings/weixin/app.html',
        controller: 'SettingsCtrl'
      });
      $routeProvider.when('/settings/message', {
        templateUrl: templateBase + '/settings/weixin/message.html',
        controller: 'SettingsCtrl'
      });
      $routeProvider.when('/settings/template', {
        templateUrl: templateBase + '/settings/template.html',
        controller: 'SettingsCtrl'
      });
      $routeProvider.when('/settings/storage', {
        templateUrl: templateBase + '/settings/storage.html',
        controller: 'SettingsCtrl'
      });
      $routeProvider.when('/about', {
        templateUrl: templateBase + '/about/index.html',
        controller: 'HomeCtrl'
      });
      $routeProvider.otherwise({
        redirectTo: '/'
      });
    }
  ]
  );
