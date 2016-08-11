var templateBase = '../views';
// var config = require('../../config').windows.main;

console.log('inside main');
angular.module('wetop', [
  'ngRoute'
])
  .config(
  [
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: templateBase + '/home.html',
        controller: 'HomeCtrl',
        controllerAs: '_ctrl'
      });
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
      $routeProvider.when('/about', {
        templateUrl: templateBase + '/about/index.html',
        controller: 'HomeCtrl'
      });
      $routeProvider.when('/interface', {
        templateUrl: templateBase + '/about/index.html',
        controller: 'HomeCtrl'
      });

      $routeProvider.otherwise({
        redirectTo: '/'
      });
    }
  ]
  );
