// var config = require('../../config').windows.main;
var weixin = require('../../weixin/');
// var shell = require('electron').shell;

var api = require('../../weixin/api');
var settings = require('../../settings');
var wxs = require('../../settings').getOject();
var notifier = require('node-notifier');

angular.module('wetop')
  .controller('InterfaceCtrl', function ($scope, $route) {
    console.log('inside home controller');
    $scope.module = 'interface';
    $scope.testAuth = function () {
      var app = settings.get('app');
      console.log(app);
      var v = weixin.check('app', app);
      console.log(v);
      console.log(wxs);
      if (!v.code) {
        var value = api.auth.tokenize(wxs, v.data);
        value.then(function (res) {
          if (res.errcode) {
            notifier.notify(res);
          } else {
            notifier.notify({
              title: '成功!',
              message: 'accessToken: ' + res.access_token
            });
          }
        });
      }
    };
  });
