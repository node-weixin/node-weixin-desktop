module.exports = {
  set: function (key, keys, value) {
    if (!keys || !keys.length) {
      localStorage.setItem(key, value);
      return;
    }
    var data = {};
    for (var i = 0; i < keys.length; i++) {
      data[keys[i]] = value[keys[i]];
    }
    localStorage.setItem(key, JSON.stringify(data));
  },
  get: function (key, noJson) {
    var data = localStorage.getItem(key);
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
  }
};
