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
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      if (data._honey) return;
      btn.disabled = true;
      btn.textContent = 'Sending...';
      status.style.color = '';
      status.textContent = '';
      fetch('https://formsubmit.co/ajax/99676744cc66e7bae40a14c0b2cf1fff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) { return r.json().then(function (j) { if (!r.ok || j.success === 'false' || j.success === false) throw new Error(j.message || 'Send failed'); return j; }); })
        .then(function () {
          form.reset();
          status.style.color = '#1a7f37';
          status.textContent = 'Thank you! Your message has been sent. We will get back to you within one business day.';
        })
        .catch(function () {
          status.style.color = '#b42318';
          status.innerHTML = 'Sorry, the message could not be sent. Please email us directly at <a href="mailto:sales1@vertextech-industrial.com">sales1@vertextech-industrial.com</a>.';
        })
        .then(function () { btn.disabled = false; btn.textContent = 'Send Message'; });
    });
  }
});
