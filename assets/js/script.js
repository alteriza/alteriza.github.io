<script>
function initFadeUp() {
  const fadeElements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => observer.observe(el));
}
function initParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particle';
  document.body.appendChild(particleContainer);
  const particleCount = 40;
  for (let i = 0; i < particleCount; i++) {
    const span = document.createElement('span');
    const size = Math.random() * 6 + 2;
    span.style.width = size + 'px';
    span.style.height = size + 'px';
    span.style.left = Math.random() * 100 + '%';
    span.style.animationDuration = Math.random() * 8 + 4 + 's';
    span.style.animationDelay = Math.random() * 10 + 's';
    span.style.opacity = Math.random() * 0.5;
    particleContainer.appendChild(span);
  }
}
function initBackToTop() {
  const btn = document.createElement('div');
  btn.id = 'back-to-top';
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
function initCardTilt() {
  const cards = document.querySelectorAll('.thread-card, .search-item, .post-preview');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;
      card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}
function initTypingEffect() {
  const titleElement = document.querySelector('.site-header h1 a');
  if (!titleElement) return;
  const originalText = titleElement.innerText;
  titleElement.style.opacity = '0';
  let i = 0;
  function type() {
    if (i <= originalText.length) {
      titleElement.innerText = originalText.substring(0, i);
      titleElement.style.opacity = '1';
      i++;
      setTimeout(type, 100);
    } else {
      titleElement.style.borderRight = 'none';
    }
  }
  type();
}
document.addEventListener('DOMContentLoaded', () => {
  initFadeUp();
  initParticles();
  initBackToTop();
  initCardTilt();
});
  </script>
