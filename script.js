// Google Ads: a click on any WhatsApp link counts as a "Contact" conversion.
// WA_SEND_TO is the "send_to" value of the WhatsApp conversion action (Google Ads → Goals → Conversions).
var WA_SEND_TO = 'AW-18541039791/EQ8YCProqK0dEK-hh4lF';
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href*="wa.me/"], a[href*="api.whatsapp.com"], a[href^="whatsapp:"]');
  if (!a || typeof window.gtag !== 'function') return;
  try {
    var page = location.pathname.replace(/^\/|\.html$/g, '') || 'index';
    if (WA_SEND_TO) window.gtag('event', 'conversion', { send_to: WA_SEND_TO, value: 1.0, currency: 'USD', transport_type: 'beacon' });
    window.gtag('event', 'whatsapp_click', { page: page, transport_type: 'beacon' });
  } catch (err) {}
}, true);

// ---------- UI text in the page language (internal notes to the order system stay English) ----------
var I18N = {
  en: {
    uploadUnavailable: 'Upload unavailable, please email this file', uploading: 'Uploading ', processing: 'Processing...',
    uploaded: 'Uploaded', uploadFailed: 'Upload failed, please email this file', badType: ': this file type is not accepted.',
    tooBig: ' is larger than 10 MB. Please email it to us.', tooMany: 'Up to 10 files per request. Please email the rest.',
    totalTooBig: ' would bring the total above 20 MB. Please email it to us.', waitingFile: 'Waiting...', remove: 'Remove',
    finishing: 'Finishing uploads...', sending: 'Sending...', slow: 'Still sending, this can take up to a minute...',
    someFailed: ' Some files could not be uploaded (', emailThem: '); please email them to ', checkForm: 'Please check the form.',
    thanks: 'Thank you! We received your request', andFiles: ' and {n} file(s)', yourRef: '. Your reference is ',
    reply: ' We will get back to you within one business day.', thanksMsg: 'Thank you! Your message has been sent. ',
    busy: 'Our upload service is busy, so please email your drawings to ', sorry: 'Sorry, the message could not be sent. Please email us directly at '
  },
  es: {
    uploadUnavailable: 'Carga no disponible, envíe este archivo por correo', uploading: 'Cargando ', processing: 'Procesando...',
    uploaded: 'Cargado', uploadFailed: 'Error al cargar, envíe este archivo por correo', badType: ': este tipo de archivo no se acepta.',
    tooBig: ' pesa más de 10 MB. Envíelo por correo.', tooMany: 'Máximo 10 archivos por solicitud. Envíe el resto por correo.',
    totalTooBig: ' haría que el total supere 20 MB. Envíelo por correo.', waitingFile: 'En espera...', remove: 'Quitar',
    finishing: 'Terminando cargas...', sending: 'Enviando...', slow: 'Seguimos enviando, puede tardar hasta un minuto...',
    someFailed: ' Algunos archivos no se pudieron cargar (', emailThem: '); envíelos por correo a ', checkForm: 'Revise el formulario.',
    thanks: '¡Gracias! Recibimos su solicitud', andFiles: ' y {n} archivo(s)', yourRef: '. Su número de referencia es ',
    reply: ' Le responderemos en un día hábil.', thanksMsg: '¡Gracias! Su mensaje fue enviado. ',
    busy: 'Nuestro servicio de carga está saturado; envíe sus planos por correo a ', sorry: 'No se pudo enviar el mensaje. Escríbanos directamente a '
  },
  de: {
    uploadUnavailable: 'Upload nicht verfügbar, bitte senden Sie diese Datei per E-Mail', uploading: 'Wird hochgeladen ', processing: 'Wird verarbeitet...',
    uploaded: 'Hochgeladen', uploadFailed: 'Upload fehlgeschlagen, bitte per E-Mail senden', badType: ': dieser Dateityp wird nicht akzeptiert.',
    tooBig: ' ist größer als 10 MB. Bitte per E-Mail senden.', tooMany: 'Maximal 10 Dateien pro Anfrage. Bitte senden Sie den Rest per E-Mail.',
    totalTooBig: ' würde die Gesamtgröße von 20 MB überschreiten. Bitte per E-Mail senden.', waitingFile: 'Wartet...', remove: 'Entfernen',
    finishing: 'Uploads werden abgeschlossen...', sending: 'Wird gesendet...', slow: 'Wird noch gesendet, das kann bis zu einer Minute dauern...',
    someFailed: ' Einige Dateien konnten nicht hochgeladen werden (', emailThem: '); bitte senden Sie sie per E-Mail an ', checkForm: 'Bitte prüfen Sie das Formular.',
    thanks: 'Vielen Dank! Wir haben Ihre Anfrage erhalten', andFiles: ' sowie {n} Datei(en)', yourRef: '. Ihre Referenznummer lautet ',
    reply: ' Wir melden uns innerhalb eines Werktages.', thanksMsg: 'Vielen Dank! Ihre Nachricht wurde gesendet. ',
    busy: 'Unser Upload-Dienst ist ausgelastet, bitte senden Sie Ihre Zeichnungen per E-Mail an ', sorry: 'Die Nachricht konnte leider nicht gesendet werden. Bitte schreiben Sie uns direkt an '
  },
  fr: {
    uploadUnavailable: 'Envoi indisponible, merci d’envoyer ce fichier par e-mail', uploading: 'Envoi ', processing: 'Traitement...',
    uploaded: 'Envoyé', uploadFailed: 'Échec de l’envoi, merci d’envoyer ce fichier par e-mail', badType: ' : ce type de fichier n’est pas accepté.',
    tooBig: ' dépasse 10 Mo. Merci de nous l’envoyer par e-mail.', tooMany: '10 fichiers maximum par demande. Merci d’envoyer les autres par e-mail.',
    totalTooBig: ' ferait dépasser le total de 20 Mo. Merci de nous l’envoyer par e-mail.', waitingFile: 'En attente...', remove: 'Retirer',
    finishing: 'Finalisation des envois...', sending: 'Envoi en cours...', slow: 'Envoi toujours en cours, cela peut prendre jusqu’à une minute...',
    someFailed: ' Certains fichiers n’ont pas pu être envoyés (', emailThem: ') ; merci de les envoyer par e-mail à ', checkForm: 'Merci de vérifier le formulaire.',
    thanks: 'Merci ! Nous avons bien reçu votre demande', andFiles: ' et {n} fichier(s)', yourRef: '. Votre référence est ',
    reply: ' Nous vous répondrons sous un jour ouvré.', thanksMsg: 'Merci ! Votre message a été envoyé. ',
    busy: 'Notre service d’envoi est saturé, merci d’envoyer vos plans par e-mail à ', sorry: 'Désolé, le message n’a pas pu être envoyé. Écrivez-nous directement à '
  }
};
var LANG = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
function T(k) { var d = I18N[LANG] || I18N.en; return d[k] != null ? d[k] : I18N.en[k]; }

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
    var btnLabel = btn ? btn.textContent : '';
    var portal = (form.getAttribute('data-portal') || '').replace(/\/$/, '');
    var MAIL_ONLY = 'https://formsubmit.co/ajax/99676744cc66e7bae40a14c0b2cf1fff';
    var MAX_FILES = 10, MAX_FILE = 10 * 1024 * 1024, MAX_TOTAL = 20 * 1024 * 1024;
    var openedAt = Date.now(); // a person takes time to fill in the form; the order system drops sends under 3 seconds
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
        if (!portal) { setRow(it, 'failed', T('uploadUnavailable'), 100); return resolve(); }
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
          setRow(it, 'uploading', pct < 100 ? T('uploading') + pct + '%' : T('processing'), Math.min(pct, 98));
        };
        xhr.onload = function () {
          var j = {};
          try { j = JSON.parse(xhr.responseText); } catch (err) {}
          if (xhr.status === 200 && j.ok) { it.id = j.id; setRow(it, 'done', kb(it.file.size) + ' · ' + T('uploaded'), 100); }
          else setRow(it, 'failed', j.error || T('uploadFailed'), 100);
          resolve();
        };
        xhr.onerror = xhr.ontimeout = function () { setRow(it, 'failed', T('uploadFailed'), 100); resolve(); };
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
        if (!TYPES.test(file.name)) { problems.push(esc(file.name) + T('badType')); return; }
        if (file.size > MAX_FILE) { problems.push(esc(file.name) + T('tooBig')); return; }
        if (kept.length >= MAX_FILES) { problems.push(T('tooMany')); return; }
        if (total + file.size > MAX_TOTAL) { problems.push(esc(file.name) + T('totalTooBig')); return; }
        var row = document.createElement('li');
        row.innerHTML = '<span class="file-name"></span><span class="file-meta"></span>' +
          '<button type="button" class="file-remove" aria-label="' + T('remove') + '">×</button><div class="file-bar"><span></span></div>';
        row.querySelector('.file-name').textContent = file.name;
        row.querySelector('.file-name').title = file.name;
        list.appendChild(row);
        var it = { file: file, row: row };
        items.push(it);
        row.querySelector('.file-remove').addEventListener('click', function () { remove(it); });
        setRow(it, 'uploading', kb(file.size) + ' · ' + T('waitingFile'), 0);
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
      body._honey = '';
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
      if ((form._honey && form._honey.value) || (form.website && form.website.value)) return;
      btn.disabled = true;
      var waiting = items.filter(function (x) { return x.state === 'uploading'; });
      btn.textContent = waiting.length ? T('finishing') : T('sending');
      show('', '');

      Promise.all(items.map(function (x) { return x.promise; })).then(function () {
        btn.textContent = T('sending');
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
        fd.append('elapsed_ms', String(Date.now() - openedAt));
        fd.append('upload_token', uploadToken);
        fd.append('file_ids', done.map(function (x) { return x.id; }).join(','));
        var data = {};
        fd.forEach(function (v, k) { if (typeof v === 'string' && k.charAt(0) !== '_' && k !== 'upload_token' && k !== 'file_ids' && k !== 'website' && k !== 'elapsed_ms') data[k] = v; });
        var names = function (xs) { return xs.map(function (x) { return x.file.name; }).join(', '); };
        var slow = setTimeout(function () { show('', T('slow')); }, 8000);
        var askEmail = failed.length ? T('someFailed') + esc(names(failed)) +
          T('emailThem') + '<a href="mailto:sales1@vertextech-industrial.com">sales1@vertextech-industrial.com</a>.' : '';

        var sent = portal ? toPortal(fd) : Promise.reject(new Error('no portal'));
        return sent.then(function (j) {
          if (!j.ok) {
            if (j.status === 400 || j.status === 413 || j.status === 415) {
              var err = new Error(j.error || T('checkForm')); err.user = true; throw err;
            }
            throw new Error(j.error || 'portal');
          }
          mailCopy(data, 'Saved in the order system as ' + j.ref + (done.length ? ' with files: ' + names(done) : '') +
                   (failed.length ? '; NOT uploaded: ' + names(failed) : '')).catch(function () {});
          resetAll();
          trackConversion();
          show('#1a7f37', T('thanks') + (done.length ? T('andFiles').replace('{n}', done.length) : '') +
            T('yourRef') + '<strong>' + esc(j.ref) + '</strong>.' + T('reply') + askEmail);
        }).catch(function (err) {
          if (err && err.user) { show('#b42318', esc(err.message)); return; }
          // The order system could not be reached: still deliver the message by email.
          var all = items.map(function (x) { return x.file.name; });
          return mailCopy(data, 'NOT saved in the order system (' + (err && err.message || 'error') + ')' +
                          (all.length ? '; files chosen: ' + all.join(', ') : ''))
            .then(function () {
              resetAll();
              trackConversion();
              show('#1a7f37', T('thanksMsg') +
                (all.length ? T('busy') + '<a href="mailto:sales1@vertextech-industrial.com">sales1@vertextech-industrial.com</a>. ' : '') +
                T('reply').trim());
            }, function () {
              show('#b42318', T('sorry') + '<a href="mailto:sales1@vertextech-industrial.com">sales1@vertextech-industrial.com</a>.');
            });
        }).then(function () { clearTimeout(slow); });
      }).then(function () {
        btn.disabled = false;
        btn.textContent = btnLabel;
      });
    });
  }
});
