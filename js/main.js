/* MKB Fitness Academy — site script */
(function () {
  'use strict';

  var WA_NUMBER = '919370813366';
  var SHEET_URL = 'https://script.google.com/macros/s/AKfycbz5o_vIXu9OYUHtALGjkQrBLF1bkva39qHSJb3yy5iNP1xF4KDtBeVliBxIiuancKZ5/exec';

  /* Mobile nav */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Footer year */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Winter season swimming offer — expires on the given date (YYYY-MM-DD, IST).
     Add class="season-note" data-expires="YYYY-MM-DD" to the notice in the HTML;
     once the date passes the offer is marked expired and the struck-through
     "was" prices are hidden automatically. */
  var seasonNotes = document.querySelectorAll('.season-note[data-expires]');
  if (seasonNotes.length) {
    var now = new Date();
    var expired = false;
    Array.prototype.forEach.call(seasonNotes, function (note) {
      // Date-only string parses as UTC midnight; end of that IST day is the cutoff.
      var end = new Date(note.getAttribute('data-expires') + 'T23:59:59+05:30');
      if (now > end) {
        expired = true;
        var badge = note.querySelector('.season-badge');
        var msg = note.querySelector('[data-season-msg]');
        if (badge) badge.textContent = 'Season ended';
        if (msg) msg.textContent = 'Winter season swimming rates have ended. Message us for current pricing.';
      }
    });
    if (expired) document.body.classList.add('offer-expired');
  }

  /* Pricing sub-nav: highlight the section in view */
  var subnav = document.querySelector('.subnav');
  if (subnav && 'IntersectionObserver' in window) {
    var links = subnav.querySelectorAll('a[href^="#"]');
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('active'); });
          var a = map[en.target.id];
          if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* Contact form: log to Google Sheet, then open WhatsApp */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var email = form.querySelector('#email').value.trim();
      var program = form.querySelector('#program').value;
      var message = form.querySelector('#message').value.trim();
      var alertBox = document.getElementById('form-alert');
      var btn = form.querySelector('button[type="submit"]');

      function show(text, isError) {
        alertBox.textContent = text;
        alertBox.className = 'form-alert' + (isError ? ' error' : '');
        alertBox.hidden = false;
      }

      if (!name || !phone) {
        show('Please enter your name and phone number.', true);
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Sending…';

      var data = new FormData();
      data.append('timestamp', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
      data.append('name', name);
      data.append('phone', phone);
      data.append('email', email || 'N/A');
      data.append('program', program);
      data.append('message', message);

      var text = 'Hi MKB Fitness Academy,\nName: ' + name + '\nPhone: ' + phone + '\nInterested in: ' + program;
      if (email) text += '\nEmail: ' + email;
      if (message) text += '\nMessage: ' + message;
      var waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);

      fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body: data })
        .catch(function () {})
        .then(function () {
          show('Sent. Opening WhatsApp…');
          window.open(waUrl, '_blank');
          form.reset();
          btn.disabled = false;
          btn.textContent = 'Send & open WhatsApp';
        });
    });
  }
})();
