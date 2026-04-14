// CODEX Portfolio - JavaScript Interactions

// Hamburger Menu Toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburgerBtn && mobileMenu) {
    // Toggle menu on button click
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        hamburgerBtn.setAttribute('aria-expanded', hamburgerBtn.classList.contains('active'));
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active states after a short delay to allow smooth scroll
            setTimeout(() => {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }, 100);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = mobileMenu.contains(e.target);
        const isClickInsideButton = hamburgerBtn.contains(e.target);

        if (!isClickInsideMenu && !isClickInsideButton && mobileMenu.classList.contains('active')) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Add visual feedback
            const originalOpacity = this.style.opacity;
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = originalOpacity || '1';
            }, 300);
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionID = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remove active from all
            document.querySelectorAll('a.nav-link').forEach(link => {
                link.classList.remove('active', 'text-red-600');
            });
            // Add active to current
            const navLink = document.querySelector(`a[href="#${sectionID}"]`);
            if (navLink) {
                navLink.classList.add('active', 'text-red-600');
            }
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Lazy load images
const imageObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.onload = () => {
                img.style.transition = 'opacity 0.4s ease';
                img.style.opacity = '1';
            };
            img.src = img.dataset.src || img.src;
            obs.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Count up animation for impact metrics
function animateCountUp() {
    const numbers = document.querySelectorAll('.text-6xl.font-bold');

    numbers.forEach(element => {
        if (element.textContent.includes('%')) {
            const target = parseInt(element.textContent);
            const duration = 2000;
            const start = 0;
            const end = target;
            const increment = end / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= end) {
                    current = end;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + '%';
            }, 16);
        }
    });
}

// Trigger animation when impact section is visible
const impactSection = document.getElementById('impact');
if (impactSection) {
    const impactObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCountUp();
            impactObserver.disconnect();
        }
    }, { threshold: 0.5 });

    impactObserver.observe(impactSection);
}

// Hover effects on cards
document.querySelectorAll('.rounded-3xl').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 25px 50px rgba(255, 46, 68, 0.15)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
    });
});

// Add ripple effect on button click (touch feedback)
document.querySelectorAll('button, a[class*="bg-red"], .bg-red-500, .bg-green-500, a.inline-block').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Only add ripple if it's not the hamburger menu button
        if (this.id === 'hamburger-btn') return;

        // Create ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.opacity = '1';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation keyframes
if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Accessibility: Focus visible
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-focus');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-focus');
});

// Add CSS for focus visible
if (!document.getElementById('focus-styles')) {
    const style = document.createElement('style');
    style.id = 'focus-styles';
    style.textContent = `
        .keyboard-focus *:focus {
            outline: 3px solid #FF2E44;
            outline-offset: 2px;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);
}

// Prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--transition-duration', '0s');
}

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

console.log('CODEX Portfolio - Caffenio Case Study loaded ✨');
