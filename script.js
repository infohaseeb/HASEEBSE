// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // collapse navbar on mobile after click
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bs = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
        bs.hide();
      }
    }
  });
});

// Active link switching on scroll (simple)
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.navbar .nav-link');

function changeActive() {
  let index = sections.length;
  while(--index && window.scrollY + 120 < sections[index].offsetTop) {}
  navLinks.forEach((link) => link.classList.remove('active'));
  const id = sections[index] ? sections[index].id : '';
  const activeLink = document.querySelector('.navbar .nav-link[href="#' + id + '"]');
  if (activeLink) activeLink.classList.add('active');
}
changeActive();
window.addEventListener('scroll', changeActive);




// Typing effect for hero text
const roles = [
  "Cloud & Software Engineer 💻",
  "Azure Cloud Specialist ☁️",
  "Django + PostgreSQL Developer 🔐",
  "DevOps & Automation Enthusiast ⚙️",
  "Operations Handling 💻"

];

let rIndex = 0;
let charIndex = 0;
let typingEl = document.querySelector(".typing");

function type() {
  if (charIndex < roles[rIndex].length) {
    typingEl.textContent += roles[rIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 70);
  } else {
    setTimeout(() => erase(), 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typingEl.textContent = roles[rIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    rIndex = (rIndex + 1) % roles.length;
    setTimeout(type, 300);
  }
}

type();



// Simple contact form feedback
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const alertBox = document.getElementById('formAlert');
  alertBox.style.display = 'block';
  alertBox.className = 'alert alert-success mt-2';
  alertBox.innerText = 'Thank you! Your message has been sent.';
  this.reset();
});



// Scroll to top when #scrollUp is clicked
document.getElementById('scrollUp').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show/hide up arrow on scroll
window.addEventListener('scroll', function() {
  const scrollUp = document.getElementById('scrollUp');
  if (window.scrollY > 300) { // show after scrolling down 300px
    scrollUp.style.display = 'block';
  } else {
    scrollUp.style.display = 'none';
  }
});





// =================== LIGHT / DARK MODE TOGGLE ===================
const toggleBtn = document.getElementById('themeToggle');
const body = document.body;

// Only run if button exists
if (toggleBtn) {
  // Load saved theme
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }

  // Toggle theme on click
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    toggleBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}


// Show date only
  function updateDate() {
    const now = new Date();
    const date = now.toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    const el = document.getElementById("date");
    if (el) el.textContent = date;
  }
  updateDate();
  setInterval(updateDate, 60000); // update every minute

  // Fetch country using GeoJS and show Language
  document.addEventListener('DOMContentLoaded', () => {
    fetch("https://get.geojs.io/v1/ip/country.json")
      .then(res => res.json())
      .then(data => {
        const country = data?.name || '';
        const el = document.getElementById("user-country");
        if (el) {
          el.textContent = country
            ? `Language: English (${country})`
            : "Language: English";
        }
      })
      .catch(() => {
        const el = document.getElementById("user-country");
        if (el) el.textContent = "Language: English";
      });
  });