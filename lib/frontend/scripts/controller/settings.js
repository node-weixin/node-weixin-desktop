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
        $scope.app = getSettings('app');
        $scope.title = 'app参数设置';
        break;
      case '/settings/app':
        $scope.url = '#/settings/parameter';
        $scope.showBack = true;
        $scope.app = getSettings('app');
        $scope.title = 'app参数设置';
        break;
      case '/settings/message':
        $scope.url = '#/settings/parameter';
        $scope.showBack = true;
        $scope.message = getSettings('message');
        $scope.title = 'message参数设置';
        break;
      default:
        break;
    }

    function saveSettings(key, keys, value) {
      var data = {};
      for (var i = 0; i < keys.length; i++) {
        data[keys[i]] = value[keys[i]];
      }
      localStorage.setItem(key, JSON.stringify(data));
    }
    function getSettings(key) {
      var data = localStorage.getItem(key);
      if (!data) {
        return {};
      }
      return JSON.parse(data);
    }

    $scope.submitApp = function () {
      saveSettings('app', ['id', 'secret', 'token'], $scope.app);
    };

    $scope.submitMessage = function () {
      saveSettings('message', ['aes'], $scope.message);
    };
  });
