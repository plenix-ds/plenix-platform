/* Plenix · React loader (platform/vendor/react-loader.js): loads React 18.2.0 for a page, the production build by default
   (fast), the development build on request (its warnings about props, keys and effects): add ?react=dev to the address,
   or run localStorage.setItem('plenix.react', 'dev') once (remove it to go back). Load it where the two React scripts were. */
(function () {
  var dev = /[?&]react=dev\b/.test(location.search);
  try { dev = dev || localStorage.getItem('plenix.react') === 'dev'; } catch (e) { /* storage unavailable: production */ }
  var base = document.currentScript.src.replace(/[^/]*$/, ''), build = dev ? 'development' : 'production.min';
  document.write('<script src="' + base + 'react.' + build + '.js"><\/script><script src="' + base + 'react-dom.' + build + '.js"><\/script>');
})();
