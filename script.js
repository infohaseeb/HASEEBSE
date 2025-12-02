// Initialize AOS Animation
AOS.init({
  duration: 1000,
  once: true,
});

// Typing Effect
const textElement = document.querySelector('.typing');
const words = ["Cloud Engineer", "DevOps Enthusiast", "Django Developer", "Azure Specialist"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    textElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(type, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 100 : 200);
  }
}
document.addEventListener('DOMContentLoaded', type);


// Navbar Active Link on Scroll
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-link');

function changeActive() {
  let index = sections.length;
  while (--index && window.scrollY + 120 < sections[index].offsetTop) { }
  navLinks.forEach((link) => link.classList.remove('active'));

  if (index >= 0) {
    const id = sections[index].id;
    const activeLink = document.querySelector(`.navbar .nav-link[href="#${id}"]`);
    if (activeLink) activeLink.classList.add('active');
  }
}

// Throttle function to limit the rate at which changeActive is called
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

window.addEventListener('scroll', throttle(changeActive, 100));


// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const alertBox = document.getElementById('formAlert');
  alertBox.style.display = 'block';
  alertBox.className = 'alert alert-success';
  alertBox.textContent = 'Message sent successfully! (Demo)';
  setTimeout(() => {
    alertBox.style.display = 'none';
    this.reset();
  }, 3000);
});

// Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();

// Dynamic Date
function updateDate() {
  const dateEl = document.getElementById('date');
  const now = new Date();
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString('en-US', options);
}
updateDate();

// Scroll Up Button
const scrollUp = document.getElementById('scrollUp');
if (scrollUp) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollUp.classList.add('show');
    } else {
      scrollUp.classList.remove('show');
    }
  });

  scrollUp.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =================== LIGHT / DARK MODE TOGGLE ===================
const body = document.body;
const toggleBtns = document.querySelectorAll('#themeToggle, #themeToggleFooter');

// Check local storage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
  body.classList.add('light-mode');
  toggleBtns.forEach(btn => {
    if (btn.id === 'themeToggle') {
      btn.textContent = '☀️';
    } else {
      btn.textContent = 'Switch Theme ☀️';
    }
  });
}

toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');

    // Update all buttons
    toggleBtns.forEach(b => {
      // Check if it's the icon-only button (desktop) or text button (mobile)
      if (b.id === 'themeToggle') {
        b.textContent = isLight ? '☀️' : '🌙';
      } else {
        b.textContent = isLight ? 'Switch Theme ☀️' : 'Switch Theme 🌙';
      }
    });

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
});

// Fetch country using GeoJS and show Language
const countryEl = document.getElementById("user-country");
if (countryEl) {
  fetch("https://get.geojs.io/v1/ip/country.json")
    .then(res => res.json())
    .then(data => {
      const country = data?.name || '';
      countryEl.textContent = country ? `Language: English (${country})` : "Language: English";
    })
    .catch(() => { countryEl.textContent = "Language: English"; });
}
