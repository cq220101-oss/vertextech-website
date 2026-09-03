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
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.reset();
      alert('Thanks — your message has been received. We will get back to you shortly.');
    });
  }
});
