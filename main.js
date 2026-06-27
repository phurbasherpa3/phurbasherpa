document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initPageTransitions();
    initLightbox();
    initContactForm();
});

/* ==========================================
   NAVIGATION
   ========================================== */
function initNavigation() {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdown = document.querySelector('.nav-item.dropdown');

    // Scroll Navbar effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Handle Active Menu Links based on current URL path
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // Parent dropdown active highlight
        if (link.closest('.dropdown-menu')) {
            const parentDropdown = dropdown ? dropdown.querySelector('.dropdown-toggle') : null;
            if (parentDropdown && (currentPath === 'filmmaking.html' || currentPath === 'trekking.html')) {
                parentDropdown.classList.add('active');
            }
        }
    });
}

/* ==========================================
   PAGE TRANSITIONS
   ========================================== */
function initPageTransitions() {
    // Select all local links that are not external and don't launch lightboxes/actions
    const transitionLinks = document.querySelectorAll('a[href$=".html"]');
    const overlay = document.querySelector('.transition-overlay');

    if (!overlay) return;

    // Trigger initial page reveal
    setTimeout(() => {
        overlay.style.transformOrigin = 'bottom';
        overlay.classList.remove('active');
    }, 100);

    transitionLinks.forEach(link => {
        // Skip links that are meant to open in new tab
        if (link.getAttribute('target') === '_blank') return;
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.getAttribute('href');

            // Slide overlay up
            overlay.style.transformOrigin = 'top';
            overlay.classList.add('active');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500); // Must match transition duration in CSS
        });
    });
}

/* ==========================================
   LIGHTBOX / MEDIA VIEWPORTS
   ========================================== */
let lightboxItems = [];
let currentLightboxIndex = -1;

function initLightbox() {
    // Create and append Lightbox DOM if not present
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
            <button class="lightbox-nav prev" aria-label="Previous image">&#10094;</button>
            <div class="lightbox-content">
                <!-- Media injected here dynamically -->
            </div>
            <button class="lightbox-nav next" aria-label="Next image">&#10095;</button>
            <div class="lightbox-caption"></div>
        `;
        document.body.appendChild(lightbox);
    }

    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-nav.prev');
    const nextBtn = lightbox.querySelector('.lightbox-nav.next');
    const content = lightbox.querySelector('.lightbox-content');
    const caption = lightbox.querySelector('.lightbox-caption');

    // Scrape all elements with 'data-lightbox' on the page
    const elements = document.querySelectorAll('[data-lightbox]');
    lightboxItems = Array.from(elements);

    // Bind click handlers to target elements
    lightboxItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentLightboxIndex = index;
        const item = lightboxItems[index];
        const type = item.getAttribute('data-lightbox-type'); // 'image', 'video', or 'youtube'
        const src = item.getAttribute('data-lightbox-src') || item.getAttribute('href') || item.getAttribute('src');
        const itemCaption = item.getAttribute('data-lightbox-caption') || '';

        content.innerHTML = '';
        caption.textContent = itemCaption;

        if (type === 'image') {
            const img = document.createElement('img');
            img.src = src;
            img.alt = itemCaption;
            content.appendChild(img);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            video.playsInline = true;
            content.appendChild(video);
        } else if (type === 'youtube') {
            const iframe = document.createElement('iframe');
            // Extract youtube ID to build clean embed link
            const videoId = extractYouTubeId(src);
            if (videoId) {
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            } else {
                iframe.src = src;
            }
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;
            content.appendChild(iframe);
        }

        // Show/hide navigation arrows based on pool size
        if (lightboxItems.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }

        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
        // Stop any media by clearing content
        setTimeout(() => {
            content.innerHTML = '';
        }, 300);
    }

    function showNext() {
        if (lightboxItems.length <= 1) return;
        let nextIndex = currentLightboxIndex + 1;
        if (nextIndex >= lightboxItems.length) {
            nextIndex = 0;
        }
        openLightbox(nextIndex);
    }

    function showPrev() {
        if (lightboxItems.length <= 1) return;
        let prevIndex = currentLightboxIndex - 1;
        if (prevIndex < 0) {
            prevIndex = lightboxItems.length - 1;
        }
        openLightbox(prevIndex);
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close on overlay clicking
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Arrow navigation
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    // Keyboard bindings
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNext();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        }
    });
}

function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

/* ==========================================
   CONTACT FORM / WHATSAPP REDIRECT
   ========================================== */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get fields
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill out all required fields.');
            return;
        }

        // Phurba's phone number
        const phoneNumber = '9779803716195'; // Country code included (Nepal +977)

        // Format message
        const textMessage = `🏔️ *Website Inquiry - Phurba Sherpa* 🏔️\n\n` + 
                            `*Name:* ${name}\n` +
                            `*Email:* ${email}\n` +
                            `*Subject:* ${subject || 'General Inquiry'}\n\n` +
                            `*Message:*\n${message}`;

        // Create encoded WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textMessage)}`;

        // Open in new window
        window.open(whatsappUrl, '_blank');

        // Optional: clear form
        contactForm.reset();

        // Reset floating labels
        document.querySelectorAll('.form-input').forEach(input => {
            input.dispatchEvent(new Event('input')); // clears label state
        });
    });
}
