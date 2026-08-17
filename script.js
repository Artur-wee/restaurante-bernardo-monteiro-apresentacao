const slides = [...document.querySelectorAll('.slide')];
const previousButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const counter = document.querySelector('.counter');
const progress = document.querySelector('.progress i');
let current = 0;

function showSlide(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === current);
    slide.classList.toggle('is-before', slideIndex < current);
    slide.setAttribute('aria-hidden', String(slideIndex !== current));
  });
  counter.textContent = String(current + 1).padStart(2, '0');
  progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  previousButton.disabled = current === 0;
  nextButton.disabled = current === slides.length - 1;
  document.title = `${slides[current].dataset.title} — Bernardo Monteiro × Prosperta`;
}

previousButton.addEventListener('click', () => showSlide(current - 1));
nextButton.addEventListener('click', () => showSlide(current + 1));
document.addEventListener('keydown', event => {
  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); showSlide(current + 1); }
  if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); showSlide(current - 1); }
  if (event.key === 'Home') showSlide(0);
  if (event.key === 'End') showSlide(slides.length - 1);
});

let touchStart = 0;
document.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
document.addEventListener('touchend', event => {
  const distance = event.changedTouches[0].clientX - touchStart;
  if (Math.abs(distance) > 55) showSlide(current + (distance < 0 ? 1 : -1));
}, { passive: true });

document.querySelector('.fullscreen').addEventListener('click', async () => {
  if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
  else await document.exitFullscreen?.();
});

showSlide(0);
