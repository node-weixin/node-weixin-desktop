var config = require('../../config').windows.main;
var weixin = require('../../weixin/');
angular.module('wetop')
  .controller('HomeCtrl', function ($scope) {
    console.log('inside home controller');
    $scope.module = 'home';
    $scope.title = config.title;
    $scope.app = weixin.getSettings('app');
    console.log($scope.app);
    console.log(JSON.stringify($scope.app));
  });
