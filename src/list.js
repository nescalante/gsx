'use strict';

module.exports = list;

function list(source) {
  return source.feed.entry.map(function (entry) {
    var obj = {};

    Object.keys(entry).filter(function (key) {
      return /gsx\$/.test(key);
    }).forEach(function (key) {
      obj[key.substring(4)] = entry[key].$t;
    });

    return obj;
  });
}
