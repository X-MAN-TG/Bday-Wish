/* ========================================================
   Birthday Page — script.js
   DEV: Cipher X  |  Made in love for Shriuu ❤️
   Date: 3rd April 2026
   ======================================================== */

/* ── TAB SWITCHING ───────────────────────────────────── */
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card    = btn.closest('.card');
      const target  = btn.dataset.tab;

      card.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      card.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      card.querySelector(`[data-content="${target}"]`).classList.add('active');
    });
  });
}

/* ── COPY CODE ───────────────────────────────────────── */
function initCopy() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card    = btn.closest('.card');
      const codeEl  = card.querySelector('.code-block pre');
      const raw     = codeEl ? codeEl.innerText : '';

      navigator.clipboard.writeText(raw).then(() => {
        btn.textContent = '✓ copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = '⎘ copy code';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });
}

/* ── PARTICLE HEARTS ─────────────────────────────────── */
const canvas  = document.getElementById('particle-canvas');
const ctx     = canvas.getContext('2d');
let particles = [];
let W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

const EMOJIS = ['❤️','💕','💗','💖','✨','🌸','💫','🩷'];

class Particle {
  constructor() { this.reset(true); }

  reset(init = false) {
    this.x     = Math.random() * W;
    this.y     = init ? Math.random() * H : H + 20;
    this.size  = 10 + Math.random() * 16;
    this.speed = 0.35 + Math.random() * 0.55;
    this.drift = (Math.random() - 0.5) * 0.5;
    this.alpha = 0.08 + Math.random() * 0.18;
    this.rot   = Math.random() * Math.PI * 2;
    this.rotV  = (Math.random() - 0.5) * 0.015;
    this.emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  }

  update() {
    this.y   -= this.speed;
    this.x   += this.drift;
    this.rot += this.rotV;
    if (this.y < -30) this.reset();
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.font = `${this.size}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.emoji, 0, 0);
    ctx.restore();
  }
}

function initParticles(count = 28) {
  particles = Array.from({ length: count }, () => new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

/* ── STAGGER CARD ANIMATIONS ─────────────────────────── */
function staggerCards() {
  const cards = document.querySelectorAll('.card, .section-label, .hero');
  cards.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.12}s`;
  });
}

/* ── SPARKLE ON CLICK ────────────────────────────────── */
function spawnSparkle(x, y) {
  const el = document.createElement('div');
  el.textContent = EMOJIS[Math.floor(Math.random() * 4)];
  el.style.cssText = `
    position: fixed;
    left: ${x}px; top: ${y}px;
    font-size: ${12 + Math.random() * 16}px;
    pointer-events: none;
    z-index: 9999;
    animation: sparkleOut 0.8s ease forwards;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 800);
}

// inject sparkleOut keyframes once
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
  @keyframes sparkleOut {
    0%   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%,-120%) scale(0.4); }
  }
`;
document.head.appendChild(sparkleStyle);

document.addEventListener('click', e => spawnSparkle(e.clientX, e.clientY));

/* ── INIT ────────────────────────────────────────────── */
window.addEventListener('resize', () => { resize(); });

document.addEventListener('DOMContentLoaded', () => {
  resize();
  initParticles();
  animateParticles();
  initTabs();
  initCopy();
  staggerCards();
});
