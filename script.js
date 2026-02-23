// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const status = document.getElementById('form-status');
    status.textContent = 'Thank you! Your message has been sent. We will get back to you soon.';
    status.className = 'form-status success';

    contactForm.reset();

    setTimeout(() => {
      status.className = 'form-status';
    }, 5000);
  });
}

// FAQ accordion – only one open at a time
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const currentItem = button.parentElement;
    const isActive = currentItem.classList.contains('active');

    // Close all items
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
      item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Open clicked item if it wasn't already open
    if (!isActive) {
      currentItem.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

// Testimonials carousel
const carousel = document.querySelector('.testimonial-carousel');
if (carousel) {
  const cards = carousel.querySelectorAll('.testimonial-card');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  let currentSlide = 0;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    cards[currentSlide].classList.remove('active');
    dotsContainer.children[currentSlide].classList.remove('active');
    currentSlide = (index + cards.length) % cards.length;
    cards[currentSlide].classList.add('active');
    dotsContainer.children[currentSlide].classList.add('active');
  }

  // Show first slide
  cards[0].classList.add('active');

  prevBtn.addEventListener('click', () => goTo(currentSlide - 1));
  nextBtn.addEventListener('click', () => goTo(currentSlide + 1));
}

// Highlight active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});
