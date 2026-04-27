/* ===== PARTICLE CANVAS ===== */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function rand(a, b) { return Math.random() * (b - a) + a; }

  function createParticle() {
    return {
      x: rand(0, W), y: rand(0, H),
      vx: rand(-0.3, 0.3), vy: rand(-0.5, -0.1),
      r: rand(1, 2.5),
      alpha: rand(0.1, 0.5),
      color: Math.random() > 0.6 ? '160,80,255' : Math.random() > 0.5 ? '0,245,255' : '200,127,255'
    };
  }

  for (let i = 0; i < 90; i++) particles.push(createParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10 || p.x < -10 || p.x > W + 10) {
        Object.assign(p, createParticle(), { y: H + 10 });
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ===== TYPED EFFECT ===== */
(function initTyped() {
  const phrases = [
    'Developer & CS Student',
    'AI Integration Enthusiast',
    'Software Engineer in Training',
    'C# · Python · Java · SQL',
  ];
  const el = document.getElementById('typed-output');
  let pi = 0, ci = 0, deleting = false, wait = 0;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; wait = 60; }
    } else {
      if (wait-- > 0) { setTimeout(tick, 30); return; }
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? 40 : 80);
  }
  tick();
})();

/* ===== NAV SCROLL ===== */
(function initNav() {
  const nav = document.getElementById('navbar');
  const btn = document.getElementById('hamburger-btn');
  const links = document.getElementById('nav-links-list');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => { links.classList.remove('open'); btn.setAttribute('aria-expanded', false); });
  });
})();

/* ===== SCROLL REVEAL ===== */
(function initReveal() {
  const targets = document.querySelectorAll(
    '.section-header, .about-text, .about-terminal, .skill-category, .timeline-item, .project-card, .education-card, .contact-link, .hero-status, .hero-name, .hero-subtitle, .hero-summary, .hero-cta-group, .hero-stats'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });

  targets.forEach(el => io.observe(el));
})();

/* ===== ACTIVE NAV LINK ===== */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActive() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => {
      l.style.color = l.getAttribute('href') === `#${current}` ? 'var(--violet-hi)' : '';
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
})();
