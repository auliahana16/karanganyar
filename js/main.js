/* ============================================
   LARAS — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ===== LOADER =====
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('done'), 800);
  }

  // ===== PROGRESS BAR + NAV SCROLL EFFECT (rAF-throttled) =====
  const progressFill = document.getElementById('progressFill');
  const nav = document.getElementById('nav');
  let ticking = false;
  function onScrollFrame() {
    const scrollTop = window.scrollY;
    if (progressFill) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressFill.style.width = progress + '%';
    }
    if (nav) {
      nav.classList.toggle('scrolled', scrollTop > 50);
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScrollFrame);
      ticking = true;
    }
  }, { passive: true });

  // ===== MOBILE MENU =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav__links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      navToggle.classList.toggle('active', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('nav-open');
      });
    });
  }

  // ===== HERO REVEAL ANIMATIONS =====
  const heroReveals = document.querySelectorAll('[data-reveal]');
  heroReveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + (i * 150));
  });

  // ===== SCROLL REVEAL (IntersectionObserver) =====
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // ===== STORIES AUTO INFINITE SCROLL + MANUAL PREV/NEXT SWIPE =====
  const storiesTrack = document.getElementById('storiesTrack');
  if (storiesTrack) {
    const wrap = storiesTrack.closest('.stories__track-wrap');
    const prevBtn = document.getElementById('storiesPrev');
    const nextBtn = document.getElementById('storiesNext');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let pos = 0;            // current translateX in px (negative = moved left)
    let loopWidth = 0;      // width of one full (unique) set of cards
    let paused = false;
    let resumeTimer = null;
    const SPEED = 40;       // px per second for the auto-scroll

    function computeLoopWidth() {
      loopWidth = storiesTrack.scrollWidth / 2;
    }
    function getStep() {
      const card = storiesTrack.querySelector('.story');
      if (!card) return 320;
      const gap = parseFloat(getComputedStyle(storiesTrack).gap) || 0;
      return card.getBoundingClientRect().width + gap;
    }
    function setPos(next) {
      pos = next;
      if (loopWidth > 0) {
        if (pos <= -loopWidth) pos += loopWidth;
        if (pos > 0) pos -= loopWidth;
      }
      storiesTrack.style.transform = `translateX(${pos}px)`;
    }
    function pauseTemporarily() {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, 3000);
    }
    function goTo(direction) {
      computeLoopWidth();
      setPos(pos - direction * getStep());
      pauseTemporarily();
    }

    computeLoopWidth();
    storiesTrack.style.animation = 'none'; // JS now drives the movement
    window.addEventListener('resize', computeLoopWidth);

    // ===== WAVE ARC: vertical position follows a cosine curve based on each =====
    // ===== card's horizontal position — center of the row sits highest,   =====
    // ===== the further left/right a card drifts, the lower it settles.    =====
    const storyCards = Array.from(storiesTrack.querySelectorAll('.story'));
    const hovered = new Set();
    storyCards.forEach(card => {
      card.addEventListener('mouseenter', () => hovered.add(card));
      card.addEventListener('mouseleave', () => hovered.delete(card));
    });

    function getAmplitude() {
      return window.innerWidth <= 640 ? 24 : 46;
    }

    function updateWave() {
      const wrapRect = wrap.getBoundingClientRect();
      if (wrapRect.width === 0) return;
      const centerX = wrapRect.left + wrapRect.width / 2;
      const halfWidth = wrapRect.width / 2;
      const amplitude = getAmplitude();
      storyCards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        // Normalize distance from center to the range [-1, 1], clamped at the edges
        let n = (cardCenterX - centerX) / halfWidth;
        if (n < -1) n = -1;
        if (n > 1) n = 1;
        // Cosine arc: n = 0 (center) -> -amplitude (highest point, moved up)
        // n = ±1 (edges) -> 0 (baseline, settled down)
        const arcY = -amplitude * Math.cos(n * (Math.PI / 2));
        const hoverLift = hovered.has(card) ? -10 : 0;
        card.style.transform = `translateY(${arcY + hoverLift}px)`;
      });
    }

    let lastTime = null;
    function tick(t) {
      if (lastTime === null) lastTime = t;
      const dt = (t - lastTime) / 1000;
      lastTime = t;
      if (!paused && !reduceMotion) setPos(pos - SPEED * dt);
      updateWave();
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    updateWave();
    window.addEventListener('resize', updateWave);

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(1));

    wrap.addEventListener('mouseenter', () => { paused = true; clearTimeout(resumeTimer); });
    wrap.addEventListener('mouseleave', () => { paused = false; });
    wrap.addEventListener('touchstart', () => { paused = true; clearTimeout(resumeTimer); }, { passive: true });
    wrap.addEventListener('touchend', () => { paused = false; });
  }

  // ===== ACTIVE NAV LINK =====
  const navLinkEls = document.querySelectorAll('.nav__links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinkEls.forEach(a => {
    const hrefPage = a.getAttribute('href').split('#')[0].split('/').pop();
    if (hrefPage === currentPage || (hrefPage === '' && currentPage === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== PARALLAX HERO BACKGROUND =====
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0001})`;
      }
    });
  }

  // ===== HERO CURSOR SPOTLIGHT =====
  const heroSection = document.querySelector('.hero');
  const heroSpotlight = document.getElementById('heroSpotlight');
  if (heroSection && heroSpotlight) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroSpotlight.style.setProperty('--mx', x + '%');
      heroSpotlight.style.setProperty('--my', y + '%');
    });
  }

  // ===== MAGNETIC TILT CARDS =====
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${py * -6}deg) rotateY(${px * 8}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== BUTTON RIPPLE =====
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'btn__ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
});
