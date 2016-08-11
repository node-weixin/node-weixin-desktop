var config = require('../../config').windows.main;
var weixin = require('../../weixin/');
var shell = require('electron').shell;

angular.module('wetop')
  .controller('HomeCtrl', function ($scope, $route) {
    console.log('inside home controller');
    $scope.module = 'home';
    $scope.title = config.title;
    $scope.app = weixin.getSettings('app');
    console.log($scope.app);
    console.log(JSON.stringify($scope.app));
    var path = $route.current.$$route.originalPath;
    switch (path) {
      case '/about':
        $scope.showBack = true;
        $scope.url = '#/settings';
        $scope.title = '关于';
        break;
      default:
        break;
    }

    $scope.openNew = function (url) {
      console.log(url);
      shell.openExternal(url);
    };
  });
