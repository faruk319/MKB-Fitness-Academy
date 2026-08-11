/* ============================================================
   MKB Fitness Academy — Trainers Page Interactivity
   Category Filtering, Modal Profiles, Booking Triggers, Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------
     1. CATEGORY FILTERING FOR TRAINER CARDS
     ------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.tr-filter-btn, .trainer-filter-btn');
  const trainerCards = document.querySelectorAll('.trainer-card');
  const trainerCountEl = document.getElementById('visible-trainer-count');

  if (filterBtns.length > 0 && trainerCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button state
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        let visibleCount = 0;

        // Filter trainer cards with smooth transition
        trainerCards.forEach(card => {
          const category = card.dataset.category;
          const isMatch = filter === 'all' || category === filter;

          if (isMatch) {
            card.style.display = 'flex';
            visibleCount++;
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });

        if (trainerCountEl) {
          trainerCountEl.textContent = visibleCount;
        }
      });
    });
  }


  /* ------------------------------------------------------------
     2. TRAINER DATA STORE (FOR MODALS)
     ------------------------------------------------------------ */
  const trainerDataStore = {
    'mayur-bhandari': {
      name: 'Mayur K. Bhandari',
      role: 'Founder & Head Master Coach',
      category: 'Gym & Strength',
      experience: '12+ Years Experience',
      image: './images/pt_hero_luxury.jpg',
      certifications: ['ACE Master Trainer', 'K11 Master Certified', 'NSCA CPT', 'CPR / AED First Aid'],
      specialties: ['Strength Engineering', 'Bodybuilding & Hypertrophy', 'Physique Transformation', 'Contest Preparation'],
      bio: 'Mayur Bhandari is the visionary founder of MKB Fitness Academy. With over 12 years of hands-on coaching experience and thousands of successful client transformations, Mayur specializes in biomechanically sound resistance training, competition prep, and sustainable physique re-engineering.',
      achievements: ['1,500+ Client Transformations', 'Coach to 10+ State Powerlifting Medalists', 'Featured Fitness Educator in Pune'],
      quote: 'Fitness is not a temporary phase; it is an architectural rebuild of your body and mindset.'
    },
    'ananya-sharma': {
      name: 'Ananya Sharma',
      role: 'Aquatic Performance & Swimming Head Coach',
      category: 'Swimming & Aquatic',
      experience: '8+ Years Experience',
      image: './images/swimming-coach.jpg',
      certifications: ['ASCA Level 3 Aquatic Coach', 'Red Cross Lifeguard Instructor', 'Aquatic Rehab Specialist'],
      specialties: ['Stroke Technique Refinement', 'Hydro-Conditioning', 'Water Phobia Elimination', 'Competitive Swim Training'],
      bio: 'Former State Gold Medalist swimmer, Ananya Sharma leads the swimming department at MKB Fitness Academy. She has coached children, adults, and triathletes, bringing precise stroke mechanics and water confidence techniques.',
      achievements: ['1,200+ Swimmers Trained', '100% Water Safety Success Rate', 'State Championship Coach'],
      quote: 'In the water, efficiency triumphs over force. Learn the art of gliding through resistance.'
    },
    'vikram-shinde': {
      name: 'Vikram Shinde',
      role: 'Senior Strength & Hypertrophy Specialist',
      category: 'Gym & Strength',
      experience: '7+ Years Experience',
      image: './images/pt_trainer_2.jpg',
      certifications: ['K11 Senior Strength Coach', 'ISSA Sports Nutritionist', 'FMS Level 1'],
      specialties: ['Hypertrophy Science', 'Powerlifting Mechanics', 'Muscle Gain Splits', 'Macro Nutrition'],
      bio: 'Vikram is a dedicated strength coach known for his obsessive focus on lifting mechanics and muscle isolation. He works with clients aiming for serious muscle building, fat loss, and strength progression.',
      achievements: ['800+ Body Transformations', 'Personal Best: 240kg Squat', '98% Client Retention Rate'],
      quote: 'Focus on perfect execution for every repetition, and the physique will follow automatically.'
    },
    'sneha-kulkarni': {
      name: 'Dr. Sneha Kulkarni',
      role: 'Posture & Functional Rehabilitation Specialist',
      category: 'Posture & Rehab',
      experience: '9+ Years Experience',
      image: './images/pt_trainer_3.jpg',
      certifications: ['Bachelor of Physiotherapy (BPT)', 'FMS Level 2 Certified', 'Dry Needling & Taping'],
      specialties: ['Postural Correction', 'Spinal Decompression', 'Joint Mobility', 'Post-Op Knee/Shoulder Rehab'],
      bio: 'Dr. Sneha combines clinical physiotherapy with functional strength training. She helps members eliminate back, neck, and knee pain, restoring full range of motion so they can train heavy safely.',
      achievements: ['600+ Rehab Success Stories', 'Ergonomic Consultant for Tech Firms', 'Zero Injury Recurrence Rate'],
      quote: 'Movement is medicine when executed with biomechanical alignment.'
    },
    'rajesh-patil': {
      name: 'Rajesh Patil',
      role: 'Fat Loss & Metabolic Conditioning Coach',
      category: 'Fat Loss Specialist',
      experience: '6+ Years Experience',
      image: './images/pt_assessment.jpg',
      certifications: ['ACE Certified Personal Trainer', 'Metabolic Conditioning Specialist', 'TRX Master Trainer'],
      specialties: ['Rapid Fat Loss', 'HIIT Circuit Design', 'Endurance Building', 'Caloric Management'],
      bio: 'Rajesh is high energy and results-focused. His metabolic conditioning programs burn maximum calories while preserving lean tissue, helping clients achieve sustainable weight loss without extreme starvation diets.',
      achievements: ['900+ Fat Loss Transformations', 'Average 12kg Weight Loss per Client', 'Marathon Finisher'],
      quote: 'Consistency beats intensity every single day. Trust the process and honor the daily work.'
    },
    'pooja-verma': {
      name: 'Pooja Verma',
      role: 'Yoga, Flexibility & Mobility Coach',
      category: 'Yoga & Wellness',
      experience: '10+ Years Experience',
      image: './images/pt_nutrition.jpg',
      certifications: ['RYT-500 International Yoga Alliance', 'Breathwork Practitioner', 'Yin Yoga Certified'],
      specialties: ['Vinyasa & Hatha Flow', 'Core Stability', 'Flexibility Enhancement', 'Stress & Breath Control'],
      bio: 'Pooja brings holistic physical and mental mastery to MKB Fitness Academy. Her mobility sessions enhance joint elasticity, prevent lifting injuries, and promote deep physical recovery.',
      achievements: ['1,000+ Students Taught', 'International Wellness Workshop Leader', 'Corporate Mindfulness Trainer'],
      quote: 'Flexibility of the body breeds resilience of the mind. Stretch your boundaries every day.'
    }
  };


  /* ------------------------------------------------------------
     3. TRAINER DETAIL MODAL TRIGGER
     ------------------------------------------------------------ */
  const detailModal = document.getElementById('trainer-detail-modal');
  const openDetailBtns = document.querySelectorAll('.btn-open-trainer-modal');
  const closeDetailBtns = document.querySelectorAll('.close-detail-modal');

  const modalName = document.getElementById('modal-trainer-name');
  const modalRole = document.getElementById('modal-trainer-role');
  const modalExp = document.getElementById('modal-trainer-exp');
  const modalImg = document.getElementById('modal-trainer-img');
  const modalBio = document.getElementById('modal-trainer-bio');
  const modalQuote = document.getElementById('modal-trainer-quote');
  const modalCerts = document.getElementById('modal-trainer-certs');
  const modalSpecs = document.getElementById('modal-trainer-specs');
  const modalAchieve = document.getElementById('modal-trainer-achieve');
  const modalBookBtn = document.getElementById('modal-trainer-book-btn');

  if (detailModal && openDetailBtns.length > 0) {
    openDetailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const trainerKey = btn.dataset.trainer;
        const data = trainerDataStore[trainerKey];

        if (data) {
          if (modalName) modalName.textContent = data.name;
          if (modalRole) modalRole.textContent = data.role;
          if (modalExp) modalExp.textContent = data.experience;
          if (modalImg) {
            modalImg.src = data.image;
            modalImg.alt = data.name;
          }
          if (modalBio) modalBio.textContent = data.bio;
          if (modalQuote) modalQuote.textContent = `"${data.quote}"`;

          // Certifications
          if (modalCerts) {
            modalCerts.innerHTML = data.certifications.map(c => `<span class="tr-pill tr-pill--gold">📜 ${c}</span>`).join('');
          }

          // Specialties
          if (modalSpecs) {
            modalSpecs.innerHTML = data.specialties.map(s => `<span class="tr-pill">🎯 ${s}</span>`).join('');
          }

          // Achievements
          if (modalAchieve) {
            modalAchieve.innerHTML = data.achievements.map(a => `<li>⭐ ${a}</li>`).join('');
          }

          // Set book button link / action
          if (modalBookBtn) {
            modalBookBtn.dataset.trainer = data.name;
          }

          detailModal.showModal();
          document.body.style.overflow = 'hidden';
        }
      });
    });

    closeDetailBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        detailModal.close();
        document.body.style.overflow = '';
      });
    });

    detailModal.addEventListener('click', (e) => {
      const rect = detailModal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        detailModal.close();
        document.body.style.overflow = '';
      }
    });
  }


  /* ------------------------------------------------------------
     4. BOOKING MODAL TRIGGER & WHATSAPP GENERATION
     ------------------------------------------------------------ */
  const bookingModal = document.getElementById('trainer-booking-modal');
  const openBookingBtns = document.querySelectorAll('.btn-book-trainer');
  const closeBookingBtns = document.querySelectorAll('.close-booking-modal');
  const trainerSelectEl = document.getElementById('booking-trainer-select');
  const bookingForm = document.getElementById('trainer-booking-form');

  if (bookingModal) {
    openBookingBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const trainerName = btn.dataset.trainer;

        if (trainerSelectEl && trainerName) {
          // Pre-select trainer in dropdown
          for (let option of trainerSelectEl.options) {
            if (option.value.toLowerCase().includes(trainerName.toLowerCase()) || option.text.toLowerCase().includes(trainerName.toLowerCase())) {
              option.selected = true;
              break;
            }
          }
        }

        // Close detail modal if open
        if (detailModal && detailModal.open) {
          detailModal.close();
        }

        bookingModal.showModal();
        document.body.style.overflow = 'hidden';
      });
    });

    if (modalBookBtn) {
      modalBookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const trainerName = modalBookBtn.dataset.trainer;
        if (detailModal && detailModal.open) {
          detailModal.close();
        }
        if (trainerSelectEl && trainerName) {
          for (let option of trainerSelectEl.options) {
            if (option.value.toLowerCase().includes(trainerName.toLowerCase()) || option.text.toLowerCase().includes(trainerName.toLowerCase())) {
              option.selected = true;
              break;
            }
          }
        }
        bookingModal.showModal();
        document.body.style.overflow = 'hidden';
      });
    }

    closeBookingBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        bookingModal.close();
        document.body.style.overflow = '';
      });
    });

    bookingModal.addEventListener('click', (e) => {
      const rect = bookingModal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        bookingModal.close();
        document.body.style.overflow = '';
      }
    });

    // Form Submit handling (WhatsApp integration)
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('booking-name')?.value || 'Member';
        const phone = document.getElementById('booking-phone')?.value || '';
        const trainer = document.getElementById('booking-trainer-select')?.value || 'Any Trainer';
        const goal = document.getElementById('booking-goal-select')?.value || 'General Fitness';
        const timeSlot = document.getElementById('booking-time-select')?.value || 'Morning';
        const notes = document.getElementById('booking-notes')?.value || 'No additional notes.';

        const waText = `Hi MKB Fitness Academy! I would like to book a 1-on-1 session with ${trainer}.%0A%0A*Member Details:*%0A• Name: ${encodeURIComponent(name)}%0A• Phone: ${encodeURIComponent(phone)}%0A• Selected Goal: ${encodeURIComponent(goal)}%0A• Preferred Time: ${encodeURIComponent(timeSlot)}%0A• Notes: ${encodeURIComponent(notes)}`;

        const waUrl = `https://wa.me/919370813366?text=${waText}`;

        // Show quick success alert/view
        const formContainer = bookingForm.parentElement;
        formContainer.innerHTML = `
          <div class="booking-success-box">
            <div class="success-icon">🎉</div>
            <h3>Booking Inquiry Received!</h3>
            <p>Thank you <strong>${name}</strong>! We are redirecting you to WhatsApp to instantly confirm your session with <strong>${trainer}</strong>.</p>
            <a href="${waUrl}" target="_blank" rel="noopener" class="tr-btn tr-btn--gold tr-btn--full" style="margin-top:15px;">Continue to WhatsApp Chat 💬</a>
          </div>
        `;

        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 1200);
      });
    }
  }

});
