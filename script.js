// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  navLinksContainer.classList.toggle('show');
  if (navLinksContainer.classList.contains('show')) {
    navLinksContainer.style.display = 'flex';
    navLinksContainer.style.flexDirection = 'column';
    navLinksContainer.style.position = 'absolute';
    navLinksContainer.style.top = '70px';
    navLinksContainer.style.left = '0';
    navLinksContainer.style.width = '100%';
    navLinksContainer.style.backgroundColor = 'var(--bg-glass)';
    navLinksContainer.style.backdropFilter = 'blur(10px)';
    navLinksContainer.style.padding = '1rem';
    navLinksContainer.style.gap = '1rem';
  } else {
    navLinksContainer.style.display = '';
  }
});

// Typing effect for code window
const typedNameElement = document.getElementById('typed-name');
if (typedNameElement) {
  const names = ['Protocol404', 'Dev', 'Creator', 'Problem Solver'];
  let nameIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeName() {
    const currentName = names[nameIndex];
    if (isDeleting) {
      typedNameElement.textContent = currentName.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedNameElement.textContent = currentName.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentName.length) {
      isDeleting = true;
      setTimeout(typeName, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      nameIndex = (nameIndex + 1) % names.length;
      setTimeout(typeName, 500);
    } else {
      setTimeout(typeName, isDeleting ? 100 : 200);
    }
  }
  
  typeName();
}

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const targetValue = parseInt(target.getAttribute('data-target'));
      let currentValue = 0;
      const increment = targetValue / 50;
      
      const updateCounter = () => {
        if (currentValue < targetValue) {
          currentValue += increment;
          target.textContent = Math.ceil(currentValue);
          requestAnimationFrame(updateCounter);
        } else {
          target.textContent = targetValue;
        }
      };
      
      updateCounter();
      observer.unobserve(target);
    }
  });
}, observerOptions);

statNumbers.forEach(stat => observer.observe(stat));

// Contact form submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  if (!name || !email || !message) {
    showMessage('Please fill in all fields', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showMessage('Please enter a valid email address', 'error');
    return;
  }
  
  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitButton.disabled = true;
  
  setTimeout(() => {
    showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
    submitButton.innerHTML = originalButtonText;
    submitButton.disabled = false;
  }, 1500);
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showMessage(msg, type) {
  formMessage.textContent = msg;
  formMessage.className = `form-message ${type}`;
  
  setTimeout(() => {
    formMessage.textContent = '';
    formMessage.className = 'form-message';
  }, 5000);
}

// Add some 3D tilt effect to project cards (optional)
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
});
