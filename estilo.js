document.addEventListener('DOMContentLoaded', function () {
  // Year
  const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  // Menu open/close (mobile) using .open class
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.textContent = isOpen ? '✕' : '☰';
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu on link click (mobile)
    mainNav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a && window.innerWidth <= 900) {
        mainNav.classList.remove('open');
        menuToggle && (menuToggle.textContent = '☰');
        menuToggle && menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Submenu toggles (for mobile accessibility)
  const subToggles = Array.from(document.querySelectorAll('.sub-toggle'));
  subToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.has-sub');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      parent.classList.toggle('open', !expanded);
    });
  });

  // Close menu when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth > 900) return;
    const target = e.target;
    if (!target.closest('.site-header') && mainNav && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      menuToggle && (menuToggle.textContent = '☰');
      menuToggle && menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Simple carousel (supports multiple carousels)
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const slides = Array.from(carousel.querySelectorAll('img'));
    if (slides.length === 0) return;
    
    let idx = 0;
    let interval;

    const showSlide = (n) => {
      slides[idx].classList.remove('active');
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add('active');
    };

    const nextSlide = () => showSlide(idx + 1);
    const prevSlide = () => showSlide(idx - 1);

    const startAuto = () => {
      if (interval) clearInterval(interval);
      interval = setInterval(nextSlide, 4000);
    };

    // Initial setup
    slides.forEach((s, i) => s.classList.toggle('active', i === 0));
    startAuto();

    // Navigation buttons
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', (e) => { e.preventDefault(); prevSlide(); startAuto(); });
      nextBtn.addEventListener('click', (e) => { e.preventDefault(); nextSlide(); startAuto(); });
    }
  });

  // Lightbox (gallery placeholder)
  const gallery = document.getElementById('gallery');
  const promoGallery = document.querySelector('.promo-gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lbClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg) {
    const openLightbox = (e) => {
      const target = e.target.closest('img');
      if (!target) return;
      const full = target.dataset.full || target.src;
      lightboxImg.src = full;
      lightbox.setAttribute('aria-hidden', 'false');
    };

    if (gallery) gallery.addEventListener('click', openLightbox);
    if (promoGallery) promoGallery.addEventListener('click', openLightbox);

    lbClose && lbClose.addEventListener('click', () => { lightboxImg.src = ''; lightbox.setAttribute('aria-hidden', 'true'); });
    lightbox.addEventListener('click', e => { if (e.target === lightbox) { lightboxImg.src = ''; lightbox.setAttribute('aria-hidden', 'true'); } });
  }

  // Handle Form Submissions (Email + WhatsApp)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // 1. Send to Email (FormSubmit) in background
    fetch(form.action, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Opaque response, assumes success to not block UX
    }).catch(err => console.error('Email error:', err));

    // 2. Construct WhatsApp Message
    let msg = '';
    const phone = '5511988322130';
    
    if (form.id === 'contactForm') {
      msg = `*Novo Contato pelo Site*\n\nNome: ${data.nome}\nTelefone: ${data.telefone}\nMensagem: ${data.mensagem}`;
    } else {
      // Waitlist or other forms
      const subject = data._subject || 'Novo Cadastro';
      msg = `*${subject}*\n\n`;
      for (const [key, value] of Object.entries(data)) {
        if (key.startsWith('_')) continue; // skip hidden config fields
        msg += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
      }
    }

    // 3. Redirect to WhatsApp
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    form.reset();
    window.location.href = 'obrigado.html';
  };

  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);

  const waitlistForm = document.querySelector('#waitlistModal form');
  if (waitlistForm) waitlistForm.addEventListener('submit', handleFormSubmit);

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Set sticky top CSS var for product filters based on header height
  const header = document.querySelector('.site-header');
  if (header) {
    const headerHeight = header.offsetHeight || 80;
    document.documentElement.style.setProperty('--sticky-top', (headerHeight + 12) + 'px');
  }

  // Scroll Fade-in Animation
  const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in-section').forEach(section => {
    fadeObserver.observe(section);
  });

  // Auto-open WhatsApp Modal after 5 seconds
  const waModal = document.getElementById('whatsappModal');
  const closeWa = document.getElementById('closeWaModal');

  if (waModal) {
    setTimeout(() => {
      // Check if user has already closed it in this session
      if (!sessionStorage.getItem('waModalClosed')) {
        waModal.classList.add('open');
        waModal.setAttribute('aria-hidden', 'false');

        // Play subtle sound (AudioContext)
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime); // Frequência (A5)
            gain.gain.setValueAtTime(0.05, ctx.currentTime); // Volume baixo
            gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5); // Fade out
            osc.start();
            osc.stop(ctx.currentTime + 0.5);
          }
        } catch (e) { /* Ignora bloqueios de autoplay se não houver interação */ }
      }
    }, 5000);

    const closeWaModal = () => {
      waModal.classList.remove('open');
      waModal.setAttribute('aria-hidden', 'true');
      sessionStorage.setItem('waModalClosed', 'true');
    };

    if (closeWa) closeWa.addEventListener('click', closeWaModal);
    waModal.addEventListener('click', (e) => { if (e.target === waModal) closeWaModal(); });
  }

  // Cookie Banner Logic
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookiesBtn = document.getElementById('acceptCookies');

  if (cookieBanner && acceptCookiesBtn) {
    if (!localStorage.getItem('cookieConsent')) {
      setTimeout(() => cookieBanner.classList.add('show'), 1000);
    }
    acceptCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'true');
      cookieBanner.classList.remove('show');
    });
  }

  // Countdown Timer Logic
  const countdownEl = document.getElementById('promoCountdown');
  if (countdownEl) {
    // Define a data alvo (ex: 3 dias a partir de agora para demonstração)
    // Em produção, você pode definir uma data fixa: new Date('2023-12-31T23:59:59')
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 3); 

    function updateTimer() {
      const t = Date.parse(deadline) - Date.parse(new Date());
      if (t <= 0) {
        countdownEl.innerHTML = '<p style="font-weight:bold; color:var(--secondary);">Oferta Encerrada!</p>';
        return;
      }
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((t / 1000 / 60) % 60);
      const seconds = Math.floor((t / 1000) % 60);
      
      ['days', 'hours', 'minutes', 'seconds'].forEach((id, i) => document.getElementById(id).innerText = [days, hours, minutes, seconds][i].toString().padStart(2, '0'));
    }
    setInterval(updateTimer, 1000);
    updateTimer();
  }

  // Confetti Effect on Order Buttons
  const orderBtns = document.querySelectorAll('.btn-shine');
  orderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D6A945', '#062642', '#ffffff'] // Cores da marca (Dourado, Azul, Branco)
        });
      }
    });
  });

  // Blog Modal Logic
  const blogModal = document.getElementById('blogModal');
  const blogLinks = document.querySelectorAll('.blog-link');
  const blogClose = document.getElementById('closeBlogModal');
  const blogImg = document.getElementById('blogModalImg');
  const blogTitle = document.getElementById('blogModalTitle');
  const blogText = document.getElementById('blogModalText');

  if (blogModal && blogLinks.length > 0) {
    blogLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        blogImg.src = link.dataset.img;
        blogTitle.textContent = link.dataset.title;
        blogText.textContent = link.dataset.content;
        blogModal.classList.add('open');
        blogModal.setAttribute('aria-hidden', 'false');
      });
    });
    const closeBlog = () => {
      blogModal.classList.remove('open');
      blogModal.setAttribute('aria-hidden', 'true');
    };
    if (blogClose) blogClose.addEventListener('click', closeBlog);
    blogModal.addEventListener('click', (e) => { if (e.target === blogModal) closeBlog(); });
  }

  // Waitlist Modal Logic
  const waitlistModal = document.getElementById('waitlistModal');
  const openWaitlistBtn = document.getElementById('openWaitlist');
  const closeWaitlistBtn = document.getElementById('closeWaitlistModal');

  if (waitlistModal && openWaitlistBtn) {
    openWaitlistBtn.addEventListener('click', () => {
      waitlistModal.classList.add('open');
      waitlistModal.setAttribute('aria-hidden', 'false');
    });
    const closeWaitlist = () => { waitlistModal.classList.remove('open'); waitlistModal.setAttribute('aria-hidden', 'true'); };
    if (closeWaitlistBtn) closeWaitlistBtn.addEventListener('click', closeWaitlist);
    waitlistModal.addEventListener('click', (e) => { if (e.target === waitlistModal) closeWaitlist(); });
  }
});
