// 1. Set the current year in the footer
document.getElementById("year").textContent =
  new Date().getFullYear();

// 2. Reveal sections when they enter the viewport
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Stop observing after the section appears
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

// Apply the reveal animation to all matching elements
document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// 3. Add interactive 3D tilt to the profile card
const scene = document.getElementById("scene");
const card = document.getElementById("tilt-card");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const supportsMouse = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;

if (scene && card && supportsMouse && !reducedMotion) {
  scene.addEventListener("pointermove", (event) => {
    const bounds = scene.getBoundingClientRect();

    // Calculate mouse position relative to the scene
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    // Rotate the card according to mouse movement
    card.style.transform =
      `rotateY(${x * 24 - 5}deg) rotateX(${-y * 18 + 4}deg)`;
  });

  // Reset the card when the mouse leaves
  scene.addEventListener("pointerleave", () => {
    card.style.transform = "rotateY(-13deg) rotateX(7deg)";
  });
}

// 4. Highlight the selected navigation link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-links a").forEach((item) => {
      item.style.color = "";
    });

    link.style.color = "var(--accent)";
  });
});