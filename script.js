// Toggle Mobile Menu
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("active");
}

// Intersection Observer for Scroll Reveals
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .counter",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.classList.contains("counter")) {
          startCounter(entry.target);
        }
      }
    });
  },
  { threshold: 0.1 },
);

revealElements.forEach((el) => observer.observe(el));

// Counter Logic
function startCounter(el) {
  if (el.classList.contains("counted")) return;
  el.classList.add("counted");

  const target = parseInt(el.dataset.target);
  let count = 0;
  const duration = 2000; // Total time 2 seconds
  const frameRate = 1000 / 60; // 60fps
  const totalFrames = duration / frameRate;
  const increment = target / totalFrames;

  const updateCount = () => {
    count += increment;
    if (count < target) {
      el.innerText =
        Math.floor(count).toLocaleString() + (target > 100 ? "+" : "");
      requestAnimationFrame(updateCount);
    } else {
      el.innerText = target.toLocaleString() + (target > 100 ? "+" : "");
    }
  };
  requestAnimationFrame(updateCount);
}

// Stagger effect for containers
document.querySelectorAll(".stagger-container").forEach((container) => {
  Array.from(container.children).forEach((child, i) => {
    const target = child.querySelector(".reveal") || child;
    if (target) {
      target.style.transitionDelay = `${i * 0.15}s`;
    }
  });
});

// Close sidebar when clicking a link
document.querySelectorAll(".sidebar a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.remove("active");
  });
});
