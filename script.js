/* script.js
   - Dark/Light mode toggle (persist with localStorage)
   - IntersectionObserver to reveal cards with staggered animation
   - Small UI helpers
*/

document.addEventListener('DOMContentLoaded', () => {
  // MODE TOGGLE
  const body = document.body;
  const modeToggleEls = document.querySelectorAll('.mode-toggle');

  // initialize from localStorage
  const saved = localStorage.getItem('site-mode');
  if (saved === 'light') body.classList.add('light-mode');

  modeToggleEls.forEach(btn => {
    btn.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const mode = body.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem('site-mode', mode);
    });
  });

  // Reveal cards on scroll with IntersectionObserver
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // small stagger: delay via transition + setTimeout for slight cascading
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach((c, i) => {
    // apply small stagger delay (CSS handled by inline style)
    c.style.transition = `transform .45s cubic-bezier(.2,.9,.3,1) ${i * 60}ms, opacity .45s ${i * 60}ms`;
    observer.observe(c);
  });

  // subtle parallax mouse effect on hero shapes (non-essential)
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      hero.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      // reset transform after short time
      clearTimeout(hero._t);
      hero._t = setTimeout(()=> hero.style.transform = '', 80);
    });
  }
});
