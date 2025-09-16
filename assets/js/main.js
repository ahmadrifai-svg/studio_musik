(() => {
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const siteHeader = document.querySelector('.site-header');
  const bookingButtons = document.querySelectorAll('[data-open-booking]');
  const bookingModal = document.querySelector('[data-booking-modal]');
  const bookingForm = document.querySelector('[data-booking-form]');
  const bookingStudio = document.querySelector('#studio');
  const bookingNote = document.querySelector('[data-booking-note]');
  const yearEl = document.querySelector('[data-year]');
  const contactForm = document.querySelector('[data-contact-form]');
  const contactNote = document.querySelector('[data-form-note]');

  // Set year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky header style
  const onScroll = () => {
    const scrolled = window.scrollY > 6;
    if (scrolled) siteHeader.classList.add('scrolled');
    else siteHeader.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav
  if (navToggle && header) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      header.classList.toggle('nav-open');
    });

    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        header.classList.remove('nav-open');
      }
    });
  }

  // Smooth close menu on link click
  document.querySelectorAll('.site-nav a').forEach((a) => {
    a.addEventListener('click', () => {
      if (header) header.classList.remove('nav-open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Booking modal open
  bookingButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-studio');
      if (target && bookingStudio) bookingStudio.value = target;
      if (typeof bookingModal.showModal === 'function') bookingModal.showModal();
      else bookingModal.setAttribute('open', 'true');
    });
  });

  // Booking form submit (demo only)
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = new FormData(bookingForm);
      const name = form.get('fullname');
      const studio = form.get('studio');
      if (bookingNote) {
        bookingNote.hidden = false;
        bookingNote.textContent = `Terima kasih, ${name}. Permintaan booking untuk ${studio} sudah kami terima!`;
      }
      setTimeout(() => {
        if (typeof bookingModal.close === 'function') bookingModal.close();
        bookingNote.hidden = true;
      }, 1600);
    });
  }

  // Contact form submit (demo only)
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = new FormData(contactForm);
      const name = form.get('name');
      if (contactNote) {
        contactNote.hidden = false;
        contactNote.textContent = `Hai ${name}, pesanmu sudah terkirim. Kami akan balas secepatnya!`;
        setTimeout(() => (contactNote.hidden = true), 2000);
      }
      contactForm.reset();
    });
  }
})();

