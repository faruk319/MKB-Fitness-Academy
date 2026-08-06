/* ============================================================
   MKB Health & Fitness Academy — Main JavaScript
   Navigation, Animations, WhatsApp, Counters, Pricing Tabs
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Enable JS-dependent animations
  document.body.classList.add('js-active');

  /* ---------- 1. NAVBAR SCROLL EFFECT ---------- */
  const navbar = document.querySelector('.navbar');
  const handleNavScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  /* ---------- 2. MOBILE HAMBURGER MENU ---------- */
  const hamburger = document.querySelector('.navbar__hamburger');
  const navLinks = document.querySelector('.navbar__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('navbar__hamburger--active');
      navLinks.classList.toggle('navbar__links--open');
      document.body.style.overflow = navLinks.classList.contains('navbar__links--open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('navbar__hamburger--active');
        navLinks.classList.remove('navbar__links--open');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('navbar__hamburger--active');
        navLinks.classList.remove('navbar__links--open');
        document.body.style.overflow = '';
      }
    });
  }


  /* ---------- 3. ACTIVE NAV LINK ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkPage = href.split('/').pop();
      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('navbar__link--active');
      }
    }
  });


  /* ---------- 4. SCROLL ANIMATIONS (Intersection Observer) ---------- */
  const animateElements = document.querySelectorAll('[data-animate]');
  if (animateElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const animateObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation
          const delay = entry.target.dataset.delay || index * 80;
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, Math.min(delay, 500));
          animateObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animateElements.forEach(el => animateObserver.observe(el));
  }


  /* ---------- 5. ANIMATED COUNTERS ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.counter);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          const duration = 2000;
          const startTime = performance.now();

          const isFloat = target % 1 !== 0;

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = easedProgress * target;

            if (isFloat) {
              el.textContent = prefix + currentValue.toFixed(1) + suffix;
            } else {
              el.textContent = prefix + Math.floor(currentValue) + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              if (isFloat) {
                el.textContent = prefix + target.toFixed(1) + suffix;
              } else {
                el.textContent = prefix + target + suffix;
              }
            }
          };

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(el => counterObserver.observe(el));
  }


  /* ---------- 6. PRICING TABS ---------- */
  const pricingTabs = document.querySelectorAll('.pricing-tab');
  const pricingPanels = document.querySelectorAll('.pricing-panel');

  if (pricingTabs.length > 0 && pricingPanels.length > 0) {
    pricingTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        // Update tabs
        pricingTabs.forEach(t => t.classList.remove('pricing-tab--active'));
        tab.classList.add('pricing-tab--active');

        // Update panels
        pricingPanels.forEach(panel => {
          panel.classList.remove('pricing-panel--active');
          if (panel.id === target) {
            panel.classList.add('pricing-panel--active');
          }
        });
      });
    });
  }


  /* ---------- 7. BACK TO TOP BUTTON ---------- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('back-to-top--visible');
      } else {
        backToTop.classList.remove('back-to-top--visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ---------- 8. CONTACT FORM & GOOGLE SHEET INTEGRATION ---------- */
  const GOOGLE_SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz5o_vIXu9OYUHtALGjkQrBLF1bkva39qHSJb3yy5iNP1xF4KDtBeVliBxIiuancKZ5/exec';

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('#name')?.value?.trim();
      const phone = contactForm.querySelector('#phone')?.value?.trim();
      const email = contactForm.querySelector('#email')?.value?.trim() || 'N/A';
      const program = contactForm.querySelector('#program')?.value || 'General Inquiry';
      const message = contactForm.querySelector('#message')?.value?.trim() || '';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const formAlert = document.getElementById('form-alert');

      if (!name || !phone) {
        if (formAlert) {
          formAlert.className = 'form-alert form-alert--error';
          formAlert.textContent = '❌ Please enter your name and phone number.';
          formAlert.style.display = 'block';
        } else {
          alert('Please enter your name and phone number.');
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Saving Inquiry & Opening WhatsApp...';
      }

      // Prepare FormData for Google Sheet submission
      const formData = new FormData();
      formData.append('timestamp', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('program', program);
      formData.append('message', message);

      try {
        if (!GOOGLE_SHEET_SCRIPT_URL.includes('REPLACE_WITH_YOUR_SCRIPT_ID')) {
          // Await fetch so request completes to Google Cloud before browser redirects/opens WhatsApp
          await fetch(GOOGLE_SHEET_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
          });
        }
      } catch (err) {
        console.warn('Google Sheet submission error:', err);
      }

      // Show Success Message
      if (formAlert) {
        formAlert.className = 'form-alert form-alert--success';
        formAlert.innerHTML = '✅ <strong>Inquiry Saved to Sheet!</strong> Opening WhatsApp chat...';
        formAlert.style.display = 'block';
      }

      // Format WhatsApp message with all user details
      let waMessage = `Hi MKB Fitness Academy! I have submitted an inquiry:\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n🏋️ *Interest:* ${program}`;
      if (email && email !== 'N/A') waMessage += `\n📩 *Email:* ${email}`;
      if (message) waMessage += `\n💬 *Message:* ${message}`;

      const waURL = `https://wa.me/919370813366?text=${encodeURIComponent(waMessage)}`;
      
      // Open WhatsApp chat
      window.open(waURL, '_blank');

      // Reset form
      contactForm.reset();
      if (submitBtn) {
        submitBtn.textContent = '✓ Saved & Opened WhatsApp!';
        setTimeout(() => {
          submitBtn.textContent = '🚀 Submit Inquiry & Chat on WhatsApp';
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }


  /* ---------- 9. LAZY LOADING IMAGES ---------- */
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length > 0) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    lazyImages.forEach(img => imgObserver.observe(img));
  }


  /* ---------- 10. SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(navbar?.style.height || '72');
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });


  /* ---------- 11. WHATSAPP TOOLTIP AUTO-HIDE ---------- */
  const waFloat = document.querySelector('.whatsapp-float');
  if (waFloat) {
    // Show tooltip briefly on page load
    const tooltip = waFloat.querySelector('.whatsapp-float__tooltip');
    if (tooltip) {
      setTimeout(() => {
        tooltip.style.opacity = '1';
        setTimeout(() => {
          tooltip.style.opacity = '0';
        }, 3000);
      }, 2000);
    }
  }

});
