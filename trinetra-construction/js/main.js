/* ========================================
   PREMIUM JAVASCRIPT INTERACTIONS
   TRI NETRA CONSTRUCTION WEBSITE
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeScrollAnimations();
    initializeCounters();
    initializeFormHandler();
    initializeHamburger();
});

/* ===== NAVBAR FUNCTIONALITY ===== */
function initializeNavbar() {
    const navbar = document.querySelector('.premium-navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Glass blur effect on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.6)';
            navbar.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.05)';
        }
    });

    // Smooth navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/* ===== HAMBURGER MENU ===== */
function initializeHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

/* ===== SCROLL ANIMATIONS ===== */
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    document.querySelectorAll('.vision-card, .service-card, .benefit-card, .project-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

/* ===== ANIMATED COUNTERS ===== */
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Speed of counting

    const countUp = (el) => {
        const target = parseInt(el.getAttribute('data-count'));
        const increment = target / speed;
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                el.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target + '+';
            }
        };

        updateCount();
    };

    // Start counting when visible
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                countUp(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

/* ===== FORM HANDLER ===== */
function initializeFormHandler() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const phone = form.querySelector('input[type="tel"]').value;
            const message = form.querySelector('textarea').value;
            
            // Validate
            if (!name || !email || !phone || !message) {
                showNotification('Please fill all fields', 'error');
                return;
            }
            
            // Simulate sending
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll contact you soon.', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

/* ===== NOTIFICATION SYSTEM ===== */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1.5rem 2rem;
        background: ${type === 'success' ? '#25d366' : '#ff6b6b'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideInRight 0.4s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

/* ===== PARALLAX SCROLL EFFECT ===== */
window.addEventListener('scroll', function() {
    const scrollAmount = window.scrollY;
    const gradientOrbs = document.querySelectorAll('.gradient-orb');
    
    gradientOrbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        orb.style.transform = `translate(${scrollAmount * speed * 0.1}px, ${scrollAmount * speed * 0.05}px)`;
    });
});

/* ===== RIPPLE EFFECT FOR BUTTONS ===== */
document.querySelectorAll('.btn-glow').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

/* ===== LAZY LOADING FOR IMAGES ===== */
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('.project-image img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* ===== KEYBOARD NAVIGATION ===== */
document.addEventListener('keydown', function(e) {
    // Close hamburger menu on Escape
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

/* ===== SMOOTH SCROLL TO TOP ===== */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show scroll-to-top button after scrolling
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        // Can add a scroll-to-top button here
    }
});

/* ===== PERFORMANCE OPTIMIZATION ===== */
// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        // Handle scroll-based animations
    }, 150);
}, { passive: true });

// Preload images
function preloadImages() {
    const images = document.querySelectorAll('.project-image img');
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.dataset.src || img.src;
    });
}

// Call after page loads
window.addEventListener('load', preloadImages);

/* ===== CUSTOM ANIMATIONS ===== */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100px);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 2rem;
        gap: 1rem;
    }
`;
document.head.appendChild(style);

console.log('Premium Website Initialized ✨');
