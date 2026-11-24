/* THE ART OF US — ambient motion and progressive reveal layer */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Soft floating dust: a single, non-interactive layer with transform/opacity only.
  if (!reduceMotion) {
    const dust = document.createElement("div");
    dust.className = "ambient-dust";
    dust.setAttribute("aria-hidden", "true");
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 26; i++) {
      const particle = document.createElement("span");
      particle.className = "dust-particle";
      particle.style.setProperty("--x", `${(i * 37) % 100}%`);
      particle.style.setProperty("--delay", `${(i % 9) * -1.7}s`);
      particle.style.setProperty("--duration", `${15 + (i % 8) * 2}s`);
      particle.style.setProperty("--drift", `${((i % 5) - 2) * 24}px`);
      particle.style.setProperty("--size", `${2 + (i % 3)}px`);
      fragment.append(particle);
    }
    dust.append(fragment);
    document.body.prepend(dust);
  }

  const revealTargets = [
    ".chapter-intro > *", ".chapter-tabs", ".chapter-card",
    ".archive-heading > *", ".polaroid", ".archive-footnote",
    ".letter-intro > *", ".letter-stage", ".wishes-heading > *",
    ".cake-area", ".wish-panel", ".site-footer > *"
  ].join(",");
  const revealItems = [...document.querySelectorAll(revealTargets)];
  revealItems.forEach((item, index) => {
    item.classList.add("motion-reveal");
    if (item.matches(".polaroid")) item.style.setProperty("--reveal-delay", `${(index % 4) * 95}ms`);
    else item.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 65}ms`);
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(item => item.classList.add("is-revealed"));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });
    revealItems.forEach(item => observer.observe(item));
  }

  // Hero entrance is staggered, while the photo frame floats subtly.
  if (!reduceMotion) {
    document.querySelectorAll(".hero-copy > *, .hero-visual, .hero-visual > .visual-index, .hero-visual > .visual-footer, .hero-visual > .orbit-note").forEach((item, index) => {
      item.classList.add("hero-stagger");
      item.style.setProperty("--hero-delay", `${index * 115}ms`);
    });
  }

  // Only decorative hover lift; the clicked flip state remains owned by script.js.
  if (finePointer) {
    document.querySelectorAll(".polaroid").forEach(card => {
      card.addEventListener("pointerenter", () => card.classList.add("is-hovered"));
      card.addEventListener("pointerleave", () => card.classList.remove("is-hovered"));
    });
  }
})();
