(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Hero background video: fade in once playable, skip for reduced-motion users.
  var hv = document.getElementById('hero-video');
  if (hv) {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      hv.removeAttribute('autoplay');
      hv.pause();
    } else {
      var ready = function () { hv.classList.add('is-ready'); };
      hv.addEventListener('canplay', ready, { once: true });
      hv.addEventListener('playing', ready, { once: true });
      var p = hv.play && hv.play();
      if (p && p.catch) p.catch(function () {});
    }
  }

  // Copy BibTeX
  var btn = document.getElementById('copybib');
  var bib = document.getElementById('bibtex');
  if (btn && bib) {
    btn.addEventListener('click', function () {
      var text = bib.textContent;
      var done = function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
      } else {
        fallback(text, done);
      }
    });
  }
  function fallback(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', '');
    ta.style.position = 'absolute'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    done();
  }
})();
