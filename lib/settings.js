module.exports = {
  set: function (key, keys, value) {
    var data = {};
    for (var i = 0; i < keys.length; i++) {
      data[keys[i]] = value[keys[i]];
    }
    localStorage.setItem(key, JSON.stringify(data));
  },
  get: function (key) {
    var data = localStorage.getItem(key);
    console.log('settings.get' + data);
    if (!data) {
      return {};
    }
    return JSON.parse(data);
  }
};
