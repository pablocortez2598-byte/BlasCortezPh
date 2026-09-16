/**
 * AURA LENS - PORTAFOLIO FOTOGRÁFICO
 * Interactividad: Galería filtrable, Lightbox con EXIF, Slider Antes/Después, Cotizador y Contacto.
 */

// Base de datos de fotografías para galería y lightbox
const galleryData = [
  {
    id: 1,
    category: 'naturaleza',
    title: 'Esfera Botánica en Macro',
    categoryName: 'Macro & Naturaleza',
    src: 'img/foto3.jpg',
    wide: false,
    camera: 'Nikon Digital',
    lens: 'Macro Prime',
    aperture: 'f/2.8',
    shutter: '1/500s',
    iso: 'ISO 100',
    location: 'Estudio & Jardín',
    story: 'Enfoque selectivo milimétrico capturando la geometría natural y las delicadas texturas de la flor.'
  },
  {
    id: 2,
    category: 'nocturna',
    title: 'Cráteres Lunares en Alta Definición',
    categoryName: 'Astrofotografía',
    src: 'img/luna.jpg',
    wide: false,
    camera: 'Nikon Digital',
    lens: 'Teleobjetivo 300mm',
    aperture: 'f/8.0',
    shutter: '1/250s',
    iso: 'ISO 100',
    location: 'Cielo Nocturno',
    story: 'Captura telescópica nítida de la superficie lunar resaltando mares y relieves de cráteres.'
  },
  {
    id: 3,
    category: 'naturaleza',
    title: 'Luz Filtrada en el Follaje',
    categoryName: 'Naturaleza & Contraluz',
    src: 'img/foto4.jpg',
    wide: true,
    camera: 'Nikon Digital',
    lens: '50mm Prime',
    aperture: 'f/2.8',
    shutter: '1/320s',
    iso: 'ISO 200',
    location: 'Bosque / Naturaleza',
    story: 'Juego de luces doradas y sombras naturales realzando los tonos esmeralda de las ramas.'
  },
  {
    id: 4,
    category: 'documental',
    title: 'Costumbres & Tradición',
    categoryName: 'Documental & Blanco y Negro',
    src: 'img/foto6.jpg',
    wide: false,
    camera: 'Nikon Digital',
    lens: '35mm Prime',
    aperture: 'f/2.0',
    shutter: '1/400s',
    iso: 'ISO 400',
    location: 'Tradición Local',
    story: 'Fotografía en blanco y negro con textura cinematográfica y grano orgánico rindiendo homenaje a las raíces.'
  },
  {
    id: 5,
    category: 'naturaleza',
    title: 'Cielo Iridiscente al Atardecer',
    categoryName: 'Paisaje & Colorimetría',
    src: 'img/foto5.jpg',
    wide: false,
    camera: 'Nikon Digital',
    lens: '24mm Wide',
    aperture: 'f/8.0',
    shutter: '1/160s',
    iso: 'ISO 100',
    location: 'Horizonte Abierto',
    story: 'Siluetas de ramas desnudas en contraste con un fascinante degradado de colores en las nubes.'
  },
  {
    id: 6,
    category: 'nocturna',
    title: 'Sendero de Luces en la Oscuridad',
    categoryName: 'Fotografía Nocturna',
    src: 'img/foto1.jpg',
    wide: false,
    camera: 'Nikon Digital',
    lens: '50mm f/1.8',
    aperture: 'f/1.8',
    shutter: '1/50s',
    iso: 'ISO 1600',
    location: 'Ruta Nocturna',
    story: 'Composición en clave baja jugando con puntos de luz y destellos vehiculares en la penumbra.'
  },
  {
    id: 7,
    category: 'documental',
    title: 'Broches & Texturas del Tiempo',
    categoryName: 'Macro & Cotidiano',
    src: 'img/foto2.jpg',
    wide: false,
    camera: 'Nikon Digital',
    lens: 'Macro 60mm',
    aperture: 'f/3.5',
    shutter: '1/250s',
    iso: 'ISO 100',
    location: 'Patio & Hogar',
    story: 'Detalle de madera desgastada y pátina verde sobre fondo neutro, encontrando belleza en lo simple.'
  },
  {
    id: 8,
    category: 'autor',
    title: 'Detrás del Lente — Blas Cortez',
    categoryName: 'Retrato de Autor',
    src: 'img/perfil.jpg',
    wide: true,
    camera: 'Nikon Digital',
    lens: '35mm Prime',
    aperture: 'f/2.8',
    shutter: '1/200s',
    iso: 'ISO 200',
    location: 'Estudio Personal',
    story: 'Retrato personal en blanco y negro con cámara en mano, capturando la pasión y la cercanía detrás de cada toma.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initGallery();
  initLightbox();
  initComparisonSlider();
  initContactForm();
});

/* ==========================================================================
   1. NAVBAR & TOP DROPDOWN NAVIGATION
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.getElementById('mobileNavToggle');
  const dropdown = document.getElementById('mobileNavDropdown');
  const backdrop = document.getElementById('navBackdrop');
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .mobile-cta-btn');

  // Header scroll appearance
  function handleScrollHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else if (!dropdown || !dropdown.classList.contains('is-open')) {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // Open / Close Dropdown Menu
  function openMenu() {
    if (!dropdown || !toggleBtn) return;
    dropdown.classList.add('is-open');
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    dropdown.setAttribute('aria-hidden', 'false');
    header.classList.add('has-menu-open');
    if (backdrop) backdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!dropdown || !toggleBtn) return;
    dropdown.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');
    header.classList.remove('has-menu-open');
    if (backdrop) backdrop.classList.remove('is-active');
    document.body.style.overflow = '';
    handleScrollHeader();
  }

  function toggleMenu() {
    if (!dropdown) return;
    const isOpen = dropdown.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Close on navigation link click & smooth scroll with header offset
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          e.preventDefault();
          closeMenu();

          const headerOffset = 70;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdown && dropdown.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Reset when resizing to desktop viewport
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && dropdown && dropdown.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Active section observer on scroll (syncs desktop and mobile nav links)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      
      const desktopLink = document.querySelector(`.desktop-nav .nav-link[href*="${sectionId}"]`);
      const mobileLink = document.querySelector(`.mobile-nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (desktopLink) desktopLink.classList.add('active');
        if (mobileLink) mobileLink.classList.add('active');
      } else {
        if (desktopLink) desktopLink.classList.remove('active');
        if (mobileLink) mobileLink.classList.remove('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   2. GALLERY & FILTERS
   ========================================================================== */
let activeCategory = 'all';
let currentFilteredList = [...galleryData];

function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  renderGallery(galleryData);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      activeCategory = filter;

      if (filter === 'all') {
        currentFilteredList = [...galleryData];
      } else {
        currentFilteredList = galleryData.filter(item => item.category === filter);
      }

      renderGallery(currentFilteredList);
    });
  });
}

function renderGallery(items) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = items.map((item, index) => `
    <div class="gallery-card ${item.wide ? 'wide' : ''}" data-id="${item.id}" onclick="openLightboxById(${item.id})">
      <div class="gallery-img-wrapper">
        <img 
          src="${item.src}" 
          alt="${item.title}" 
          class="gallery-img" 
          loading="lazy"
        >
        <div class="gallery-card-overlay">
          <span class="gallery-tag">${item.categoryName}</span>
          <h4 class="gallery-card-title">${item.title}</h4>
          <div class="gallery-exif">
            <span><i class="fa-solid fa-camera"></i> ${item.camera}</span>
            <span><i class="fa-solid fa-sliders"></i> ${item.aperture} • ${item.shutter}</span>
          </div>
        </div>
        <div class="gallery-expand-btn">
          <i class="fa-solid fa-expand"></i>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   3. LIGHTBOX MODAL
   ========================================================================== */
let currentLightboxIndex = 0;

function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateLightbox(1));
  }

  // Close when clicking outside image
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('lightbox-container') || e.target.classList.contains('lightbox-main-view')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightboxById(id) {
  const index = currentFilteredList.findIndex(item => item.id === id);
  if (index !== -1) {
    currentLightboxIndex = index;
    updateLightboxContent();
    const modal = document.getElementById('lightboxModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + currentFilteredList.length) % currentFilteredList.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = currentFilteredList[currentLightboxIndex];
  if (!item) return;

  const imgEl = document.getElementById('lightboxImage');
  const counterEl = document.getElementById('lightboxCounter');
  const titleEl = document.getElementById('lightboxTitle');
  const catEl = document.getElementById('lightboxCategory');
  const specsEl = document.getElementById('lightboxSpecs');

  if (imgEl) {
    imgEl.src = item.src;
    imgEl.alt = item.title;
  }

  if (counterEl) {
    counterEl.textContent = `${currentLightboxIndex + 1} / ${currentFilteredList.length}`;
  }

  if (titleEl) titleEl.textContent = item.title;
  if (catEl) catEl.textContent = `${item.categoryName} • ${item.location}`;
  if (specsEl) {
    specsEl.innerHTML = `
      <span><i class="fa-solid fa-camera"></i> ${item.camera}</span>
      <span><i class="fa-solid fa-circle-dot"></i> ${item.lens}</span>
      <span><i class="fa-solid fa-bolt"></i> ${item.aperture} • ${item.shutter} • ${item.iso}</span>
    `;
  }
}

/* ==========================================================================
   4. BEFORE / AFTER COMPARISON SLIDER
   ========================================================================== */
function initComparisonSlider() {
  const container = document.getElementById('comparisonContainer');
  const afterWrapper = document.getElementById('comparisonAfterWrapper');
  const handle = document.getElementById('comparisonHandle');

  if (!container || !afterWrapper || !handle) return;

  let isDragging = false;

  function setSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    let posX = x - rect.left;
    if (posX < 0) posX = 0;
    if (posX > rect.width) posX = rect.width;

    const percentage = (posX / rect.width) * 100;
    afterWrapper.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  // Touch support for mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    setSliderPosition(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.touches[0].clientX);
  });
}

/* ==========================================================================
   5. CONTACT FORM & NOTIFICATIONS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();

    if (!name || !email) {
      showToast('⚠️ Por favor completa los campos requeridos.');
      return;
    }

    // Simulate sending message
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Mensaje Enviado!';
      showToast('🎉 ¡Gracias! Tu mensaje ha sido recibido. Te responderé en menos de 24h.');
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }, 1200);
  });
}

function showToast(message) {
  let toast = document.getElementById('toastAlert');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastAlert';
    toast.className = 'toast-alert';
    document.body.appendChild(toast);
  }

  toast.innerHTML = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
