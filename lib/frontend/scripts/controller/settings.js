var settings = require('../../settings');
var config = require('../../share');

angular.module('wetop')
  .controller('SettingsCtrl', function ($scope, $route) {
    console.log('inside settings controller');
    $scope.module = 'settings';
    $scope.title = '系统设置';

    console.log($scope);
    console.log($route.current.$$route.originalPath);
    $scope.url = '#/settings/parameter';
    $scope.showBack = true;
    var path = $route.current.$$route.originalPath;
    switch (path) {
      case '/settings/parameter':
        $scope.url = '#/settings';
        $scope.title = '公共号参数设置';
        break;
      case '/settings/server':
        $scope.server = settings.get('server');
        $scope.title = 'server参数设置';
        break;
      case '/settings/app':
        $scope.app = settings.get('app');
        $scope.title = 'app参数设置';
        break;
      case '/settings/message':
        $scope.message = settings.get('message');
        $scope.title = 'message参数设置';
        break;
      case '/settings/template':
        $scope.url = '#/settings';
        $scope.saved = settings.get('template', true);
        $scope.title = 'JSSDK模板设置';
        break;
      case '/settings/storage':
        $scope.url = '#/settings';
        $scope.saved = settings.get('storage', true);
        $scope.title = '消息保存路径设置';
        break;
      default:
        $scope.showBack = false;
        break;
    }

    $scope.submitApp = function () {
      settings.set('app', ['id', 'secret', 'token'], $scope.app);
      return false;
    };

    $scope.submitMessage = function () {
      settings.set('message', ['aes'], $scope.message);
      return false;
    };
    $scope.submitTemplate = function () {
      settings.set('template', [], $scope.template);
      $scope.saved = $scope.template;
      config.template = $scope.template;
      return false;
    };

    $scope.submitStorage = function () {
      settings.set('storage', [], $scope.storage);
      $scope.saved = $scope.storage;
      return false;
    };
    $scope.onSelectTemplate = function (element) {
      $scope.$apply(function () {
        $scope.template = element.files[0].path;
      });
      console.log(element);
      console.log(element.files);
      console.log(element.files[0].path);
      console.log(element.files[0].path);
    };
    $scope.onSelectStorage = function (element) {
      $scope.$apply(function () {
        $scope.storage = element.files[0].path;
      });
      console.log(element);
      console.log(element.files);
      console.log(element.files[0].path);
      console.log(element.files[0].path);
    };
  });
