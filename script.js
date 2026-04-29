// script.js — Fixed & Complete
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* =============================================
       1. NAVBAR — scroll effect
    ============================================= */
    const navbar = document.getElementById('navbar') || document.querySelector('.navbar');

    if (navbar) {
      const onScroll = function () {
        if (window.scrollY > 60) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll(); // run once on load
    }


    /* =============================================
       2. MOBILE MENU — hamburger toggle
    ============================================= */
    const hamburger  = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        const isOpen = mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on any link click inside the menu
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileMenu.classList.remove('active');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      // Close on ESC key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }


    /* =============================================
       3. SCROLL ANIMATIONS — IntersectionObserver
       FIXED: Marks sections as will-animate first,
       then adds animate class when visible.
       Sections without JS still show (opacity:1 default)
    ============================================= */
    const animatableEls = document.querySelectorAll('.content-section');

    if ('IntersectionObserver' in window && animatableEls.length) {
      // First pass — mark all as needing animation
      animatableEls.forEach(function (el) {
        el.classList.add('will-animate');
      });

      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry, i) {
            if (entry.isIntersecting) {
              // Stagger each element slightly
              setTimeout(function () {
                entry.target.classList.add('animate');
              }, i * 80);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      animatableEls.forEach(function (el) {
        observer.observe(el);
      });
    }


    /* =============================================
       4. SMOOTH SCROLL — anchor links
    ============================================= */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });


    /* =============================================
       5. SERVICE FILTER TABS
    ============================================= */
    const filterTabs = document.querySelectorAll('.filter-tab');

    if (filterTabs.length) {
      filterTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          filterTabs.forEach(function (t) { t.classList.remove('active'); });
          tab.classList.add('active');

          const targetSelector = tab.dataset.target;

          document.querySelectorAll('.service-category').forEach(function (cat) {
            cat.classList.add('hidden');
          });

          if (targetSelector === 'all') {
            document.querySelectorAll('.service-category').forEach(function (cat) {
              cat.classList.remove('hidden');
            });
          } else {
            const targetEl = document.querySelector(targetSelector);
            if (targetEl) targetEl.classList.remove('hidden');
          }
        });
      });
    }


    /* =============================================
       6. BOOKING FORM — FIXED
       Uses Formspree (free & works on GitHub Pages).
       Replace YOUR_FORM_ID with your actual Formspree ID
       from https://formspree.io/
    ============================================= */
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
      bookingForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn  = bookingForm.querySelector('button[type="submit"]');
        const successMsg = document.getElementById('booking-success');
        const originalHTML = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled   = true;
        submitBtn.innerHTML  = 'Sending&#8230;';

        // Read form data
        const formData = new FormData(bookingForm);
        const formAction = bookingForm.getAttribute('action') || '';

        // If no real action set, simulate success (GitHub Pages demo mode)
        if (!formAction || formAction === '#') {
          await simulateDelay(900);
          showSuccess(bookingForm, successMsg, submitBtn, originalHTML);
          return;
        }

        try {
          const response = await fetch(formAction, {
            method:  'POST',
            body:    formData,
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            showSuccess(bookingForm, successMsg, submitBtn, originalHTML);
          } else {
            const data = await response.json().catch(function () { return {}; });
            const errMsg = data.error || 'Something went wrong. Please try again or call us on 011 50709111.';
            showError(submitBtn, originalHTML, errMsg);
          }
        } catch (err) {
          showError(submitBtn, originalHTML, 'Network error. Please check your connection or call us on 011 50709111.');
        }
      });
    }


    /* =============================================
       7. CONTACT FORM
    ============================================= */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
      contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn  = contactForm.querySelector('button[type="submit"]');
        const successMsg = document.getElementById('contact-success');
        const originalHTML = submitBtn.innerHTML;

        submitBtn.disabled  = true;
        submitBtn.innerHTML = 'Sending&#8230;';

        const formData   = new FormData(contactForm);
        const formAction = contactForm.getAttribute('action') || '';

        if (!formAction || formAction === '#') {
          await simulateDelay(900);
          showSuccess(contactForm, successMsg, submitBtn, originalHTML);
          return;
        }

        try {
          const response = await fetch(formAction, {
            method:  'POST',
            body:    formData,
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            showSuccess(contactForm, successMsg, submitBtn, originalHTML);
          } else {
            showError(submitBtn, originalHTML, 'Something went wrong. Please call us on 011 50709111.');
          }
        } catch (err) {
          showError(submitBtn, originalHTML, 'Network error. Please call us on 011 50709111.');
        }
      });
    }


    /* =============================================
       8. RESET FORM BUTTON
    ============================================= */
    document.querySelectorAll('.reset-form').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const container  = btn.closest('.form-container') || btn.closest('section');
        if (!container) return;
        const form       = container.querySelector('form');
        const successMsg = container.querySelector('.success-message');
        if (form) {
          form.style.display = '';
          form.reset();
        }
        if (successMsg) {
          successMsg.style.display = 'none';
        }
      });
    });


    /* =============================================
       HELPERS
    ============================================= */

    function showSuccess(form, successEl, btn, originalHTML) {
      if (form)       form.style.display       = 'none';
      if (successEl)  successEl.style.display  = 'block';
      if (btn) {
        btn.disabled   = false;
        btn.innerHTML  = originalHTML;
      }
    }

    function showError(btn, originalHTML, message) {
      if (btn) {
        btn.disabled   = false;
        btn.innerHTML  = originalHTML;
      }
      alert(message);
    }

    function simulateDelay(ms) {
      return new Promise(function (resolve) { setTimeout(resolve, ms); });
    }

  }); // end DOMContentLoaded
})();
