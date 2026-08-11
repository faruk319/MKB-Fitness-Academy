document.addEventListener('DOMContentLoaded', () => {
  // Tabs logic
  const navBtns = document.querySelectorAll('.pricing-nav__btn');
  const sliders = document.querySelectorAll('.pricing-slider');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all tabs
      navBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked tab
      btn.classList.add('active');

      const targetId = `slider-${btn.dataset.target}`;
      
      // Hide all sliders
      sliders.forEach(slider => slider.classList.remove('active'));
      
      // Show target slider
      const targetSlider = document.getElementById(targetId);
      if (targetSlider) {
        targetSlider.classList.add('active');
        // Reset scroll position on tab change
        const track = targetSlider.querySelector('.pricing-slider__track');
        if (track) track.scrollTo({ left: 0, behavior: 'instant' });
      }
    });
  });

  // Slider controls logic
  sliders.forEach(slider => {
    const track = slider.querySelector('.pricing-slider__track');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    const dotsContainer = slider.querySelector('.pricing-slider__dots');
    const cards = slider.querySelectorAll('.pricing-card');
    
    if (!track || cards.length === 0) return;

    // Create dots
    cards.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('pricing-slider__dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => scrollToCard(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.pricing-slider__dot');

    function scrollToCard(index) {
      if (index < 0 || index >= cards.length) return;
      const card = cards[index];
      
      // Calculate position to center the card
      const trackCenter = track.clientWidth / 2;
      const cardCenter = card.offsetLeft + (card.clientWidth / 2);
      const scrollPos = cardCenter - trackCenter;
      
      track.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        // Find current active dot
        const activeIdx = Array.from(dots).findIndex(d => d.classList.contains('active'));
        if (activeIdx > 0) scrollToCard(activeIdx - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const activeIdx = Array.from(dots).findIndex(d => d.classList.contains('active'));
        if (activeIdx < cards.length - 1) scrollToCard(activeIdx + 1);
      });
    }

    // Intersection Observer to update active card style and dots
    const observerOptions = {
      root: track,
      rootMargin: '0px',
      threshold: 0.6 // Card must be 60% visible to become active
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove visible class from all cards in this track
          cards.forEach(c => c.classList.remove('is-visible'));
          // Add visible class to intersecting card
          entry.target.classList.add('is-visible');
          
          // Update dots
          const index = Array.from(cards).indexOf(entry.target);
          dots.forEach((d, i) => {
            if (i === index) d.classList.add('active');
            else d.classList.remove('active');
          });
        }
      });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
  });

  // FAQ Accordion logic
  const faqBtns = document.querySelectorAll('.faq-item__btn');
  faqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const content = item.querySelector('.faq-item__content');
      
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        // Close others
        document.querySelectorAll('.faq-item').forEach(other => {
          other.classList.remove('active');
          other.querySelector('.faq-item__content').style.maxHeight = null;
        });
        
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
});
