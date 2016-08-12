var validation = require('./validation');
var settings = require('../settings');
var validator = require('node-form-validator');


var weixin = {
  getSettings: function (key) {
    console.log('weixin. get settings');
    if (key) {
      return settings.get(key);
    }
    var data = {};
    for (var k in validation) {
      if (typeof k === 'string') {
        data[k] = settings.get(k);
      }
    }
    return data;
  },
  init: function () {

  },
  check: function (key, data) {
    return validator.validate(data, validation[key].validate);
  }
};
module.exports = weixin;
