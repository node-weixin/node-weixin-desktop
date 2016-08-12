var weixin = require('node-weixin-api');

module.exports = {
  auth: {
    tokenize: function (settings, app) {
      return new Promise(function (resolve, reject) {
        weixin.auth.tokenize(settings, app, function (error, response) {
          if (error) {
            reject([error, response]);
          } else {
            resolve(response);
          }
        });
      });
    },
    determine: function (settings, app) {
      return new Promise(function (resolve, reject) {
        weixin.auth.determine(settings, app, function (error) {
          if (error) {
            reject([error]);
          } else {
            resolve(true);
          }
        });
      });
    },
    ips: function (settings, app) {
      return new Promise(function (resolve, reject) {
        weixin.auth.ips(settings, app, function (error, data) {
          if (error) {
            reject([error, data]);
          } else {
            resolve(data);
          }
        });
      });
    },
    ack: function (token, data) {
      return new Promise(function (resolve, reject) {
        weixin.auth.ack(token, data, function (error, data) {
          if (error) {
            reject([error, data]);
          } else {
            resolve(data);
          }
        });
      });
    }
  }
};
