/**
 * A LOVE LETTER TO HARSHITA
 * Pure Vanilla JavaScript (No frameworks, zero external dependencies)
 * Features: Web Audio API music box, Petal physics canvas, Interactive Jar,
 * Love Counter, Open-When modal letters, Photo gallery upload, Star constellation,
 * and Keepsake Certificate.
 */

// ==========================================================================
// 1. CONFIGURATION & STATE
// ==========================================================================
const DEFAULT_CONFIG = {
  herName: "Harshita",
  partnerName: "Yours Always",
  startDate: "2023-11-18T00:00:00",
  theme: "daylight", // "daylight" or "twilight"
  musicPlaying: false
};

let AppState = {
  ...DEFAULT_CONFIG,
  reasons: [
    "The way your eyes crinkle with pure warmth whenever you genuinely laugh.",
    "How you turn any mundane Tuesday into the brightest moment of my entire week.",
    "Your unmatched kindness and the tender empathy you share with everyone around you.",
    "The gentle, calming reassurance I feel the very second my hand holds yours.",
    "How passionately you talk about the things, dreams, and hobbies you love.",
    "The way you remember the smallest, quietest details about our conversations.",
    "Your beautiful, radiant smile that can melt away my heaviest days within seconds.",
    "The funny little expressions and cute faces you make when you think no one is watching.",
    "How safe, grounded, and completely myself I feel whenever I am with you.",
    "Your brilliant mind, your inspiring determination, and your quiet resilience.",
    "How you make every song sound sweeter and every sunset look infinitely softer.",
    "The warmth of your hugs that make the entire chaotic world disappear.",
    "How effortlessly you make me laugh until my cheeks hurt.",
    "The adorable way your nose scrunches when you get playfully stubborn.",
    "Because you believe in me even during the moments I doubt myself.",
    "How beautiful you look first thing in the morning with sleep in your eyes and messy hair.",
    "The sweet voice notes that I secretly replay over and over again.",
    "How you challenge me to be a kinder, wiser, and more loving human every single day.",
    "Because in a room filled with a thousand people, my heart will always look for you.",
    "The gentle way you look at me across a crowded table, like we share a secret world.",
    "Because loving you is the easiest, most natural decision I have ever made in my life."
  ],
  openWhenLetters: {
    badDay: {
      tag: "Open When...",
      title: "You've Had a Rough, Exhausting Day",
      content: `My sweetest Harshita,\n\nTake a slow, deep breath and drop your shoulders. Close your eyes for just three seconds and imagine my arms wrapped tightly around you.\n\nWhatever happened today does not define your worth, your grace, or your brilliance. You fought through it with the strength you always carry, even if you feel completely drained right now.\n\nTonight, you don't have to be strong. You don't have to fix the world. Put on your softest clothes, wrap yourself in warmth, and let me hold the weight for a little while. I am so proud of you, Harshita. Always have been, always will be.\n\nRest your gentle heart tonight. Tomorrow is a brand new page, and I will be cheering for you every step of the way.`
    },
    missMe: {
      tag: "Open When...",
      title: "You Miss Me & Need a Hug",
      content: `To My Harshita,\n\nI want you to know something: wherever you are right this second, a part of my heart is beating right beside you.\n\nDistance is just geography; it has no power over how deeply connected we are. Look at the palm of your hand, press it against your chest, and feel that steady rhythm. That is our love, unwavering and true.\n\nI miss the sound of your laugh, the fragrance of your hair, and the way our fingers effortlessly interlock. Until we are in each other's arms again, close your eyes and remember: you are cherished beyond words. I am always counting down the seconds until I see you next.`
    },
    cantSleep: {
      tag: "Open When...",
      title: "You Can't Fall Asleep at Night",
      content: `My sleepy angel Harshita,\n\nThe clock is ticking late, the world is quiet, and your mind is wandering. Let go of every thought buzzing in your head.\n\nThink of a quiet meadow bathed in silver starlight. Feel the soft evening breeze. Imagine us sitting on a blanket together, your head resting comfortably on my chest, listening to the calm, steady beat of my heart.\n\nYou are completely safe. You are deeply loved. Let the night wrap around you like a warm embrace. Close your lovely eyes, dream of our brightest memories, and sleep peacefully. I'll be waiting to say good morning to you tomorrow.`
    },
    doubtYourself: {
      tag: "Open When...",
      title: "You Doubt Yourself or Feel Insecure",
      content: `Harshita,\n\nLook at yourself through my eyes for just one moment.\n\nI see a woman of rare grace, radiant beauty, sharp intellect, and profound compassion. You possess a spirit that brings light into rooms you haven't even noticed. The challenges you face are tough, but you are infinitely tougher.\n\nNever let a temporary stumble convince you that you are anything less than extraordinary. You have overcome so much to stand where you are today. Be gentle with yourself. You are magic, Harshita, and I am the luckiest soul alive to bear witness to your journey.`
    },
    wantToLaugh: {
      tag: "Open When...",
      title: "You Need an Instant Reason to Smile",
      content: `Hey trouble!\n\nRemember that time we couldn't stop laughing at something completely ridiculous until our stomachs cramped?\n\nHere is your reminder that you have the most contagious, adorable, melodic giggle in the known universe. Also, here is a legally binding romantic promise:\n1. I will always give you the last bite of the tastiest food (even if I stare at it wistfully).\n2. I will always listen to your rambling stories about your day.\n3. I will dance with you terribly in the kitchen just to hear that laugh again.\n\nNow look in the mirror, give me that million-dollar Harshita smile, and go conquer your day!`
    },
    deepLove: {
      tag: "Open When...",
      title: "You Need to Know How Much I Love You",
      content: `Dearest Harshita,\n\nIf I could gather all the stars in the night sky and write our story in light, it still wouldn't measure a fraction of what I feel for you.\n\nMy love for you isn't loud for the sake of show; it is steady, quiet, fierce, and permanent. It lives in the way I wake up thinking of your well-being, the way I look forward to seeing your name appear on my screen, and the way every dream of my future has you walking right beside me.\n\nYou are my home, my anchor, and my happiest thought. Yesterday, today, and through every tomorrow that life grants us, I love you completely.`
    }
  }
};

// Load persistent config
try {
  const savedConfig = localStorage.getItem("harshita_love_config");
  if (savedConfig) {
    const parsed = JSON.parse(savedConfig);
    AppState = { ...AppState, ...parsed };
  }
} catch (e) {
  console.warn("Storage access restricted or empty", e);
}

// ==========================================================================
// 2. ROMANTIC WEB AUDIO API SYNTHESIZER (No external audio files)
// ==========================================================================
class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.chordStep = 0;

    // Romantic music-box pentatonic chord progressions
    // Frequencies (Hz) for a soothing music box
    this.chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
      [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
      [174.61, 261.63, 329.63, 392.00], // Fmaj7 (F3, C4, E4, G4)
      [196.00, 246.94, 293.66, 392.00]  // G6 (G3, B3, D4, G4)
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPluck(freq, time, duration = 1.6) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Soft chime timbre: sine with soft octave overtone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.08, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  playChime() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Pleasant double chime on interaction
    this.playPluck(523.25, now, 1.2);       // C5
    this.playPluck(659.25, now + 0.12, 1.4); // E5
    this.playPluck(783.99, now + 0.24, 1.6); // G5
  }

  playPaperRustle() {
    this.init();
    if (!this.ctx) return;
    // Soft noise burst simulating paper unfolding
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  startMusic() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.chordStep = 0;
    this.scheduleNextArpeggio();
    updateAudioUI(true);
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    updateAudioUI(false);
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
  }

  scheduleNextArpeggio() {
    if (!this.isPlaying || !this.ctx) return;
    const chord = this.chords[this.chordStep % this.chords.length];
    const now = this.ctx.currentTime;

    // Arpeggiate chord notes smoothly
    chord.forEach((freq, idx) => {
      this.playPluck(freq, now + idx * 0.45, 2.0);
    });

    this.chordStep++;
    this.timer = setTimeout(() => {
      this.scheduleNextArpeggio();
    }, 2400);
  }
}

const AudioEngine = new RomanticAudioEngine();

function updateAudioUI(playing) {
  const btn = document.getElementById("music-toggle-btn");
  if (!btn) return;
  if (playing) {
    btn.classList.add("playing", "active");
    btn.title = "Pause ambient music";
  } else {
    btn.classList.remove("playing", "active");
    btn.title = "Play romantic ambient music";
  }
}

// ==========================================================================
// 3. CANVAS PETALS & PARTICLES ANIMATION
// ==========================================================================
class PetalCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.petals = [];
    this.numPetals = window.innerWidth < 600 ? 25 : 45;
    this.mouseX = -1000;
    this.mouseY = -1000;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    for (let i = 0; i < this.numPetals; i++) {
      this.petals.push(this.createPetal(true));
    }

    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createPetal(randomY = false) {
    const isTwilight = document.body.classList.contains("theme-twilight");
    return {
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : -20,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 1.2 + 0.7,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() * 1.5 - 0.75) * 0.03,
      opacity: Math.random() * 0.5 + 0.35,
      color: isTwilight
        ? `rgba(244, 184, 198, ${Math.random() * 0.4 + 0.3})`
        : `rgba(226, 115, 138, ${Math.random() * 0.4 + 0.3})`,
      phase: Math.random() * Math.PI * 2
    };
  }

  burst(x, y, count = 25) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 6 + 2;
      this.petals.push({
        x: x,
        y: y,
        size: Math.random() * 14 + 10,
        speedX: Math.cos(angle) * velocity,
        speedY: Math.sin(angle) * velocity,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 0.9,
        color: `rgba(207, 85, 113, ${Math.random() * 0.4 + 0.6})`,
        decay: true
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.petals.length - 1; i >= 0; i--) {
      const p = this.petals[i];

      // Mouse deflection
      const dx = p.x - this.mouseX;
      const dy = p.y - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        p.x += (dx / dist) * force * 3;
        p.y += (dy / dist) * force * 3;
      }

      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.phase || 0) * 0.5;
      p.rotation += p.rotSpeed;
      if (p.phase) p.phase += 0.02;

      // Render delicate petal shape
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.fillStyle = p.color;

      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size);
      this.ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
      this.ctx.fill();
      this.ctx.restore();

      if (p.decay) {
        p.opacity -= 0.015;
        if (p.opacity <= 0) {
          this.petals.splice(i, 1);
          continue;
        }
      }

      if (p.y > this.canvas.height + 20) {
        this.petals[i] = this.createPetal(false);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

let petalEngine = null;

// ==========================================================================
// 4. LIVE LOVE COUNTER
// ==========================================================================
function updateLoveCounter() {
  const daysEl = document.getElementById("counter-days");
  const hoursEl = document.getElementById("counter-hours");
  const minutesEl = document.getElementById("counter-minutes");
  const secondsEl = document.getElementById("counter-seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const start = new Date(AppState.startDate).getTime();
  const now = new Date().getTime();
  const diff = Math.max(0, now - start);

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  daysEl.textContent = days.toLocaleString();
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

// ==========================================================================
// 5. INTERACTIVE LOVE JAR & REASONS
// ==========================================================================
let currentReasonIndex = 0;

function drawNextReason() {
  AudioEngine.playChime();
  const textEl = document.getElementById("drawn-reason-text");
  const numEl = document.getElementById("drawn-reason-num");
  const cardEl = document.getElementById("drawn-note-display");

  if (!textEl || !cardEl) return;

  const reason = AppState.reasons[currentReasonIndex % AppState.reasons.length];
  textEl.textContent = `"${reason}"`;
  numEl.textContent = `Reason #${(currentReasonIndex % AppState.reasons.length) + 1} of ${AppState.reasons.length}`;
  currentReasonIndex++;

  // Trigger burst around jar
  const jarRect = document.getElementById("love-jar").getBoundingClientRect();
  if (petalEngine) {
    petalEngine.burst(jarRect.left + jarRect.width / 2, jarRect.top + jarRect.height / 2, 16);
  }

  cardEl.classList.remove("popIn");
  void cardEl.offsetWidth; // trigger reflow
  cardEl.classList.add("popIn");
}

function renderReasonsGrid() {
  const container = document.getElementById("reasons-grid-list");
  if (!container) return;

  container.innerHTML = AppState.reasons.map((r, i) => `
    <div class="reason-flip-card">
      <div class="reason-card-num">Reason #${i + 1}</div>
      <div class="reason-card-text">"${r}"</div>
      <div class="reason-card-heart">♡</div>
    </div>
  `).join("");
}

// ==========================================================================
// 6. STARRY SKY CONSTELLATION CANVAS
// ==========================================================================
class StarConstellation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.stars = [];
    this.heartNodes = [];
    this.whispers = [
      "You are the brightest star in my universe, Harshita.",
      "Every constellation traces a path back to your smile.",
      "Wishing on shooting stars, I only ever ask for more years with you.",
      "Holding your hand under the moonlight is my definition of heaven.",
      "The universe took billions of years to create someone as special as you.",
      "Our love shines through the deepest night."
    ];
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());

    // Generate random background stars
    for (let i = 0; i < 70; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01
      });
    }

    // Heart-shaped constellation nodes
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    const scale = Math.min(cx, cy) * 0.055;
    for (let t = 0; t < Math.PI * 2; t += 0.35) {
      // Parametric heart formula
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      this.heartNodes.push({
        x: cx + hx * scale,
        y: cy + hy * scale,
        radius: 3,
        alpha: 0.9,
        baseX: cx + hx * scale,
        baseY: cy + hy * scale
      });
    }

    this.canvas.addEventListener("click", () => {
      AudioEngine.playChime();
      const whisperEl = document.getElementById("star-whisper");
      if (whisperEl) {
        const whisper = this.whispers[Math.floor(Math.random() * this.whispers.length)];
        whisperEl.textContent = `✨ "${whisper}"`;
      }
    });

    this.animate();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = 360;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw background twinkling stars
    for (const s of this.stars) {
      s.alpha += Math.sin(Date.now() * s.pulseSpeed) * 0.01;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 240, 245, ${Math.max(0.2, Math.min(1, s.alpha))})`;
      this.ctx.fill();
    }

    // Draw lines connecting heart nodes
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(244, 184, 198, 0.55)";
    this.ctx.lineWidth = 1.2;
    for (let i = 0; i < this.heartNodes.length; i++) {
      const curr = this.heartNodes[i];
      const next = this.heartNodes[(i + 1) % this.heartNodes.length];
      if (i === 0) this.ctx.moveTo(curr.x, curr.y);
      else this.ctx.lineTo(curr.x, curr.y);
    }
    this.ctx.closePath();
    this.ctx.stroke();

    // Draw glowing heart nodes
    for (const node of this.heartNodes) {
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "#fff5f7";
      this.ctx.shadowColor = "#f4b8c6";
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    requestAnimationFrame(() => this.animate());
  }
}

// ==========================================================================
// 7. ROMANTIC QUIZ ENGINE
// ==========================================================================
const QuizData = [
  {
    question: "What is my absolute favorite thing about you, Harshita?",
    options: [
      "Your radiant, contagious smile",
      "The kindness in your golden heart",
      "The way you look at me when you're happy",
      "All of the above, endlessly and without question!"
    ],
    correct: 3,
    reaction: "Bingo! There is no choosing — I adore every single millimeter of who you are."
  },
  {
    question: "Where is my absolute favorite place in the entire world?",
    options: [
      "A quiet tropical beach",
      "Anywhere, as long as your hand is in mine",
      "A fancy Paris rooftop café",
      "Cosy tucked under the duvet on a rainy day"
    ],
    correct: 1,
    reaction: "Spot on. Home isn't a coordinate on a map — home is wherever you are."
  },
  {
    question: "What happens to my heart whenever I see your name pop up?",
    options: [
      "It skips a beat every single time",
      "A goofy smile spreads across my face",
      "My whole day immediately gets 100x better",
      "All three at the exact same time!"
    ],
    correct: 3,
    reaction: "Guilty as charged. You turn every regular day into an unforgettable one."
  },
  {
    question: "How long am I planning on loving you, Harshita?",
    options: [
      "Until the stars stop shining",
      "Through every season and adventure ahead",
      "Forever and then a little bit more",
      "To infinity, beyond, and into eternity"
    ],
    correct: 2,
    reaction: "Forever isn't just a word to me — it's a promise stamped on my soul."
  }
];

let quizCurrentIndex = 0;

function renderQuizQuestion() {
  const q = QuizData[quizCurrentIndex];
  const questionEl = document.getElementById("quiz-question");
  const optionsEl = document.getElementById("quiz-options");
  const progressEl = document.getElementById("quiz-progress-text");
  const feedbackEl = document.getElementById("quiz-feedback");

  if (!questionEl || !optionsEl) return;

  feedbackEl.className = "quiz-feedback";
  feedbackEl.style.display = "none";
  progressEl.textContent = `Question ${quizCurrentIndex + 1} of ${QuizData.length}`;
  questionEl.textContent = q.question;

  optionsEl.innerHTML = q.options.map((opt, i) => `
    <button class="quiz-option-btn" data-index="${i}">
      <span>${opt}</span>
      <span class="opt-icon">♡</span>
    </button>
  `).join("");

  optionsEl.querySelectorAll(".quiz-option-btn").forEach(btn => {
    btn.addEventListener("click", () => handleQuizAnswer(parseInt(btn.dataset.index)));
  });
}

function handleQuizAnswer(selectedIndex) {
  const q = QuizData[quizCurrentIndex];
  const feedbackEl = document.getElementById("quiz-feedback");
  const optionBtns = document.querySelectorAll(".quiz-option-btn");

  optionBtns.forEach((b, idx) => {
    b.disabled = true;
    if (idx === q.correct) b.classList.add("correct");
    else if (idx === selectedIndex) b.classList.add("wrong");
  });

  AudioEngine.playChime();
  if (petalEngine) {
    petalEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 20);
  }

  feedbackEl.textContent = q.reaction;
  feedbackEl.classList.add("show");
  feedbackEl.style.display = "block";
  feedbackEl.style.background = "var(--soft-pink)";
  feedbackEl.style.color = "var(--ruby-accent)";

  setTimeout(() => {
    quizCurrentIndex = (quizCurrentIndex + 1) % QuizData.length;
    renderQuizQuestion();
  }, 2800);
}

// ==========================================================================
// 8. POLAROID GALLERY PHOTO UPLOAD & ZOOM
// ==========================================================================
function setupPhotoUpload() {
  const uploadInput = document.getElementById("photo-upload-input");
  if (!uploadInput) return;

  uploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const slot = document.querySelector(".polaroid-img.custom-slot");
      if (slot) {
        slot.src = dataUrl;
        try {
          localStorage.setItem("harshita_custom_photo", dataUrl);
        } catch (err) {
          console.warn("Storage quota exceeded", err);
        }
        AudioEngine.playChime();
      }
    };
    reader.readAsDataURL(file);
  });

  // Restore custom photo if previously uploaded
  const savedPhoto = localStorage.getItem("harshita_custom_photo");
  if (savedPhoto) {
    const slot = document.querySelector(".polaroid-img.custom-slot");
    if (slot) slot.src = savedPhoto;
  }
}

// ==========================================================================
// 9. MODALS & OPEN-WHEN LETTERS
// ==========================================================================
function openLetterModal(key) {
  AudioEngine.playPaperRustle();
  const letter = AppState.openWhenLetters[key];
  if (!letter) return;

  const modal = document.getElementById("letter-modal");
  const tagEl = document.getElementById("modal-letter-tag");
  const titleEl = document.getElementById("modal-letter-title");
  const bodyEl = document.getElementById("modal-letter-body");

  if (!modal || !tagEl || !titleEl || !bodyEl) return;

  tagEl.textContent = letter.tag;
  titleEl.textContent = letter.title;
  bodyEl.innerHTML = letter.content.split("\n\n").map(p => `<p style="margin-bottom: 16px;">${p.replace(/\n/g, '<br>')}</p>`).join("");

  modal.classList.add("open");
}

function closeModals() {
  document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("open"));
}

// ==========================================================================
// 10. FOREVER ACCEPTANCE & CERTIFICATE
// ==========================================================================
function triggerForeverAcceptance() {
  AudioEngine.playChime();
  if (petalEngine) {
    petalEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 45);
  }

  const certModal = document.getElementById("certificate-modal");
  const dateSpan = document.getElementById("cert-date-issued");
  if (dateSpan) {
    const today = new Date();
    dateSpan.textContent = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  if (certModal) {
    setTimeout(() => {
      certModal.classList.add("open");
    }, 400);
  }
}

// ==========================================================================
// 11. PERSONALIZATION / CUSTOMIZE MODAL
// ==========================================================================
function openCustomizeModal() {
  const modal = document.getElementById("customize-modal");
  if (!modal) return;
  document.getElementById("input-her-name").value = AppState.herName;
  document.getElementById("input-partner-name").value = AppState.partnerName;
  document.getElementById("input-start-date").value = AppState.startDate.split("T")[0];
  modal.classList.add("open");
}

function saveCustomization(e) {
  e.preventDefault();
  const herName = document.getElementById("input-her-name").value.trim() || "Harshita";
  const partnerName = document.getElementById("input-partner-name").value.trim() || "Yours Always";
  const startDateStr = document.getElementById("input-start-date").value;

  AppState.herName = herName;
  AppState.partnerName = partnerName;
  if (startDateStr) {
    AppState.startDate = `${startDateStr}T00:00:00`;
  }

  try {
    localStorage.setItem("harshita_love_config", JSON.stringify({
      herName: AppState.herName,
      partnerName: AppState.partnerName,
      startDate: AppState.startDate
    }));
  } catch (err) {
    console.warn("Storage error", err);
  }

  // Update DOM instances
  document.querySelectorAll(".dyn-her-name").forEach(el => el.textContent = herName);
  document.querySelectorAll(".dyn-partner-name").forEach(el => el.textContent = partnerName);

  updateLoveCounter();
  closeModals();
  AudioEngine.playChime();
}

// ==========================================================================
// 12. THEME TOGGLE (Daylight Petals / Candlelight Twilight)
// ==========================================================================
function toggleTheme() {
  const isTwilight = document.body.classList.toggle("theme-twilight");
  const themeBtn = document.getElementById("theme-toggle-btn");

  if (themeBtn) {
    themeBtn.innerHTML = isTwilight ? "☀️" : "🌙";
    themeBtn.title = isTwilight ? "Switch to Daylight Petals" : "Switch to Candlelight Twilight";
  }

  try {
    localStorage.setItem("harshita_theme", isTwilight ? "twilight" : "daylight");
  } catch (e) {}

  AudioEngine.playChime();
}

// ==========================================================================
// 13. DOM INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Petal Physics
  petalEngine = new PetalCanvas("ambient-canvas");

  // Restore Theme
  const savedTheme = localStorage.getItem("harshita_theme");
  if (savedTheme === "twilight") {
    document.body.classList.add("theme-twilight");
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) themeBtn.innerHTML = "☀️";
  }

  // Love Counter Loop
  updateLoveCounter();
  setInterval(updateLoveCounter, 1000);

  // Initialize Reasons
  renderReasonsGrid();

  // Initialize Quiz
  renderQuizQuestion();

  // Setup Photo Upload
  setupPhotoUpload();

  // Constellation
  new StarConstellation("constellation-canvas");

  // ------------------------------------------------------------------------
  // Event Listeners: Opening Ceremony Envelope
  // ------------------------------------------------------------------------
  const envelope = document.getElementById("opening-envelope");
  const overlay = document.getElementById("opening-overlay");
  if (envelope && overlay) {
    envelope.addEventListener("click", () => {
      envelope.classList.add("opened");
      AudioEngine.playPaperRustle();
      AudioEngine.playChime();

      if (petalEngine) {
        petalEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 40);
      }

      setTimeout(() => {
        overlay.classList.add("hidden");
        // Start romantic ambient background music smoothly
        AudioEngine.startMusic();
      }, 700);
    });
  }

  // Navigation Links & Buttons
  const musicBtn = document.getElementById("music-toggle-btn");
  if (musicBtn) {
    musicBtn.addEventListener("click", () => AudioEngine.toggleMusic());
  }

  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  const customizeBtn = document.getElementById("customize-btn");
  if (customizeBtn) {
    customizeBtn.addEventListener("click", openCustomizeModal);
  }

  const editDateBtn = document.getElementById("edit-date-btn");
  if (editDateBtn) {
    editDateBtn.addEventListener("click", openCustomizeModal);
  }

  const customForm = document.getElementById("customization-form");
  if (customForm) {
    customForm.addEventListener("submit", saveCustomization);
  }

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobile-nav-toggle");
  const navLinks = document.getElementById("nav-links");
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Love Jar Draw Button & Jar Click
  const drawBtn = document.getElementById("draw-reason-btn");
  const loveJar = document.getElementById("love-jar");
  if (drawBtn) drawBtn.addEventListener("click", drawNextReason);
  if (loveJar) loveJar.addEventListener("click", drawNextReason);

  // Reasons Tabs
  const tabJar = document.getElementById("tab-jar-view");
  const tabGrid = document.getElementById("tab-grid-view");
  const jarSection = document.getElementById("jar-display-wrapper");
  const gridSection = document.getElementById("reasons-grid-view");

  if (tabJar && tabGrid && jarSection && gridSection) {
    tabJar.addEventListener("click", () => {
      tabJar.classList.add("active");
      tabGrid.classList.remove("active");
      jarSection.style.display = "flex";
      gridSection.style.display = "none";
    });
    tabGrid.addEventListener("click", () => {
      tabGrid.classList.add("active");
      tabJar.classList.remove("active");
      jarSection.style.display = "none";
      gridSection.style.display = "grid";
    });
  }

  // Open-When Letter Triggers
  document.querySelectorAll("[data-open-letter]").forEach(card => {
    card.addEventListener("click", () => {
      const letterKey = card.getAttribute("data-open-letter");
      openLetterModal(letterKey);
    });
  });

  // Modal Close Buttons
  document.querySelectorAll(".modal-close-btn, .modal-backdrop").forEach(el => {
    el.addEventListener("click", (e) => {
      if (e.target === el || el.classList.contains("modal-close-btn")) {
        closeModals();
      }
    });
  });

  // Accept Forever Button
  const acceptForeverBtn = document.getElementById("accept-forever-btn");
  if (acceptForeverBtn) {
    acceptForeverBtn.addEventListener("click", triggerForeverAcceptance);
  }

  // Print Keepsake Certificate
  const printCertBtn = document.getElementById("print-cert-btn");
  if (printCertBtn) {
    printCertBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Romantic interaction chimes on love letter paragraphs
  document.querySelectorAll(".letter-body p").forEach(p => {
    p.addEventListener("click", () => {
      AudioEngine.playChime();
      if (petalEngine) {
        const rect = p.getBoundingClientRect();
        petalEngine.burst(rect.left + 50, rect.top + 20, 10);
      }
    });
  });
});

// Expose to window for inline onclick handlers and cross-browser module compatibility
window.AudioEngine = AudioEngine;
window.petalEngine = petalEngine;
window.triggerForeverAcceptance = triggerForeverAcceptance;
window.openCustomizeModal = openCustomizeModal;

