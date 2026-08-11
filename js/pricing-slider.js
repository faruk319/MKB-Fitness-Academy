document.addEventListener('DOMContentLoaded', () => {
  const navBtns = document.querySelectorAll('.pricing-nav__btn');
  const slider = document.getElementById('main-slider');
  
  if (!slider) return;

  const track = slider.querySelector('.pricing-slider__track');
  const cards = slider.querySelectorAll('.pricing-card');
  
  if (!track || cards.length === 0) return;

  // 1. Navigation Click Logic
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.dataset.target;
      
      // Find the first card with this category
      const targetCard = Array.from(cards).find(card => card.dataset.category === targetCategory);
      
      if (targetCard) {
        // Calculate position to center the card
        const trackCenter = track.clientWidth / 2;
        const cardCenter = targetCard.offsetLeft + (targetCard.clientWidth / 2);
        const scrollPos = cardCenter - trackCenter;
        
        track.scrollTo({ left: scrollPos, behavior: 'smooth' });
      }
    });
  });

  // 2. Scroll Spy Logic (IntersectionObserver)
  // We want to detect which card is closest to the center of the viewport
  const observerOptions = {
    root: track,
    rootMargin: '0px -40% 0px -40%', // Create a narrow vertical window in the center of the track
    threshold: 0 // Trigger as soon as a card enters this narrow center window
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Update active class on cards
        cards.forEach(c => c.classList.remove('is-visible'));
        entry.target.classList.add('is-visible');
        
        // Update navigation buttons based on the centered card's category
        const category = entry.target.dataset.category;
        
        if (category) {
          navBtns.forEach(btn => {
            if (btn.dataset.target === category) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
        }
      }
    });
  }, observerOptions);

  cards.forEach(card => observer.observe(card));

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
