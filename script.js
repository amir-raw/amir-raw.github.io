// Particle effect
const canvas = document.createElement('canvas');
canvas.id = 'starfield';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let width, height;
const particles = [];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function createParticle() {
  const colors = ['#00d4ff', '#b0b0ff', '#ffffff']; // Neon blue, purple, white
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 3 + 1, // Random size between 1 and 4
    speedX: (Math.random() - 0.5) * 2, // Random X velocity (-1 to 1)
    speedY: (Math.random() - 0.5) * 2, // Random Pragmatic Play Random Y velocity (-1 to 1)
    color: colors[Math.floor(Math.random() * colors.length)], // Random color
    life: Math.random() * 100 + 50 // Particle lifespan (50-150 frames)
  };
}

function initParticles() {
  particles.length = 0;
  for (let i = 0; i < 150; i++) {
    particles.push(createParticle());
  }
}

function updateParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.life--;
    if (p.life <= 0) {
      const index = particles.indexOf(p);
      particles[index] = createParticle();
    }
  });
}

function drawParticles() {
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, width, height);
  particles.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0.3, p.life / 100); // Fade out effect
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

resizeCanvas();
initParticles();
drawParticles();

// Smooth scrolling for nav links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
  });
});

// Fade-in sections on scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach(section => {
  observer.observe(section);
});
