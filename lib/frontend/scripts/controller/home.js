var config = require('../../config').windows.main;
angular.module('wetop')
  .controller('HomeCtrl', function ($scope) {
    console.log('inside home controller');
    $scope.module = 'home';
    $scope.title = config.title;
  });
