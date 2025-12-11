// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const copyButtons = document.querySelectorAll('.copy-btn');

// Mobile Navigation Toggle
function toggleMobileNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
}

// Close mobile nav when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Copy to Clipboard functionality
async function copyToClipboard(text, button) {
    try {
        await navigator.clipboard.writeText(text);
        showCopySuccess(button);
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            showCopySuccess(button);
        } catch (fallbackErr) {
            console.error('Fallback copy failed:', fallbackErr);
            showCopyError(button);
        }

        document.body.removeChild(textArea);
    }
}

function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
        </svg>
    `;
    button.classList.add('copy-success');

    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('copy-success');
    }, 2000);
}

function showCopyError(button) {
    button.classList.add('copy-error');
    setTimeout(() => {
        button.classList.remove('copy-error');
    }, 2000);
}

// Add click handlers to all copy buttons
copyButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const textToCopy = button.getAttribute('data-clipboard-text');
        await copyToClipboard(textToCopy, button);
    });
});

// Smooth scroll for anchor links
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Add smooth scroll to navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        if (target !== '#') {
            smoothScrollTo(target);
        }
    });
});

// Intersection Observer for animations on scroll
function setupIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.feature-card, .command-card, .example, .installation-step'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Add animation classes
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .copy-success {
            color: #10b981 !important;
        }

        .copy-error {
            color: #ef4444 !important;
        }

        /* Stagger animations for grid items */
        .features-grid .animate-on-scroll:nth-child(1) { transition-delay: 0.1s; }
        .features-grid .animate-on-scroll:nth-child(2) { transition-delay: 0.2s; }
        .features-grid .animate-on-scroll:nth-child(3) { transition-delay: 0.3s; }
        .features-grid .animate-on-scroll:nth-child(4) { transition-delay: 0.4s; }
        .features-grid .animate-on-scroll:nth-child(5) { transition-delay: 0.5s; }
        .features-grid .animate-on-scroll:nth-child(6) { transition-delay: 0.6s; }

        .commands-grid .animate-on-scroll:nth-child(odd) { transition-delay: 0.1s; }
        .commands-grid .animate-on-scroll:nth-child(even) { transition-delay: 0.2s; }

        @media (prefers-reduced-motion: reduce) {
            .animate-on-scroll {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Header scroll effect
function setupHeaderScroll() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    }, { passive: true });
}

// Terminal typing effect
function setupTerminalEffect() {
    const terminalLines = document.querySelectorAll('.terminal-command');

    const typeText = (element, text, speed = 100) => {
        let i = 0;
        element.textContent = '';

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };

        type();
    };

    // Start typing effect when terminal is visible
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const command = entry.target;
                const originalText = command.textContent;
                typeText(command, originalText);
                terminalObserver.unobserve(command);
            }
        });
    }, { threshold: 0.5 });

    terminalLines.forEach(line => {
        terminalObserver.observe(line);
    });
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }

        // Ctrl/Cmd + K for quick access (placeholder)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Future: could open a command palette
            console.log('Command palette shortcut pressed');
        }
    });
}

// Performance monitoring
function setupPerformanceMonitoring() {
    // Log page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);

        // Log if load time is slow
        if (loadTime > 3000) {
            console.warn('Slow page load detected. Consider optimizing assets.');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    setupIntersectionObserver();
    setupHeaderScroll();
    setupTerminalEffect();
    setupKeyboardNavigation();
    setupPerformanceMonitoring();

    console.log('Gemkanbino landing page initialized successfully! 🚀');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause animations
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible, resume animations
        document.body.classList.remove('page-hidden');
    }
});

// Add styles for page visibility
const visibilityStyle = document.createElement('style');
visibilityStyle.textContent = `
    .page-hidden .animate-on-scroll,
    .page-hidden .terminal-cursor {
        animation-play-state: paused !important;
    }
`;
document.head.appendChild(visibilityStyle);