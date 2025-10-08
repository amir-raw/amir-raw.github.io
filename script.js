// Starfield animation
const canvas = document.createElement('canvas');
canvas.id = 'starfield';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let width, height;
const stars = [];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function createStar() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2,
    speed: Math.random() * 0.5 + 0.1
  };
}

function initStars() {
  stars.length = 0;
  for (let i = 0; i < 100; i++) {
    stars.push(createStar());
  }
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > height) star.y = 0;
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initStars();
});

resizeCanvas();
initStars();
drawStars();

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
