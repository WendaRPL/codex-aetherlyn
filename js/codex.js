// scripts/main.js
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeCustomCursor();
    initializeAnimations();
    createFloatingCrystals();
    initializeTimelineEvents();
});

// Mobile Menu functionality
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    const body = document.body;
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            const isOpening = !navLinks.classList.contains('active');
            
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body class untuk CSS control
            body.classList.toggle('menu-open', navLinks.classList.contains('active'));
            
            // Toggle body scroll when menu is open
            const isMenuOpen = navLinks.classList.contains('active');
            body.style.overflow = isMenuOpen ? 'hidden' : '';
            
            // Automatically open dropdown on mobile when menu opens
            if (window.innerWidth <= 768) {
                if (isMenuOpen) {
                    // Open the dropdown when menu opens
                    setTimeout(() => {
                        if (mobileDropdown) {
                            mobileDropdown.classList.add('active');
                        }
                    }, 100); // Small delay for smooth animation
                } else {
                    // Close dropdown when menu closes
                    if (mobileDropdown) {
                        mobileDropdown.classList.remove('active');
                    }
                }
            }
        });
        
        // Close menu when clicking on links
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't close dropdown if clicking inside dropdown
                if (this.closest('.dropdown-menu')) {
                    e.stopPropagation();
                    return;
                }
                
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                
                // Close dropdown too
                if (mobileDropdown) {
                    mobileDropdown.classList.remove('active');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = event.target.closest('nav');
            const isClickInsideSidebar = event.target.closest('.nav-links');
            const isClickOnHamburger = event.target.closest('.hamburger');
            
            if (!isClickInsideNav && !isClickInsideSidebar && !isClickOnHamburger && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                
                // Close dropdown too
                if (mobileDropdown) {
                    mobileDropdown.classList.remove('active');
                }
            }
        });
        
        // Handle dropdown toggle on mobile
        if (mobileDropdown && window.innerWidth <= 768) {
            const dropdownToggle = mobileDropdown.querySelector('.dropdown-toggle');
            
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle dropdown
                mobileDropdown.classList.toggle('active');
                
                // Scroll to dropdown if it's opening
                if (mobileDropdown.classList.contains('active')) {
                    setTimeout(() => {
                        mobileDropdown.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            });
            
            // Close dropdown when clicking outside of it (but inside nav)
            navLinks.addEventListener('click', function(e) {
                if (!e.target.closest('.mobile-dropdown') && mobileDropdown.classList.contains('active')) {
                    mobileDropdown.classList.remove('active');
                }
            });
        }
        
        // Handle Escape key to close sidebar
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                
                if (mobileDropdown) {
                    mobileDropdown.classList.remove('active');
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                // Reset mobile states when resizing to desktop
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                
                if (mobileDropdown) {
                    mobileDropdown.classList.remove('active');
                }
            }
        });
    }
}

// Custom Cursor functionality
function initializeCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline && window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Outline follows with a delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });
        
        // Add cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .cta-button, .link-card, .highlight-item, .figure-card, .timeline-event');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.opacity = '0.8';
            });
            
            element.addEventListener('mouseleave', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.opacity = '0.5';
            });
        });
    } else if (cursorDot && cursorOutline) {
        // Hide custom cursor elements on mobile
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
}

// Timeline interactions
function initializeTimelineEvents() {
    const timelineEvents = document.querySelectorAll('.timeline-event');
    
    timelineEvents.forEach(event => {
        event.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        event.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // Click to show more details (optional)
        event.addEventListener('click', function() {
            const year = this.querySelector('.timeline-year').textContent;
            const title = this.querySelector('h3').textContent;
            console.log(`Selected: ${title} (${year})`);
        });
    });
}

// Additional animations
function initializeAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animation for timeline events
                if (entry.target.classList.contains('timeline-event')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.highlight-item, .link-card, .patch-card, .timeline-event, .figure-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Add some floating crystals dynamically
function createFloatingCrystals() {
    const container = document.querySelector('.floating-crystals');
    if (!container) return;
    
    // Clear existing crystals except the pseudo-elements
    const existingCrystals = container.querySelectorAll('.floating-crystal');
    existingCrystals.forEach(crystal => crystal.remove());
    
    const crystalCount = 8;
    const colors = [
        'var(--accent-primary)',
        'var(--accent-secondary)',
        'var(--accent-fire)',
        'var(--accent-water)',
        'var(--accent-wind)'
    ];
    
    for (let i = 0; i < crystalCount; i++) {
        const crystal = document.createElement('div');
        crystal.className = 'floating-crystal';
        
        const size = 10 + Math.random() * 20;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 6;
        const duration = 5 + Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rotation = Math.random() * 360;
        
        crystal.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, ${color}, transparent 70%);
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            opacity: ${0.05 + Math.random() * 0.15};
            animation: float ${duration}s ease-in-out ${delay}s infinite;
            transform: rotate(${rotation}deg);
            filter: blur(${Math.random() * 2}px);
        `;
        
        container.appendChild(crystal);
    }
}

// Create ink stain effects on codex sections
function createInkStains() {
    const sections = document.querySelectorAll('.patch-info, .quick-links');
    
    sections.forEach(section => {
        const stainCount = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < stainCount; i++) {
            const stain = document.createElement('div');
            stain.className = 'ink-stain';
            
            const size = 50 + Math.random() * 100;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const opacity = 0.02 + Math.random() * 0.03;
            
            stain.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: ${posY}%;
                left: ${posX}%;
                opacity: ${opacity};
            `;
            
            section.appendChild(stain);
        }
    });
}

// Initialize ink stains after a delay
setTimeout(createInkStains, 2000);

// Parallax effect for codex paper
window.addEventListener('scroll', function() {
    const paperEffect = document.querySelector('.codex-paper-effect');
    if (paperEffect) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        paperEffect.style.transform = `translateY(${rate}px)`;
    }
});

// Handle figure card interactions
document.querySelectorAll('.figure-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const portrait = this.querySelector('.figure-portrait');
        if (portrait) {
            portrait.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const portrait = this.querySelector('.figure-portrait');
        if (portrait) {
            portrait.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Add subtle glow to active section
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            section.style.boxShadow = 'inset 0 0 50px rgba(76, 201, 240, 0.05)';
        } else {
            section.style.boxShadow = 'none';
        }
    });
});

// Initialize tooltips for timeline years
document.querySelectorAll('.timeline-year').forEach(year => {
    year.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(-50%) scale(1.1)';
    });
    
    year.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(-50%) scale(1)';
    });
});