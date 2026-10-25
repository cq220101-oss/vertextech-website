document.addEventListener('DOMContentLoaded', function () {
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  var menuBtn = document.querySelector('.menu-btn');
  var links = document.querySelector('nav.main-links');
  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      var open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.cssText += 'flex-direction:column; position:absolute; top:70px; right:20px; background:#fff; padding:18px; border:1px solid #E7EAEE; border-radius:6px; gap:14px; z-index:10;';
    });
  }

  var form = document.querySelector('form.contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    var btn = form.querySelector('button[type="submit"]');
    var portal = (form.getAttribute('data-portal') || '').replace(/\/$/, '');
    var MAIL_ONLY = 'https://formsubmit.co/ajax/99676744cc66e7bae40a14c0b2cf1fff';
    var MAX_FILES = 10, MAX_FILE = 10 * 1024 * 1024, MAX_TOTAL = 20 * 1024 * 1024;

    // The order system sleeps when idle; wake it while the visitor is still typing.
    if (portal) { fetch(portal + '/public/ping', { mode: 'cors' }).catch(function () {}); }

    var params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) {
      if (params.get(k)) {
        var h = document.createElement('input');
        h.type = 'hidden'; h.name = k; h.value = params.get(k).slice(0, 120);
        form.appendChild(h);
      }
    });

    function show(color, html) { status.style.color = color; status.innerHTML = html; }
    function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

    function checkFiles(files) {
      if (files.length > MAX_FILES) return 'Please attach at most 10 files.';
      var total = 0;
      for (var i = 0; i < files.length; i++) {
        if (files[i].size > MAX_FILE) return esc(files[i].name) + ' is larger than 10 MB.';
        total += files[i].size;
      }
      return total > MAX_TOTAL ? 'Files add up to more than 20 MB. Please send the rest by email.' : '';
    }

    // Email copy of the inquiry (no files): keeps the sales mailbox alert, and is the fallback if the system is down.
    function mailCopy(data, note) {
      var body = {};
      Object.keys(data).forEach(function (k) { body[k] = data[k]; });
      body._subject = 'New inquiry from vertextech-industrial.com';
      body._template = 'table';
      body.system = note;
      return fetch(MAIL_ONLY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(body)
      }).then(function (r) { return r.json().then(function (j) { if (!r.ok || j.success === 'false' || j.success === false) throw new Error('mail'); }); });
    }

    function toPortal(fd) {
      var ctrl = window.AbortController ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 90000) : null;  // a cold start can take ~1 minute
      return fetch(portal + '/public/inquiry', { method: 'POST', body: fd, signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { return r.json().then(function (j) { j.status = r.status; return j; }); })
        .then(function (j) { if (timer) clearTimeout(timer); return j; },
              function (e) { if (timer) clearTimeout(timer); throw e; });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form._honey && form._honey.value) return;
      var fileInput = form.querySelector('input[type="file"]');
      var files = fileInput ? fileInput.files : [];
      var problem = checkFiles(files);
      var nFiles = files.length;  // the FileList empties when the form is reset
      if (problem) { show('#b42318', problem); return; }

      var fd = new FormData(form);
      fd.append('page', window.location.href.slice(0, 300));
      var data = {};
      fd.forEach(function (v, k) { if (typeof v === 'string' && k.charAt(0) !== '_') data[k] = v; });

      btn.disabled = true;
      btn.textContent = nFiles ? 'Uploading...' : 'Sending...';
      show('', '');
      var slow = setTimeout(function () { show('', 'Still sending, this can take up to a minute...'); }, 8000);

      var sent = portal ? toPortal(fd) : Promise.reject(new Error('no portal'));
      sent.then(function (j) {
        if (!j.ok) {
          if (j.status === 400 || j.status === 413 || j.status === 415) {
            var err = new Error(j.error || 'Please check the form.'); err.user = true; throw err;
          }
          throw new Error(j.error || 'portal');
        }
        mailCopy(data, 'Saved in the order system as ' + j.ref + (nFiles ? ' with ' + nFiles + ' file(s)' : '')).catch(function () {});
        form.reset();
        show('#1a7f37', 'Thank you! We received your request' + (nFiles ? ' and ' + nFiles + ' file(s)' : '') +
          '. Your reference is <strong>' + esc(j.ref) + '</strong>. We will get back to you within one business day.');
      }).catch(function (err) {
        if (err && err.user) { show('#b42318', esc(err.message)); return; }
        // The order system could not be reached: still deliver the message by email.
        return mailCopy(data, 'NOT saved in the order system (' + (err && err.message || 'error') + ')' +
                        (nFiles ? '; ' + nFiles + ' file(s) were not uploaded' : ''))
          .then(function () {
            form.reset();
            show('#1a7f37', 'Thank you! Your message has been sent. ' +
              (nFiles ? 'Our upload service is busy, so please email your drawings to <a href="mailto:sales1@vertextech-industrial.com">sales1@vertextech-industrial.com</a>. ' : '') +
              'We will get back to you within one business day.');
          }, function () {
            show('#b42318', 'Sorry, the message could not be sent. Please email us directly at <a href="mailto:sales1@vertextech-industrial.com">sales1@vertextech-industrial.com</a>.');
          });
      }).then(function () {
        clearTimeout(slow);
        btn.disabled = false;
        btn.textContent = 'Send Message';
      });
    });
  }
});
