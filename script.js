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
    var TYPES = /\.(pdf|step|stp|igs|iges|x_t|sldprt|dwg|dxf|xlsx|xlsm|xls|csv|png|jpe?g|zip|7z|rar|docx)$/i;

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
    function kb(n) { return n < 1024 * 1024 ? Math.max(1, Math.round(n / 1024)) + ' KB' : (n / 1048576).toFixed(1) + ' MB'; }
    function newToken() {
      var a = new Uint8Array(16); (window.crypto || window.msCrypto).getRandomValues(a);
      return Array.prototype.map.call(a, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    }

    // ---------- drawings: each file uploads as soon as it is picked or dropped ----------
    var drop = form.querySelector('.dropzone');
    var picker = form.querySelector('input[type="file"]');
    var list = form.querySelector('.file-list');
    var uploadToken = newToken();
    var items = [];  // {file, row, state: uploading|done|failed, id, promise, xhr}

    function setRow(it, state, text, pct) {
      it.state = state;
      it.row.className = 'file-row' + (state === 'done' ? ' done' : state === 'failed' ? ' failed' : '');
      it.row.querySelector('.file-meta').textContent = text;
      if (pct != null) it.row.querySelector('.file-bar span').style.width = pct + '%';
    }

    function upload(it) {
      it.promise = new Promise(function (resolve) {
        if (!portal) { setRow(it, 'failed', 'Upload unavailable, please email this file', 100); return resolve(); }
        var fd = new FormData();
        fd.append('token', uploadToken);
        fd.append('file', it.file, it.file.name);
        var xhr = new XMLHttpRequest();
        it.xhr = xhr;
        xhr.open('POST', portal + '/public/upload');
        xhr.timeout = 180000;  // a sleeping server can take about a minute to answer
        xhr.upload.onprogress = function (e) {
          if (!e.lengthComputable) return;
          var pct = Math.round(e.loaded / e.total * 100);
          setRow(it, 'uploading', pct < 100 ? 'Uploading ' + pct + '%' : 'Processing...', Math.min(pct, 98));
        };
        xhr.onload = function () {
          var j = {};
          try { j = JSON.parse(xhr.responseText); } catch (err) {}
          if (xhr.status === 200 && j.ok) { it.id = j.id; setRow(it, 'done', kb(it.file.size) + ' · Uploaded', 100); }
          else setRow(it, 'failed', j.error || 'Upload failed, please email this file', 100);
          resolve();
        };
        xhr.onerror = xhr.ontimeout = function () { setRow(it, 'failed', 'Upload failed, please email this file', 100); resolve(); };
        xhr.onabort = function () { resolve(); };
        xhr.send(fd);
      });
    }

    function remove(it) {
      if (it.state === 'uploading' && it.xhr) it.xhr.abort();
      if (it.id && portal) {
        var fd = new FormData(); fd.append('token', uploadToken);
        fetch(portal + '/public/upload/' + it.id + '/remove', { method: 'POST', body: fd }).catch(function () {});
      }
      items.splice(items.indexOf(it), 1);
      it.row.parentNode.removeChild(it.row);
    }

    function addFiles(fileList) {
      var problems = [];
      Array.prototype.forEach.call(fileList, function (file) {
        var kept = items.filter(function (x) { return x.state !== 'failed'; });
        var total = kept.reduce(function (n, x) { return n + x.file.size; }, 0);
        if (kept.some(function (x) { return x.file.name === file.name && x.file.size === file.size; })) return;
        if (!TYPES.test(file.name)) { problems.push(esc(file.name) + ': this file type is not accepted.'); return; }
        if (file.size > MAX_FILE) { problems.push(esc(file.name) + ' is larger than 10 MB. Please email it to us.'); return; }
        if (kept.length >= MAX_FILES) { problems.push('Up to 10 files per request. Please email the rest.'); return; }
        if (total + file.size > MAX_TOTAL) { problems.push(esc(file.name) + ' would bring the total above 20 MB. Please email it to us.'); return; }
        var row = document.createElement('li');
        row.innerHTML = '<span class="file-name"></span><span class="file-meta"></span>' +
          '<button type="button" class="file-remove" aria-label="Remove">×</button><div class="file-bar"><span></span></div>';
        row.querySelector('.file-name').textContent = file.name;
        row.querySelector('.file-name').title = file.name;
        list.appendChild(row);
        var it = { file: file, row: row };
        items.push(it);
        row.querySelector('.file-remove').addEventListener('click', function () { remove(it); });
        setRow(it, 'uploading', kb(file.size) + ' · Waiting...', 0);
        upload(it);
      });
      show(problems.length ? '#b42318' : '', problems.join('<br>'));
    }

    if (drop && picker && list) {
      drop.addEventListener('click', function (e) { if (e.target !== picker) picker.click(); });
      drop.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); picker.click(); } });
      picker.addEventListener('change', function () { addFiles(picker.files); picker.value = ''; });
      ['dragenter', 'dragover'].forEach(function (ev) {
        drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); });
      });
      ['dragleave', 'drop'].forEach(function (ev) {
        drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('over'); });
      });
      drop.addEventListener('drop', function (e) { if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files); });
      // a file dropped next to the box should not open in the browser and lose the form
      window.addEventListener('dragover', function (e) { e.preventDefault(); });
      window.addEventListener('drop', function (e) { e.preventDefault(); });
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
      var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 90000) : null;
      return fetch(portal + '/public/inquiry', { method: 'POST', body: fd, signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { return r.json().then(function (j) { j.status = r.status; return j; }); })
        .then(function (j) { if (timer) clearTimeout(timer); return j; },
              function (e) { if (timer) clearTimeout(timer); throw e; });
    }

    // Google Ads: count a submitted quote request as a conversion.
    function trackConversion() {
      try {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', { send_to: 'AW-18541039791/BpQOCN3NhqwdEK-hh4lF', value: 1.0, currency: 'USD' });
        }
      } catch (e) {}
    }

    function resetAll() {
      form.reset();
      items.slice().forEach(function (it) { it.row.parentNode.removeChild(it.row); });
      items = [];
      uploadToken = newToken();
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form._honey && form._honey.value) return;
      btn.disabled = true;
      var waiting = items.filter(function (x) { return x.state === 'uploading'; });
      btn.textContent = waiting.length ? 'Finishing uploads...' : 'Sending...';
      show('', '');

      Promise.all(items.map(function (x) { return x.promise; })).then(function () {
        btn.textContent = 'Sending...';
        var done = items.filter(function (x) { return x.state === 'done'; });
        var failed = items.filter(function (x) { return x.state === 'failed'; });
        var fd = new FormData(form);
        // The order system stores a fixed set of fields, so the extra RFQ fields
        // (material, finish, terms, country, NDA) travel at the top of the message.
        var extras = [];
        Array.prototype.forEach.call(form.querySelectorAll('[data-label]'), function (el) {
          var v = (el.type === 'checkbox' ? (el.checked ? el.value : '') : el.value || '').trim();
          if (v) extras.push(el.getAttribute('data-label') + ': ' + v);
          if (el.name) fd.delete(el.name);
        });
        if (extras.length) {
          var note = (fd.get('message') || '').trim();
          fd.set('message', extras.join('\n') + (note ? '\n\n' + note : ''));
        }
        fd.append('page', window.location.href.slice(0, 300));
        fd.append('upload_token', uploadToken);
        fd.append('file_ids', done.map(function (x) { return x.id; }).join(','));
        var data = {};
        fd.forEach(function (v, k) { if (typeof v === 'string' && k.charAt(0) !== '_' && k !== 'upload_token' && k !== 'file_ids') data[k] = v; });
        var names = function (xs) { return xs.map(function (x) { return x.file.name; }).join(', '); };
        var slow = setTimeout(function () { show('', 'Still sending, this can take up to a minute...'); }, 8000);
        var askEmail = failed.length ? ' Some files could not be uploaded (' + esc(names(failed)) +
          '); please email them to <a href="mailto:sales1@vertextech-industrial.com">sales1@vertextech-industrial.com</a>.' : '';

        var sent = portal ? toPortal(fd) : Promise.reject(new Error('no portal'));
        return sent.then(function (j) {
          if (!j.ok) {
            if (j.status === 400 || j.status === 413 || j.status === 415) {
              var err = new Error(j.error || 'Please check the form.'); err.user = true; throw err;
            }
            throw new Error(j.error || 'portal');
          }
          mailCopy(data, 'Saved in the order system as ' + j.ref + (done.length ? ' with files: ' + names(done) : '') +
                   (failed.length ? '; NOT uploaded: ' + names(failed) : '')).catch(function () {});
          resetAll();
          trackConversion();
          show('#1a7f37', 'Thank you! We received your request' + (done.length ? ' and ' + done.length + ' file(s)' : '') +
            '. Your reference is <strong>' + esc(j.ref) + '</strong>. We will get back to you within one business day.' + askEmail);
        }).catch(function (err) {
          if (err && err.user) { show('#b42318', esc(err.message)); return; }
          // The order system could not be reached: still deliver the message by email.
          var all = items.map(function (x) { return x.file.name; });
          return mailCopy(data, 'NOT saved in the order system (' + (err && err.message || 'error') + ')' +
                          (all.length ? '; files chosen: ' + all.join(', ') : ''))
            .then(function () {
              resetAll();
              trackConversion();
              show('#1a7f37', 'Thank you! Your message has been sent. ' +
                (all.length ? 'Our upload service is busy, so please email your drawings to <a href="mailto:sales1@vertextech-industrial.com">sales1@vertextech-industrial.com</a>. ' : '') +
                'We will get back to you within one business day.');
            }, function () {
              show('#b42318', 'Sorry, the message could not be sent. Please email us directly at <a href="mailto:sales1@vertextech-industrial.com">sales1@vertextech-industrial.com</a>.');
            });
        }).then(function () { clearTimeout(slow); });
      }).then(function () {
        btn.disabled = false;
        btn.textContent = 'Send Request';
      });
    });
  }
});
