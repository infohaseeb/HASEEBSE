// Set current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

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
  if (!typingEl) return; // skip if no typing element
  if (charIndex < roles[rIndex].length) {
    typingEl.textContent += roles[rIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 70);
  } else {
    setTimeout(() => erase(), 1500);
  }
}

function erase() {
  if (!typingEl) return;
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
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const alertBox = document.getElementById('formAlert');
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.className = 'alert alert-success mt-2';
      alertBox.innerText = 'Thank you! Your message has been sent.';
    }
    this.reset();
  });
}

// Scroll to top when #scrollUp is clicked
const scrollUp = document.getElementById('scrollUp');
if (scrollUp) {
  scrollUp.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Show/hide up arrow on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) scrollUp.style.display = 'block';
    else scrollUp.style.display = 'none';
  });
}

// =================== LIGHT / DARK MODE TOGGLE ===================
const body = document.body;
const toggleBtn = document.getElementById('themeToggle');
if (toggleBtn) {
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    toggleBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}
// Move theme toggle on mobile if parent is hidden
if (toggleBtn) {
  const originalParent = toggleBtn.parentElement; // current parent
  const container = document.querySelector('.container'); // safe place to append on mobile

  function moveToggle() {
    if (window.innerWidth < 992) {
      // append to container if not already there
      if (!container.contains(toggleBtn)) {
        container.appendChild(toggleBtn);
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.top = '10px';
        toggleBtn.style.right = '10px';
        toggleBtn.style.zIndex = 1050;
      }
    } else {
      // move back to original parent on desktop
      if (!originalParent.contains(toggleBtn)) {
        originalParent.appendChild(toggleBtn);
        toggleBtn.style.position = '';
        toggleBtn.style.top = '';
        toggleBtn.style.right = '';
      }
    }
  }

  window.addEventListener('resize', moveToggle);
  moveToggle(); // run on page load
}



// Show date only
const dateEl = document.getElementById("date");
if (dateEl) {
  function updateDate() {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString([], { weekday:'short', year:'numeric', month:'short', day:'numeric' });
  }
  updateDate();
  setInterval(updateDate, 60000);
}

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

