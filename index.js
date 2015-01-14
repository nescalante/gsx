var main = require('./src/main.js');

if (typeof window !== 'undefined') {
  window.gsx = main;
}

module.exports = main;
