var templateBase = '../views';
var config = require('../../config').windows.main;

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
      $routeProvider.when('/settings/app', {
        templateUrl: templateBase + '/settings/app.html',
        controller: 'SettingsCtrl'
      });
      $routeProvider.when('/settings/app', {
        templateUrl: templateBase + '/settings/app.html',
        controller: 'SettingsCtrl'
      });
      $routeProvider.when('/settings/message', {
        templateUrl: templateBase + '/settings/message.html',
        controller: 'SettingsCtrl'
      });
      $routeProvider.otherwise({
        redirectTo: '/'
      });
    }
  ]
  );
