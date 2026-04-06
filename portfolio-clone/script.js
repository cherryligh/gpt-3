const sidebar = document.getElementById('sidebar');
const menuOpen = document.getElementById('menuOpen');
const menuClose = document.getElementById('menuClose');
const backToTop = document.getElementById('backToTop');

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryImages = Array.from(document.querySelectorAll('.module-image img'));

let currentIndex = 0;

menuOpen?.addEventListener('click', () => {
  sidebar.classList.add('open');
});

menuClose?.addEventListener('click', () => {
  sidebar.classList.remove('open');
});

window.addEventListener('scroll', () => {
  const shouldShow = window.scrollY > 360;
  backToTop.style.display = shouldShow ? 'block' : 'none';
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function openLightbox(index) {
  currentIndex = index;
  lightboxImage.src = galleryImages[currentIndex].src;
  lightbox.classList.remove('hidden');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showImage(step) {
  currentIndex = (currentIndex + step + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentIndex].src;
}

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => showImage(-1));
lightboxNext.addEventListener('click', () => showImage(1));

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (lightbox.classList.contains('hidden')) {
    return;
  }

  if (event.key === 'Escape') {
    closeLightbox();
  }

  if (event.key === 'ArrowLeft') {
    showImage(-1);
  }

  if (event.key === 'ArrowRight') {
    showImage(1);
  }
});
