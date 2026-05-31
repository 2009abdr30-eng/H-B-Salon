/* ============================================================
   HANY & BELAL HAIRDRESSER — SHARED JAVASCRIPT
   ============================================================ */
 document.addEventListener("DOMContentLoaded", () => {
  
  // 1. SCROLL ANIMATION TRIGGER (Fades elements in as you scroll)
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const appearanceOptions = {
    threshold: 0.15,       /* Element triggers when 15% of it is visible */
    rootMargin: "0px 0px -50px 0px"
  };

  const appearanceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); /* Stop watching once it appears */
      }
    });
  }, appearanceOptions);

  fadeElements.forEach(element => {
    appearanceObserver.observe(element);
  });

  // 2. COUNTER DYNAMICS (Animates the stats from 0 to target values)
  const statNumbers = document.querySelectorAll('[data-countup]');
  
  const countUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        const targetValue = parseFloat(targetElement.getAttribute('data-countup'));
        let startValue = 0;
        const duration = 1500; /* Duration of count animation in ms */
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        const increment = targetValue / totalFrames;
        let currentFrame = 0;

        const animateCount = () => {
          currentFrame++;
          startValue += increment;
          
          if (currentFrame >= totalFrames) {
            targetElement.textContent = targetValue;
          } else {
            // Handle decimal points for ratings like 4.8 vs whole numbers like 325
            targetElement.textContent = Number.isInteger(targetValue) 
              ? Math.floor(startValue) 
              : startValue.toFixed(1);
            requestAnimationFrame(animateCount);
          }
        };

        requestAnimationFrame(animateCount);
        observer.unobserve(targetElement);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => countUpObserver.observe(stat));
});
document.addEventListener('DOMContentLoaded', () => {
 
  // ── NAVBAR SCROLL STATE ──────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleNavScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }
 
  // ── MOBILE HAMBURGER ─────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileOverlay = document.querySelector('.nav-mobile-overlay');
  const mobileLinks = document.querySelectorAll('.nav-mobile-overlay a');
 
  if (hamburger && mobileOverlay) {
    const toggleMenu = () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };
    hamburger.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }
 
  // ── ACTIVE NAV LINK ───────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile-overlay a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });
 
  // ── INTERSECTION OBSERVER — FADE UP ──────────────────────
  const fadeElements = document.querySelectorAll('.fade-up');
  if (fadeElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeElements.forEach(el => observer.observe(el));
  }
 
  // ── COUNT-UP ANIMATION ────────────────────────────────────
  const countUpElements = document.querySelectorAll('[data-countup]');
  if (countUpElements.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const target = parseFloat(entry.target.dataset.countup);
          const isDecimal = target % 1 !== 0;
          const duration = 2000;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            entry.target.textContent = isDecimal
              ? current.toFixed(1)
              : Math.floor(current).toLocaleString();
            if (progress < 1) requestAnimationFrame(animate);
            else entry.target.textContent = isDecimal
              ? target.toFixed(1)
              : target.toLocaleString();
          };
          requestAnimationFrame(animate);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    countUpElements.forEach(el => countObserver.observe(el));
  }
 
  // ── SMOOTH SCROLL ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 76;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
 
  // ── BOOKING FORM ──────────────────────────────────────────
  const bookingForm = document.getElementById('booking-form');
  const formSuccess = document.querySelector('.form-success');
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = bookingForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      try {
        const res = await fetch(bookingForm.action, {
          method: 'POST',
          body: new FormData(bookingForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          bookingForm.style.display = 'none';
          if (formSuccess) formSuccess.style.display = 'block';
        } else {
          btn.textContent = 'Try Again';
          btn.disabled = false;
          alert('Something went wrong. Please try again or call us directly.');
        }
      } catch {
        btn.textContent = 'Try Again';
        btn.disabled = false;
        alert('Network error. Please call us: 011 50709111');
      }
    });
  }
 
  // ── CONTACT FORM ──────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          contactForm.innerHTML = `
            <div style="text-align:center;padding:40px 0;">
              <div style="font-size:3rem;margin-bottom:16px;">✅</div>
              <h3 style="font-family:var(--font-heading);color:var(--gold);margin-bottom:8px;">Message Sent!</h3>
              <p style="color:var(--text-muted);">We'll get back to you shortly.</p>
            </div>`;
        } else {
          btn.textContent = 'Try Again';
          btn.disabled = false;
        }
      } catch {
        btn.textContent = 'Try Again';
        btn.disabled = false;
      }
    });
  }
 
  // ── SERVICES FILTER TABS ──────────────────────────────────
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (filterTabs.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const category = tab.dataset.filter;
        document.querySelectorAll('.service-category').forEach(cat => {
          if (category === 'all' || cat.dataset.category === category) {
            cat.style.display = '';
          } else {
            cat.style.display = 'none';
          }
        });
      });
    });
  }
 
  // ── BOOK-ANOTHER RESET ────────────────────────────────────
  const bookAgain = document.getElementById('book-again');
  if (bookAgain) {
    bookAgain.addEventListener('click', () => {
      const form = document.getElementById('booking-form');
      const success = document.querySelector('.form-success');
      if (form && success) {
        form.style.display = '';
        success.style.display = 'none';
        form.reset();
        const btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.textContent = 'Confirm My Appointment →'; btn.disabled = false; }
      }
    });
  }
 
});
