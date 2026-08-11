/* ============================================================
   MKB Fitness Academy — Personal Trainer Page Interactivity
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------
     1. WORKOUT PLAN TABS
     ------------------------------------------------------------ */
  const workoutTabs = document.querySelectorAll('.workout-tab-btn');
  const workoutPanes = document.querySelectorAll('.workout-pane');

  if (workoutTabs.length > 0) {
    workoutTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;

        workoutTabs.forEach(t => t.classList.remove('active'));
        workoutPanes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }

  /* ------------------------------------------------------------
     2. TRANSFORMATION GALLERY FILTER
     ------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.trans-filter-btn');
  const transCards = document.querySelectorAll('.trans-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        transCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------
     3. INTERACTIVE FITNESS ASSESSMENT WIDGET (MULTI-STEP)
     ------------------------------------------------------------ */
  const quizSteps = document.querySelectorAll('.quiz-step');
  const quizNextBtns = document.querySelectorAll('.quiz-next-btn');
  const quizPrevBtns = document.querySelectorAll('.quiz-prev-btn');
  const quizProgress = document.getElementById('quiz-progress-bar');
  let currentStep = 1;
  const totalSteps = 3;

  const quizData = {
    goal: 'fat-loss',
    level: 'intermediate',
    freq: '3-4'
  };

  // Option select within quiz
  document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', function() {
      const stepEl = this.closest('.quiz-step');
      stepEl.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');

      const group = this.dataset.group;
      const val = this.dataset.value;
      quizData[group] = val;
    });
  });

  const updateQuizStep = (step) => {
    quizSteps.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`quiz-step-${step}`);
    if (target) target.classList.add('active');

    if (quizProgress) {
      const percent = (step / (totalSteps + 1)) * 100;
      quizProgress.style.width = `${percent}%`;
    }
  };

  quizNextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep <= totalSteps) {
        currentStep++;
        if (currentStep > totalSteps) {
          calculateQuizResult();
        } else {
          updateQuizStep(currentStep);
        }
      }
    });
  });

  quizPrevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateQuizStep(currentStep);
      }
    });
  });

  const calculateQuizResult = () => {
    updateQuizStep(4); // Show result step

    const titleEl = document.getElementById('res-program-title');
    const descEl = document.getElementById('res-program-desc');
    const timeEl = document.getElementById('res-program-time');
    const trainerEl = document.getElementById('res-program-trainer');

    let title = "VIP Hypertrophy & Recomposition Program";
    let desc = "Designed to maximize fat loss while sculpting lean muscle tissue with 1-on-1 progressive resistance coaching.";
    let timeframe = "12 Weeks (3 Sessions / Week)";
    let trainer = "Coach Vikram Shinde (Senior Strength Coach)";

    if (quizData.goal === 'rehab') {
      title = "VIP Posture & Biomechanical Rehab Program";
      desc = "Specialized 1-on-1 corrective exercise protocol to fix postural imbalances, spinal strain, and joint pain.";
      timeframe = "8 - 12 Weeks (2-3 Sessions / Week)";
      trainer = "Dr. Sneha Kulkarni (Posture & Rehab Specialist)";
    } else if (quizData.goal === 'swim') {
      title = "VIP Elite Swim Coaching & Hydro Fitness";
      desc = "Private lane technical stroke optimization, endurance building, and low-impact aquatic conditioning.";
      timeframe = "8 Weeks (3 Sessions / Week)";
      trainer = "Coach Ananya Sharma (Aquatic Performance Coach)";
    } else if (quizData.goal === 'fat-loss') {
      title = "VIP Rapid Metabolic Recomposition Split";
      desc = "High-efficiency resistance training paired with precision metabolic conditioning and macro tracking.";
      timeframe = "12 Weeks (4 Sessions / Week)";
      trainer = "Coach Elena Rostova (Nutrition & Recomp Lead)";
    }

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (timeEl) timeEl.textContent = timeframe;
    if (trainerEl) trainerEl.textContent = trainer;
  };

  // Reset quiz button
  const resetQuizBtn = document.getElementById('reset-quiz-btn');
  if (resetQuizBtn) {
    resetQuizBtn.addEventListener('click', () => {
      currentStep = 1;
      updateQuizStep(1);
    });
  }

  /* ------------------------------------------------------------
     4. INTERACTIVE MACRO CALCULATOR
     ------------------------------------------------------------ */
  const macroForm = document.getElementById('macro-calc-form');
  if (macroForm) {
    macroForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const weight = parseFloat(document.getElementById('macro-weight').value) || 70;
      const height = parseFloat(document.getElementById('macro-height').value) || 175;
      const age = parseFloat(document.getElementById('macro-age').value) || 28;
      const gender = document.getElementById('macro-gender').value;
      const goal = document.getElementById('macro-goal').value;
      const activity = parseFloat(document.getElementById('macro-activity').value) || 1.4;

      // BMR Calculation (Mifflin-St Jeor)
      let bmr = (10 * weight) + (6.25 * height) - (5 * age);
      bmr = (gender === 'female') ? bmr - 161 : bmr + 5;

      let tdee = bmr * activity;
      let targetCalories = tdee;

      if (goal === 'fat-loss') {
        targetCalories = tdee - 500;
      } else if (goal === 'muscle-gain') {
        targetCalories = tdee + 350;
      }

      targetCalories = Math.round(targetCalories);

      // Protein: 2.2g per kg for muscle gain/fat loss, Carbs & Fats remaining
      let proteinGrams = Math.round(weight * 2.2);
      let proteinCalories = proteinGrams * 4;

      let fatCalories = Math.round(targetCalories * 0.25);
      let fatGrams = Math.round(fatCalories / 9);

      let carbCalories = targetCalories - proteinCalories - fatCalories;
      if (carbCalories < 0) carbCalories = 0;
      let carbGrams = Math.round(carbCalories / 4);

      // Animate numbers
      document.getElementById('res-calories').textContent = targetCalories.toLocaleString();
      document.getElementById('res-protein').textContent = `${proteinGrams}g`;
      document.getElementById('res-carbs').textContent = `${carbGrams}g`;
      document.getElementById('res-fat').textContent = `${fatGrams}g`;

      const resultBox = document.getElementById('macro-results-box');
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* ------------------------------------------------------------
     5. BOOKING MODAL & TRAINER SELECTION
     ------------------------------------------------------------ */
  const bookingModal = document.getElementById('booking-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const trainerSelect = document.getElementById('book-trainer-select');

  const openModal = (preferredTrainer = '') => {
    if (bookingModal) {
      if (preferredTrainer && trainerSelect) {
        trainerSelect.value = preferredTrainer;
      }
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const trainer = btn.dataset.trainer || '';
      openModal(trainer);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal();
      }
    });
  }

  // Handle Booking Form Submission
  const bookingForm = document.getElementById('booking-form');
  const bookingSuccess = document.getElementById('booking-success');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('book-name').value;
      const phone = document.getElementById('book-phone').value;
      const trainer = document.getElementById('book-trainer-select').value;
      const program = document.getElementById('book-program-select').value;
      const date = document.getElementById('book-date').value;
      const time = document.getElementById('book-time').value;

      // Construct WhatsApp Message
      const message = `Hi MKB Fitness Academy, I would like to book a VIP 1-on-1 Consultation!%0A%0A👤 *Name:* ${encodeURIComponent(name)}%0A📞 *Phone:* ${encodeURIComponent(phone)}%0A🏋️‍♂️ *Trainer:* ${encodeURIComponent(trainer)}%0A📋 *Program:* ${encodeURIComponent(program)}%0A📅 *Preferred Date:* ${encodeURIComponent(date)}%0A⏰ *Time Slot:* ${encodeURIComponent(time)}`;

      const waUrl = `https://wa.me/919370813366?text=${message}`;

      if (bookingSuccess) {
        document.getElementById('success-details').innerHTML = `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Coach:</strong> ${trainer}</p>
          <p><strong>Program:</strong> ${program}</p>
          <p><strong>Slot:</strong> ${date} at ${time}</p>
        `;
        document.getElementById('whatsapp-confirm-link').setAttribute('href', waUrl);

        bookingForm.style.display = 'none';
        bookingSuccess.style.display = 'block';
      } else {
        window.open(waUrl, '_blank');
        closeModal();
      }
    });
  }

  // Set min date for booking datepicker
  const dateInput = document.getElementById('book-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

});
