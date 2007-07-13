
function getCurrentDomain(){var m=window.location.href.match(/:\/\/www\.([^\/]+)\//);if(m&&m.length==2)return m[1];return false;}
function optimeAddEmail(){var domain=getCurrentDomain();if(!domain)return;$('.mailto').each(function(){if(!this.getAttribute('href'))return;var m=this.getAttribute('href').match(/#.*to\s(\S+)\s/);if(!m||m.length<2)return;this.setAttribute('href','mailto:'+m[1]+'@'+domain);});}
function optimeOnLoad(){optimeAddEmail();}
$(document).ready(function(){optimeOnLoad();});
