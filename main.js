// PrimeGrain - site behaviour
(function () {
  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Highlight the nav link for the section in view
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  if ('IntersectionObserver' in window) {
    var sections = navAnchors.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navAnchors.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });

    // Gentle reveal on scroll
    var revealEls = document.querySelectorAll('.product, .coming, .why-list li, .section-head, .seg, .card, .step, .features li, .band-copy, .band-photo, .cta-inner');
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); rev.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { el.classList.add('reveal'); rev.observe(el); });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Enquiry form - sends to FormSubmit without leaving the page
  var form = document.getElementById('enquiry');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var button = form.querySelector('.btn-submit');

  function setStatus(msg, type) {
    status.textContent = msg;
    status.className = 'form-status' + (type ? ' ' + type : '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = form.querySelectorAll('input[required], select[required]');
    var firstBad = null;
    fields.forEach(function (f) {
      var bad = !f.value.trim() || (f.type === 'tel' && !/^[0-9+\s-]{10,15}$/.test(f.value.trim()));
      f.classList.toggle('invalid', bad);
      if (bad && !firstBad) firstBad = f;
    });
    var email = form.querySelector('input[type="email"]');
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.classList.add('invalid'); firstBad = firstBad || email; }
    if (firstBad) {
      setStatus('Please fill in your name, organisation, a valid phone number and business type.', 'err');
      firstBad.focus();
      return;
    }

    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });
    if (data._honey) return; // bot

    button.disabled = true;
    setStatus('Sending your enquiry…');
    var endpoint = form.getAttribute('action').replace('formsubmit.co/', 'formsubmit.co/ajax/');

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (res.ok && String(res.j.success) === 'true') {
          form.reset();
          setStatus('Thank you! Your enquiry has been sent. We will get back to you shortly.', 'ok');
        } else {
          throw new Error('Send failed');
        }
      })
      .catch(function () {
        setStatus('Sorry, something went wrong. Please call us on 98802 25553.', 'err');
      })
      .finally(function () { button.disabled = false; });
  });

  form.addEventListener('input', function (e) { e.target.classList.remove('invalid'); });
})();
