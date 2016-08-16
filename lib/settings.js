var wxs = require('node-weixin-settings');
var storage = localStorage;

wxs.registerGet(function (id, key, cb) {
  var data = storage.getItem(id);
  if (!data) {
    return cb(null);
  }
  try {
    var json = JSON.parse(data);
    cb(json[key]);
  } catch (e) {
    console.error(e);
    return cb(null);
  }
});

wxs.registerSet(function (id, key, value, cb) {
  var data = storage.getItem(id);
  if (!data) {
    data = '{}';
  }
  try {
    var json = JSON.parse(data);
    json[key] = value;
    storage.setItem(id, JSON.stringify(json));
    cb(json);
  } catch (e) {
    console.error(e);
    return cb(null);
  }
});

wxs.registerAll(function (id, cb) {
  var data = storage.getItem(id);
  if (!data) {
    data = '{}';
  }
  try {
    var json = JSON.parse(data);
    cb(json);
  } catch (e) {
    console.error(e);
    return cb(null);
  }
});

module.exports = {
  set: function (key, keys, value) {
    if (!keys || !keys.length) {
      storage.setItem(key, value);
      return;
    }
    var data = {};
    console.log(value);
    for (var i = 0; i < keys.length; i++) {
      data[keys[i]] = value[keys[i]];
    }
    console.log(data);
    storage.setItem(key, JSON.stringify(data));
  },
  get: function (key, noJson) {
    var data = storage.getItem(key);
    console.log('settings.get' + data);
    if (!data) {
      if (noJson) {
        return '';
      }
      return {};
    }
    if (noJson) {
      return data;
    }
    return JSON.parse(data);
  },
  getObject: function () {
    return wxs;
  }
};
