var settings = require('../../settings');


angular.module('wetop')
  .controller('SettingsCtrl', function ($scope, $route) {
    console.log('inside settings controller');
    $scope.module = 'settings';
    $scope.title = '系统设置';

    console.log($scope);
    console.log($route.current.$$route.originalPath);
    $scope.url = '#/settings';
    var path = $route.current.$$route.originalPath;
    switch (path) {
      case '/settings/parameter':
        $scope.showBack = true;
        $scope.app = settings.get('app');
        $scope.title = '参数设置';
        break;
      case '/settings/app':
        $scope.url = '#/settings/parameter';
        $scope.showBack = true;
        $scope.app = settings.get('app');
        $scope.title = 'app参数设置';
        break;
      case '/settings/message':
        $scope.url = '#/settings/parameter';
        $scope.showBack = true;
        $scope.message = settings.get('message');
        $scope.title = 'message参数设置';
        break;
      default:
        break;
    }

    $scope.submitApp = function () {
      settings.set('app', ['id', 'secret', 'token'], $scope.app);
    };

    $scope.submitMessage = function () {
      settings.set('message', ['aes'], $scope.message);
    };
  });
