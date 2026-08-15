(function () {
  function buildModal() {
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML =
      '<div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-heading">' +
        '<button type="button" class="modal-close" aria-label="Close">' +
          '<i class="ti ti-x" aria-hidden="true"></i>' +
        '</button>' +
        '<h3 id="modal-heading" class="modal-heading">Book a consultation</h3>' +
        '<form class="modal-form">' +
          '<label>Name<input type="text" name="name" required></label>' +
          '<label>Email<input type="email" name="email" required></label>' +
          '<label>Phone<input type="tel" name="phone"></label>' +
          '<label>Comment<textarea name="comment" rows="4"></textarea></label>' +
          '<button type="submit" class="btn btn-primary modal-submit">Send</button>' +
        '</form>' +
        '<div class="modal-success" hidden>' +
          '<i class="ti ti-circle-check" aria-hidden="true"></i>' +
          '<p>Thank you - I\'ll be in touch shortly.</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    return overlay;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var overlay = buildModal();
    var heading = overlay.querySelector('.modal-heading');
    var form = overlay.querySelector('.modal-form');
    var success = overlay.querySelector('.modal-success');
    var closeBtn = overlay.querySelector('.modal-close');

    function openModal(headingText) {
      heading.textContent = headingText || 'Book a consultation';
      form.hidden = false;
      success.hidden = true;
      form.reset();
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      var firstInput = form.querySelector('input');
      if (firstInput) firstInput.focus();
    }

    function closeModal() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-open-consultation]');
      if (trigger) {
        e.preventDefault();
        openModal(trigger.getAttribute('data-heading'));
      }
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.hidden = true;
      success.hidden = false;
    });
  });
})();

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    var icon = toggle.querySelector('i');

    function setOpen(open) {
      links.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (icon) icon.className = open ? 'ti ti-x' : 'ti ti-menu-2';
    }

    toggle.addEventListener('click', function () {
      setOpen(!links.classList.contains('is-open'));
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setOpen(false);
    });
  });
})();
