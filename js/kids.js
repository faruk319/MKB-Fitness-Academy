/* ============================================================
   KIDS ACTIVITIES PAGE JAVASCRIPT LOGIC
   MKB Fitness Academy
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Activities Showcase Tab Switcher
  const tabBtns = document.querySelectorAll('.kids-tab-btn');
  const tabPanes = document.querySelectorAll('.kids-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  // 2. Gallery Category Filter
  const galBtns = document.querySelectorAll('.kids-gal-btn');
  const galItems = document.querySelectorAll('.kids-gal-item');

  galBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      galBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 3. Poster & Gallery Lightbox Preview Modal
  const lightbox = document.getElementById('kids-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  const triggerElements = document.querySelectorAll('.trigger-lightbox');

  triggerElements.forEach(el => {
    el.addEventListener('click', () => {
      const imgSrc = el.getAttribute('data-img');
      const captionText = el.getAttribute('data-caption') || 'MKB Kids Activities';

      if (imgSrc && lightboxImg) {
        lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.textContent = captionText;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightboxModal = () => {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightboxModal);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightboxModal();
      }
    });
  }

  // 4. Trial Enrollment Modal Logic
  const modal = document.getElementById('trial-modal');
  const openModalBtns = document.querySelectorAll('.open-trial-modal');
  const closeModalBtn = document.getElementById('modal-close');
  const trialForm = document.getElementById('trial-form');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const parentName = document.getElementById('form-parent-name')?.value || '';
      const phone = document.getElementById('form-phone')?.value || '';
      const childAge = document.getElementById('form-child-age')?.value || '';
      const activity = document.getElementById('form-activity')?.value || '';

      const text = `Hi MKB Fitness Academy! I'm interested in booking a Kids Trial Batch.\n\nParent Name: ${parentName}\nPhone: ${phone}\nChild Age: ${childAge}\nPreferred Activity: ${activity}`;
      const waUrl = `https://wa.me/919370813366?text=${encodeURIComponent(text)}`;

      window.open(waUrl, '_blank');
      closeModal();
    });
  }

  // 5. ESC Key Listener for Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightboxModal();
      closeModal();
    }
  });
});
