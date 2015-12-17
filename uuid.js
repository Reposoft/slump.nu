
var uuid = require('node-uuid');

var gen = function() {
  return uuid.v4();
}

var render = function() {
  var div = document.querySelector('#uuid');
  div.querySelector('input').setAttribute('value', gen());

  var li = function(str) {
    return '<li class="uuid">' + str + '</li>';
  };

  var more = div.querySelector('#uuid-more');
  var html = '';
  for (var i = 0; i < 10; i++) {
    html += li(gen());
  };
  more.innerHTML = html;
};

render();

// ugly hook to global render, not webpacked
var _slump_run = window.slump_run;
window.slump_run = function() {
  render();
  _slump_run();
};
