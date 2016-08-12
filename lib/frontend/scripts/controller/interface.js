// var config = require('../../config').windows.main;
var weixin = require('../../weixin/');
// var shell = require('electron').shell;

var api = require('../../weixin/api');
var settings = require('../../settings');
var wxs = require('../../settings').getObject();
var notifier = require('node-notifier');
var appServer = require('../../server');

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
        if (app.id) {
          wxs.get(app.id, 'auth', function (auth) {
            console.log(auth);
            $scope.auth = auth;
          });
        }
        var value = api.auth.tokenize(wxs, v.data);
        value.then(function (res) {
          var status = '成功';
          if (res.errcode) {
            status = '失败！';
            notifier.notify(res);
          } else {
            notifier.notify({
              title: '成功!',
              message: 'accessToken: ' + res.access_token
            });
          }
          $scope.$apply(function () {
            $scope.auth = {
              accessToken: res.access_token
            };
            $scope.status = status;
            if (res.errmsg) {
              $scope.reason = res.errmsg;
            }
          });
        });
      }
    };

    $scope.test = {
      start: function () {
        var app = settings.get('app');
        var template = settings.get('template');
        var server = settings.get('server');
        var config = {
          app: app,
          template: template,
          port: server && server.port || 2048,
          host: server && server.host || 'localhost'
        };
        appServer(function (server, weixin) {
          console.log(arguments);
          // weixin.onAuthEvent(onAuthEvent);
          // weixin.onAuthMessage(onAuthMessage);
          // weixin.onOauthAccess(onOAuthAccess);
          // weixin.onOauthSuccess(onOAuthSuccess);
          // router(app, config);
          server.listen(config.port, config.host, function() {
            
          });
        }, appServer, '/weixin');
      },
      jssdk: function () {
        $scope.template = settings.get('template');
        $scope.server = {
        };
      }
    };
  });
