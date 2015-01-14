(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var main = require('./src/main.js');

if (typeof window !== 'undefined') {
  window.gsx = main;
}

module.exports = main;

},{"./src/main.js":6}],2:[function(require,module,exports){
'use strict';

var Sheet = require('./sheet.js');

module.exports = Book;

function Book(source, key) {
  this.sheets = source.feed.entry.map(function (sheet) {
    return new Sheet(sheet, key);
  });
}

},{"./sheet.js":7}],3:[function(require,module,exports){
'use strict';

module.exports = 'https://spreadsheets.google.com';

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

var fetch = require('./getJSON.js');
var Book = require('./book.js');
var endpoint = require('./endpoint.js');

module.exports = init;

function init(key, cb) {
  if(/key=/.test(key)) {
    key = key.match('key=(.*?)(&|#|$)')[1];
  }

  if(/pubhtml/.test(key)) {
    key = key.match('d\\/(.*?)\\/pubhtml')[1];
  }

  fetch(endpoint + '/feeds/worksheets/' + key + '/public/basic?alt=json', function (err, data) {
    if (err) {
      cb(err);
      return;
    }

    cb(null, new Book(data, key));
  });
}

},{"./book.js":2,"./endpoint.js":3,"./getJSON.js":4}],7:[function(require,module,exports){
'use strict';

var list = require('./list.js');
var endpoint = require('./endpoint.js');
var fetch = require('./getJSON.js');

module.exports = Sheet;

function Sheet(source, key) {
  var content, path;
  var $this = this;

  this.name = source.content.$t;
  this.id = source.link[source.link.length - 1].href.split('/').pop();
  this.fetch = function (cb) {
    if (content) {
      return cb(null, content);
    }

    fetch(endpoint + '/feeds/list/' + key + '/' + $this.id + '/public/values?alt=json', function (err, data) {
      if (err) {
        cb(err);
        return;
      }

      content = list(data);
      cb(null, content);
    });
  };
}

},{"./endpoint.js":3,"./getJSON.js":4,"./list.js":5}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiaW5kZXguanMiLCJzcmNcXGJvb2suanMiLCJzcmNcXGVuZHBvaW50LmpzIiwic3JjXFxnZXRKU09OLmpzIiwic3JjXFxsaXN0LmpzIiwic3JjXFxtYWluLmpzIiwic3JjXFxzaGVldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBtYWluID0gcmVxdWlyZSgnLi9zcmMvbWFpbi5qcycpO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luZG93LmdzeCA9IG1haW47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFpbjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFNoZWV0ID0gcmVxdWlyZSgnLi9zaGVldC5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJvb2s7XG5cbmZ1bmN0aW9uIEJvb2soc291cmNlLCBrZXkpIHtcbiAgdGhpcy5zaGVldHMgPSBzb3VyY2UuZmVlZC5lbnRyeS5tYXAoZnVuY3Rpb24gKHNoZWV0KSB7XG4gICAgcmV0dXJuIG5ldyBTaGVldChzaGVldCwga2V5KTtcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gJ2h0dHBzOi8vc3ByZWFkc2hlZXRzLmdvb2dsZS5jb20nO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEpTT047XG5cbmZ1bmN0aW9uIGdldEpTT04ocGF0aCwgY2IpIHtcbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB2YXIganNvbjtcblxuICB4aHIub3BlbignR0VUJywgcGF0aCk7XG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT09IDQgfHwgeGhyLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICBjYih4aHIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBqc29uID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjYih4aHIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNiKG51bGwsIGpzb24pO1xuICB9O1xuICB4aHIuc2VuZCgpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3Q7XG5cbmZ1bmN0aW9uIGxpc3Qoc291cmNlKSB7XG4gIHJldHVybiBzb3VyY2UuZmVlZC5lbnRyeS5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgdmFyIG9iaiA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoZW50cnkpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gL2dzeFxcJC8udGVzdChrZXkpO1xuICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgb2JqW2tleS5zdWJzdHJpbmcoNCldID0gZW50cnlba2V5XS4kdDtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmV0Y2ggPSByZXF1aXJlKCcuL2dldEpTT04uanMnKTtcbnZhciBCb29rID0gcmVxdWlyZSgnLi9ib29rLmpzJyk7XG52YXIgZW5kcG9pbnQgPSByZXF1aXJlKCcuL2VuZHBvaW50LmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdDtcblxuZnVuY3Rpb24gaW5pdChrZXksIGNiKSB7XG4gIGlmKC9rZXk9Ly50ZXN0KGtleSkpIHtcbiAgICBrZXkgPSBrZXkubWF0Y2goJ2tleT0oLio/KSgmfCN8JCknKVsxXTtcbiAgfVxuXG4gIGlmKC9wdWJodG1sLy50ZXN0KGtleSkpIHtcbiAgICBrZXkgPSBrZXkubWF0Y2goJ2RcXFxcLyguKj8pXFxcXC9wdWJodG1sJylbMV07XG4gIH1cblxuICBmZXRjaChlbmRwb2ludCArICcvZmVlZHMvd29ya3NoZWV0cy8nICsga2V5ICsgJy9wdWJsaWMvYmFzaWM/YWx0PWpzb24nLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgY2IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjYihudWxsLCBuZXcgQm9vayhkYXRhLCBrZXkpKTtcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBsaXN0ID0gcmVxdWlyZSgnLi9saXN0LmpzJyk7XG52YXIgZW5kcG9pbnQgPSByZXF1aXJlKCcuL2VuZHBvaW50LmpzJyk7XG52YXIgZmV0Y2ggPSByZXF1aXJlKCcuL2dldEpTT04uanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGVldDtcblxuZnVuY3Rpb24gU2hlZXQoc291cmNlLCBrZXkpIHtcbiAgdmFyIGNvbnRlbnQsIHBhdGg7XG4gIHZhciAkdGhpcyA9IHRoaXM7XG5cbiAgdGhpcy5uYW1lID0gc291cmNlLmNvbnRlbnQuJHQ7XG4gIHRoaXMuaWQgPSBzb3VyY2UubGlua1tzb3VyY2UubGluay5sZW5ndGggLSAxXS5ocmVmLnNwbGl0KCcvJykucG9wKCk7XG4gIHRoaXMuZmV0Y2ggPSBmdW5jdGlvbiAoY2IpIHtcbiAgICBpZiAoY29udGVudCkge1xuICAgICAgcmV0dXJuIGNiKG51bGwsIGNvbnRlbnQpO1xuICAgIH1cblxuICAgIGZldGNoKGVuZHBvaW50ICsgJy9mZWVkcy9saXN0LycgKyBrZXkgKyAnLycgKyAkdGhpcy5pZCArICcvcHVibGljL3ZhbHVlcz9hbHQ9anNvbicsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY2IoZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ID0gbGlzdChkYXRhKTtcbiAgICAgIGNiKG51bGwsIGNvbnRlbnQpO1xuICAgIH0pO1xuICB9O1xufVxuIl19
