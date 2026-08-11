/**
 * MKB Wellness Therapy - Interactive Functionality
 * Features:
 * 1. Therapy Services Filtering (Recovery, Massage, Stretch, Mobility, Relaxation)
 * 2. Mindful Breathwork Visualizer & Web Audio Ambient Sound Generator
 * 3. Therapy Finder Diagnostic Prompt Quiz
 * 4. Interactive Booking Modal with Date/Time & WhatsApp Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  initServiceTabs();
  initBreathwork();
  initTherapyQuiz();
  initBookingModal();
  initScrollAnimations();
});

/* -------------------------------------------------------------
 * 1. SERVICE CATEGORY TABS
 * ------------------------------------------------------------- */
function initServiceTabs() {
  const tabs = document.querySelectorAll('.wellness-tab-btn');
  const serviceCards = document.querySelectorAll('.wellness-card');

  if (!tabs.length || !serviceCards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;

      // Update Active Tab Button
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter Cards
      serviceCards.forEach(card => {
        const cardCat = card.dataset.category;
        if (category === 'all' || cardCat === category) {
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
          }, 300);
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 2. MINDFUL BREATHWORK & WEB AUDIO AMBIENT SOUNDSCAPE
 * ------------------------------------------------------------- */
let breathInterval = null;
let isBreathing = false;
let audioCtx = null;
let isSoundPlaying = false;
let soundNodes = [];

function initBreathwork() {
  const startBtn = document.getElementById('breath-start-btn');
  const resetBtn = document.getElementById('breath-reset-btn');
  const soundToggle = document.getElementById('sound-toggle-btn');
  const circle = document.getElementById('breath-circle');
  const label = document.getElementById('breath-instruction');
  const timer = document.getElementById('breath-timer');
  const modeSelect = document.getElementById('breath-mode');

  if (!startBtn || !circle) return;

  // Breathwork Control
  startBtn.addEventListener('click', () => {
    if (isBreathing) {
      stopBreathwork();
      startBtn.textContent = '🌿 Start Breathwork';
      startBtn.classList.remove('active');
    } else {
      startBreathwork();
      startBtn.textContent = '⏸ Pause';
      startBtn.classList.add('active');
    }
  });

  resetBtn.addEventListener('click', () => {
    stopBreathwork();
    startBtn.textContent = '🌿 Start Breathwork';
    startBtn.classList.remove('active');
    label.textContent = 'Press Start to Begin';
    timer.textContent = '00:00';
    circle.style.transform = 'scale(1)';
    circle.classList.remove('inhale', 'hold', 'exhale');
  });

  // Soundscape Toggle
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      if (isSoundPlaying) {
        stopAmbientSound();
        soundToggle.classList.remove('active');
        soundToggle.innerHTML = '🔊 Ambient Sound: Off';
      } else {
        startAmbientSound();
        soundToggle.classList.add('active');
        soundToggle.innerHTML = '🎶 Soundscape: Ocean Waves';
      }
    });
  }

  function startBreathwork() {
    isBreathing = true;
    let secondsElapsed = 0;
    const mode = modeSelect ? modeSelect.value : '478';

    // Timer Counter
    breathInterval = setInterval(() => {
      secondsElapsed++;
      const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
      const secs = (secondsElapsed % 60).toString().padStart(2, '0');
      timer.textContent = `${mins}:${secs}`;
    }, 1000);

    runBreathCycle(mode);
  }

  function runBreathCycle(mode) {
    if (!isBreathing) return;

    if (mode === '478') {
      // 4s Inhale, 7s Hold, 8s Exhale
      label.textContent = 'Breathe In... (4s)';
      circle.style.transition = 'transform 4s ease-in-out';
      circle.style.transform = 'scale(1.4)';
      circle.className = 'breath-circle inhale';

      setTimeout(() => {
        if (!isBreathing) return;
        label.textContent = 'Hold Breath... (7s)';
        circle.className = 'breath-circle hold';

        setTimeout(() => {
          if (!isBreathing) return;
          label.textContent = 'Breathe Out Slowly... (8s)';
          circle.style.transition = 'transform 8s ease-in-out';
          circle.style.transform = 'scale(1)';
          circle.className = 'breath-circle exhale';

          setTimeout(() => {
            if (isBreathing) runBreathCycle(mode);
          }, 8000);
        }, 7000);
      }, 4000);
    } else {
      // Box Breathing: 4s In, 4s Hold, 4s Out, 4s Hold
      label.textContent = 'Inhale... (4s)';
      circle.style.transition = 'transform 4s ease-in-out';
      circle.style.transform = 'scale(1.35)';
      circle.className = 'breath-circle inhale';

      setTimeout(() => {
        if (!isBreathing) return;
        label.textContent = 'Hold... (4s)';
        circle.className = 'breath-circle hold';

        setTimeout(() => {
          if (!isBreathing) return;
          label.textContent = 'Exhale... (4s)';
          circle.style.transition = 'transform 4s ease-in-out';
          circle.style.transform = 'scale(1)';
          circle.className = 'breath-circle exhale';

          setTimeout(() => {
            if (!isBreathing) return;
            label.textContent = 'Hold Empty... (4s)';
            setTimeout(() => {
              if (isBreathing) runBreathCycle(mode);
            }, 4000);
          }, 4000);
        }, 4000);
      }, 4000);
    }
  }

  function stopBreathwork() {
    isBreathing = false;
    clearInterval(breathInterval);
  }
}

/* Synthesize Peaceful Ambient Water & Waves using Web Audio API */
function startAmbientSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // Pink Noise Generator for Ocean Wave Sound
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.04; // Gentle volume
      b6 = white * 0.115926;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter for soft wave motion
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, audioCtx.currentTime);

    // LFO for wave swelling
    const lfo = audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime); // Wave every ~8 seconds
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(200, audioCtx.currentTime);

    lfo.connect(filter.frequency);
    whiteNoise.connect(filter);

    // Master Volume
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    whiteNoise.start();
    lfo.start();

    soundNodes = [whiteNoise, lfo, masterGain];
    isSoundPlaying = true;
  } catch (e) {
    console.log('Web Audio API initialized with soft fallback');
  }
}

function stopAmbientSound() {
  if (soundNodes.length) {
    soundNodes.forEach(node => {
      try { node.stop ? node.stop() : node.disconnect(); } catch (e) {}
    });
    soundNodes = [];
  }
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
  isSoundPlaying = false;
}


/* -------------------------------------------------------------
 * 3. THERAPY FINDER DIAGNOSTIC QUIZ
 * ------------------------------------------------------------- */
function initTherapyQuiz() {
  const quizForm = document.getElementById('therapy-quiz-form');
  const resultContainer = document.getElementById('quiz-result-container');
  const resultCard = document.getElementById('quiz-recommended-card');

  if (!quizForm || !resultContainer) return;

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const area = quizForm.elements['quiz-area'].value;
    const goal = quizForm.elements['quiz-goal'].value;
    const intensity = quizForm.elements['quiz-intensity'].value;

    let recommendation = {
      title: 'Deep Tissue & Infrared Recovery',
      tag: 'Recommended Match',
      desc: 'Ideal for target muscle tension release, sports recovery, and deep tissue rejuvenation.',
      duration: '60 Min Session',
      category: 'Massage & Recovery',
      therapist: 'Dr. Ananya Sharma'
    };

    if (goal === 'relax' || intensity === 'gentle') {
      recommendation = {
        title: 'Aromatherapy & Tibetan Sound Bath',
        tag: 'Serenity Match',
        desc: 'Gentle, soothing holistic treatment using organic essential oils and sound wave frequencies to melt away mental stress.',
        duration: '75 Min Session',
        category: 'Relaxation',
        therapist: 'Meera Kulkarni'
      };
    } else if (goal === 'flexibility' || area === 'back') {
      recommendation = {
        title: 'Assisted PNF Stretch & Joint Mobility',
        tag: 'Mobility Match',
        desc: 'Specialized practitioner-guided stretching to unlock tight hamstrings, lower back, and increase joint range of motion.',
        duration: '45 Min Session',
        category: 'Stretch Therapy',
        therapist: 'Vikramaditya Roy'
      };
    } else if (goal === 'pain' || area === 'neck') {
      recommendation = {
        title: 'Myofascial Release & Cupping Therapy',
        tag: 'Targeted Relief',
        desc: 'Relieves chronic fascia tightness and enhances micro-circulation to relieve stubborn neck, shoulder, or spinal discomfort.',
        duration: '60 Min Session',
        category: 'Recovery',
        therapist: 'Dr. Ananya Sharma'
      };
    }

    resultCard.innerHTML = `
      <div class="result-badge">${recommendation.tag}</div>
      <h3 class="result-title">${recommendation.title}</h3>
      <p class="result-desc">${recommendation.desc}</p>
      <div class="result-meta">
        <span>⏱️ ${recommendation.duration}</span>
        <span>🏷️ Category: ${recommendation.category}</span>
        <span>🧑⚕️ Recommended Specialist: ${recommendation.therapist}</span>
      </div>
      <button class="btn btn--primary open-booking-btn" data-service="${recommendation.title}" data-therapist="${recommendation.therapist}">
        ✨ Book Recommended Session
      </button>
    `;

    resultContainer.style.display = 'block';
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Attach click handler to generated button
    const bookBtn = resultCard.querySelector('.open-booking-btn');
    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        openBookingModal(recommendation.title, recommendation.therapist);
      });
    }
  });
}


/* -------------------------------------------------------------
 * 4. INTERACTIVE BOOKING MODAL & WHATSAPP GENERATOR
 * ------------------------------------------------------------- */
function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const openBtns = document.querySelectorAll('.open-booking-btn');
  const bookingForm = document.getElementById('spa-booking-form');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.dataset.service || '';
      const therapist = btn.dataset.therapist || '';
      openBookingModal(service, therapist);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Handle Form Submission -> Pre-fill WhatsApp
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('book-name').value;
      const phone = document.getElementById('book-phone').value;
      const service = document.getElementById('book-service').value;
      const therapist = document.getElementById('book-therapist').value;
      const date = document.getElementById('book-date').value;
      const time = document.getElementById('book-time').value;
      const notes = document.getElementById('book-notes').value;

      const message = `Hi MKB Wellness Therapy Spa! I would like to book a session:
🌿 *Service:* ${service}
🧑⚕️ *Therapist Preference:* ${therapist || 'Any Specialist'}
📅 *Preferred Date:* ${date}
⏰ *Preferred Time:* ${time}
👤 *Name:* ${name}
📞 *Phone:* ${phone}
${notes ? `📝 *Notes/Focus Area:* ${notes}` : ''}`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/919370813366?text=${encodedMsg}`;

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      modal.classList.remove('active');
      alert(`Thank you, ${name}! Your booking details have been prepared. We are redirecting you to WhatsApp to confirm your slot.`);
    });
  }
}

function openBookingModal(serviceName = '', therapistName = '') {
  const modal = document.getElementById('booking-modal');
  const serviceSelect = document.getElementById('book-service');
  const therapistSelect = document.getElementById('book-therapist');

  if (modal) {
    if (serviceSelect && serviceName) {
      for (let option of serviceSelect.options) {
        if (option.value.toLowerCase().includes(serviceName.toLowerCase()) || serviceName.toLowerCase().includes(option.value.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }

    if (therapistSelect && therapistName) {
      for (let option of therapistSelect.options) {
        if (option.value.toLowerCase().includes(therapistName.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }

    modal.classList.add('active');
  }
}

/* -------------------------------------------------------------
 * 5. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
 * ------------------------------------------------------------- */
function initScrollAnimations() {
  const animateElements = document.querySelectorAll('[data-animate]');
  if (!animateElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animateElements.forEach(el => observer.observe(el));
}
