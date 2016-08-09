var validation = require('./validation');
var settings = require('../settings');
module.exports = {
  getSettings: function () {
    var data = {};
    for (var k in validation) {
      if (typeof k === 'string') {
        data[k] = settings.get(k);
      }
    }
    return data;
  },
  init: function () {

  }
};
