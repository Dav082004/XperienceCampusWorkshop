// ========================================
// THEORY PAGE JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeTheoryPage();
});

function initializeTheoryPage() {
    // Inicializar animaciones de entrada
    initializeScrollAnimations();
    
    // Inicializar navegación suave
    initializeSmoothScrolling();
    
    // Inicializar efectos interactivos
    initializeInteractiveEffects();
    
    // Inicializar navegación móvil (heredado del script principal)
    initializeMobileNavigation();
    
    console.log('🎓 Theory page initialized successfully!');
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initializeScrollAnimations() {
    // Crear observer para animaciones de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Agregar delay para elementos en grid
                if (entry.target.classList.contains('command-card')) {
                    const cards = Array.from(entry.target.parentElement.children);
                    const index = cards.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    const elementsToAnimate = document.querySelectorAll(`
        .concept-card,
        .command-card,
        .ecosystem-card,
        .insight-card,
        .security-feature,
        .flow-step,
        .flow-step-horizontal
    `);

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// SMOOTH SCROLLING
// ========================================

function initializeSmoothScrolling() {
    // Navegación del hero
    const heroNavLinks = document.querySelectorAll('.hero-nav-link');
    heroNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Agregar efecto de highlight temporal
                highlightSection(targetElement);
            }
        });
    });

    // Enlaces internos en recursos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                highlightSection(targetElement);
            }
        });
    });
}

function highlightSection(element) {
    // Agregar clase de highlight temporal
    element.classList.add('section-highlight');
    
    // Remover después de 2 segundos
    setTimeout(() => {
        element.classList.remove('section-highlight');
    }, 2000);
}

// ========================================
// INTERACTIVE EFFECTS
// ========================================

function initializeInteractiveEffects() {
    // Efecto de hover para comandos
    initializeCommandHoverEffects();
    
    // Animación de estados de Git
    initializeGitStatesAnimation();
    
    // Efecto de typing para código
    initializeTypingEffect();
    
    // Contador animado para estadísticas
    initializeCounterAnimation();
    
    // Efecto parallax ligero para el hero
    initializeParallaxEffect();
}

function initializeCommandHoverEffects() {
    const commandCards = document.querySelectorAll('.command-card');
    
    commandCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Agregar efecto de pulse al código
            const codeElement = this.querySelector('code');
            if (codeElement) {
                codeElement.style.animation = 'pulse 0.6s ease-in-out';
            }
            
            // Agregar brillo al tipo de comando
            const commandType = this.querySelector('.command-type');
            if (commandType) {
                commandType.style.transform = 'scale(1.05)';
                commandType.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const codeElement = this.querySelector('code');
            if (codeElement) {
                codeElement.style.animation = '';
            }
            
            const commandType = this.querySelector('.command-type');
            if (commandType) {
                commandType.style.transform = '';
                commandType.style.boxShadow = '';
            }
        });
    });
}

function initializeGitStatesAnimation() {
    const stateItems = document.querySelectorAll('.state-item');
    
    // Animar los estados en secuencia cuando entren en vista
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statesContainer = entry.target.closest('.git-states');
                if (statesContainer) {
                    animateGitStatesSequence(statesContainer);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    stateItems.forEach(item => observer.observe(item));
}

function animateGitStatesSequence(container) {
    const states = container.querySelectorAll('.state-item');
    const arrows = container.querySelectorAll('.state-arrow');
    
    states.forEach((state, index) => {
        setTimeout(() => {
            state.style.transform = 'scale(1.05)';
            state.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            
            // Animar la flecha después del estado
            if (arrows[index]) {
                setTimeout(() => {
                    arrows[index].style.transform = 'scale(1.2)';
                    arrows[index].style.color = '#10b981';
                }, 300);
            }
            
            // Volver al estado normal
            setTimeout(() => {
                state.style.transform = '';
                state.style.boxShadow = '';
                if (arrows[index]) {
                    arrows[index].style.transform = '';
                    arrows[index].style.color = '';
                }
            }, 1000);
        }, index * 800);
    });
}

function initializeTypingEffect() {
    const codeBlocks = document.querySelectorAll('.code-block code');
    
    codeBlocks.forEach(block => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(block);
    });
}

function typeWriter(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid #10b981';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            // Remover cursor después de un tiempo
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }, 50);
}

function initializeCounterAnimation() {
    // Animación para números o estadísticas si las agregamos
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

function initializeParallaxEffect() {
    const hero = document.querySelector('.theory-hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.theory-hero-container');
        
        if (parallax && scrolled < hero.offsetHeight) {
            const speed = scrolled * 0.3;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// ========================================
// MOBILE NAVIGATION (desde script.js)
// ========================================

function initializeMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const headerNav = document.getElementById('headerNav');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (!mobileMenuToggle || !headerNav || !mobileOverlay) return;

    mobileMenuToggle.addEventListener('click', function() {
        const isOpen = headerNav.classList.contains('nav-open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Cerrar menú al hacer click en overlay
    mobileOverlay.addEventListener('click', closeMobileMenu);

    // Cerrar menú al hacer click en un enlace
    const navLinks = headerNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && headerNav.classList.contains('nav-open')) {
            closeMobileMenu();
        }
    });

    function openMobileMenu() {
        headerNav.classList.add('nav-open');
        mobileOverlay.classList.add('overlay-active');
        mobileMenuToggle.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        headerNav.classList.remove('nav-open');
        mobileOverlay.classList.remove('overlay-active');
        mobileMenuToggle.classList.remove('menu-open');
        document.body.style.overflow = '';
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Función para manejar errores de carga de imágenes
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn(`Failed to load image: ${this.src}`);
        });
    });
}

// Función para lazy loading de contenido pesado
function initializeLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const lazyContent = element.getAttribute('data-lazy');
                
                // Cargar contenido lazy
                if (lazyContent) {
                    element.innerHTML = lazyContent;
                    element.removeAttribute('data-lazy');
                }
                
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(element => lazyObserver.observe(element));
}

// Función para mejorar accesibilidad
function improveAccessibility() {
    // Agregar soporte para navegación por teclado
    const interactiveElements = document.querySelectorAll(`
        .command-card,
        .ecosystem-card,
        .hero-nav-link,
        .insight-card
    `);
    
    interactiveElements.forEach(element => {
        // Hacer focuseable si no lo es
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Agregar eventos de teclado
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Mejorar anuncios para lectores de pantalla
    const sections = document.querySelectorAll('.theory-section');
    sections.forEach((section, index) => {
        if (!section.hasAttribute('aria-label')) {
            const title = section.querySelector('h2, h3');
            if (title) {
                section.setAttribute('aria-label', title.textContent);
            }
        }
    });
}

// Función para optimizar rendimiento
function optimizePerformance() {
    // Debounce para eventos de scroll
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // 60fps
    }, { passive: true });
    
    // Reducir animaciones si el usuario prefiere menos movimiento
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01s');
        document.documentElement.style.setProperty('--transition-duration', '0.01s');
    }
}

// Inicializar mejoras adicionales
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        handleImageErrors();
        initializeLazyLoading();
        improveAccessibility();
        optimizePerformance();
    }, 1000);
});

// ========================================
// EXPORT FUNCTIONS (si se usa como módulo)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeTheoryPage,
        initializeScrollAnimations,
        initializeSmoothScrolling,
        initializeInteractiveEffects
    };
}