// var config = require('../../config').windows.main;
var weixin = require('../../weixin/');
var validator = require('validator');
var shell = require('electron').shell;
var clipboard = require('electron').clipboard;

var api = require('../../weixin/api');
var settings = require('../../settings');
var wxs = require('../../settings').getObject();
var notifier = require('node-notifier');
var appServer = require('node-weixin-express');

angular.module('wetop')
  .controller('InterfaceCtrl', function ($scope, $route) {
    var started = false;
    console.log('inside home controller');
    $scope.module = 'interface';
    var template = settings.get('template', true);
    var server = settings.get('server');
    server.prefix = '/weixin';
    $scope.template = template;
    var path = $route.current.$$route.originalPath;
    switch (path) {
      case '/interface/jssdk':
      default:

        $scope.url = '#/settings';
        $scope.title = 'JSSDK微信网页测试';
        break;
    }
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

    $scope.open = function () {
      console.log('url' + $scope.server.url);
      shell.openExternal($scope.server.url);
    };

    $scope.copy = function () {
      clipboard.writeText($scope.server.url);
      notifier.notify('复制成功');
    };

    $scope.test = {
      start: function () {
        var app = settings.get('app');
        var template = settings.get('template', true);
        var server = settings.get('server');
        started = settings.get('started', true);
        if (started !== '1') {
          started = false;
        }
        console.log(started);
        var config = {
          weixin: {
            server: {
              prefix: server.prefix
            },
            app: app
          },
          template: template,
          port: server && server.port || 2048,
          host: server && server.host || 'localhost'
        };

        $scope.config = config;

        if (started) {
          console.log(appServer);
          appServer._tunnel._tunnel.restart();
          return;
        }

        settings.set('started', [], '1');
        appServer.init(config, function (url) {
          if (!validator.isURL(url)) {
            $scope.template = template;

            $scope.$apply(function () {
              $scope.server = {
                status: '连接失败, 请重新连接！',
                url: url,
                prefix: server.prefix
              };
            });
            console.log('inside url');
            return;
          }
          console.log(url);
          console.log(arguments);
          $scope.$apply(function () {
            $scope.template = template;
            $scope.server = {
              status: '连接成功！',
              url: url,
              prefix: server.prefix
            };
          });
          // weixin.onAuthEvent(onAuthEvent);
          // weixin.onAuthMessage(onAuthMessage);
          // weixin.onOauthAccess(onOAuthAccess);
          // weixin.onOauthSuccess(onOAuthSuccess);
          // router(app, config);
          // server.listen(config.port, config.host, function() {
          // });
        });
      },
      jssdk: function () {
        $scope.template = settings.get('template');
        $scope.server = {
        };
      }
    };
  });
