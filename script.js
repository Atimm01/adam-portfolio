function playSound() {
  const audio = new Audio('media/intro.mp3');
  audio.volume = 0.8;
  audio.play().catch(err => {
    console.warn("Intro sound blocked until user interacts:", err);
  });
}

function animateTagline() {
  const tagline = document.querySelector(".tagline");
  if (tagline) {
    tagline.style.opacity = 0;
    tagline.classList.add("typing-effect"); // Add animation class
    setTimeout(() => {
      tagline.style.transition = "opacity 1s ease-in-out";
      tagline.style.opacity = 1;
    }, 600);
  }
}

function setupThemeToggle() {
  const toggleBtn = document.getElementById("toggleTheme");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      document.body.classList.add("transitioning");
      setTimeout(() => {
        document.body.classList.remove("transitioning");
      }, 600);
    });
  }
}

function handleLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
    }, 2000);
  }
}

function highlightActiveNav() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

function revealOnScroll() {
  const faders = document.querySelectorAll(".project-card, .skill-tag, .section h2");

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(el => {
    appearOnScroll.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  playSound();
  animateTagline();
  setupThemeToggle();
  handleLoadingScreen();
  highlightActiveNav();
  revealOnScroll();
});