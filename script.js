// ---- Year ----
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---- Sticky header on scroll ----
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ---- Mobile menu toggle ----
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'block';
    mobileMenu.style.display = isOpen ? 'none' : 'block';
    menuToggle.classList.toggle('open', !isOpen);
  });
  document.querySelectorAll('#mobileMenu a').forEach(a => {
    a.addEventListener('click', () => { mobileMenu.style.display = 'none'; });
  });

  // ---- Theme toggle ----
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const currentTheme = localStorage.getItem('site-theme') || 'dark';
  const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('site-theme', theme);
  };
  setTheme(currentTheme);
  themeToggle.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach(s => navObserver.observe(s));

  // ---- Reveal on scroll ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ---- Contact form (static demo submit) ----
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.classList.add('show');
    form.querySelector('.form-submit').style.display = 'none';
    setTimeout(() => { form.reset(); }, 300);
  });

  // ---- Training modal popup ----
  const trainingModal = document.getElementById('trainingModal');
  const trainingModalClose = document.getElementById('trainingModalClose');
  const trainingModalIframe = document.getElementById('trainingModalIframe');
  document.querySelectorAll('.training-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const pdfUrl = trigger.getAttribute('href');
      trainingModalIframe.src = pdfUrl;
      trainingModal.classList.add('open');
      trainingModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
  const closeTrainingModal = () => {
    trainingModal.classList.remove('open');
    trainingModal.setAttribute('aria-hidden', 'true');
    trainingModalIframe.src = '';
    document.body.style.overflow = '';
  };
  trainingModalClose.addEventListener('click', closeTrainingModal);
  trainingModal.querySelector('.training-modal-backdrop').addEventListener('click', closeTrainingModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && trainingModal.classList.contains('open')) {
      closeTrainingModal();
    }
  });