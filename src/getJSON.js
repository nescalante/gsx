'use strict';

module.exports = getJSON;

function getJSON(path, cb) {
  var xhr = new XMLHttpRequest();
  var json;

  xhr.open('GET', path);
  xhr.onload = function() {
    if (xhr.readyState !== 4 || xhr.status !== 200) {
      cb(xhr);
      return;
    }

    try {
      json = JSON.parse(xhr.responseText);
    } catch (e) {
      cb(xhr);
      return;
    }

    cb(null, json);
  };
  xhr.send();
}
