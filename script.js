// ==================== //
// Parallax Effect for Hero Section
// ==================== //
const hero = document.querySelector('.hero');
const heroBackground = document.querySelector('.hero-background');

if (hero && heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        // Only apply parallax within hero section
        if (scrolled <= heroHeight) {
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ==================== //
// Scroll-triggered Animations
// ==================== //
const sectionObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, sectionObserverOptions);

// Observe all sections (don't include carousel-wrapper to avoid conflicts)
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.section, .card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        sectionObserver.observe(el);
    });
});

// ==================== //
// Mobile Menu Toggle
// ==================== //
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// ==================== //
// Header Scroll Effect
// ==================== //
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==================== //
// Smooth Scroll
// ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== //
// Intersection Observer for Fade-in Animations
// ==================== //
const cardObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, cardObserverOptions);

// Wait for DOM to be ready before observing cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card, .program-feature, .type-card, .offer-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(el);
    });
});

// ==================== //
// Books Carousel
// ==================== //
class BooksCarousel {
    constructor() {
        this.track = document.getElementById('booksCarousel');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.currentIndex = 0;
        this.books = [];
        this.itemsPerView = this.calculateItemsPerView();
        
        this.init();
    }

    calculateItemsPerView() {
        const width = window.innerWidth;
        if (width < 480) return 1;
        if (width < 768) return 2;
        if (width < 1024) return 3;
        if (width < 1400) return 4;
        return 5;
    }

    async init() {
        await this.loadBooks();
        this.setupEventListeners();
        this.updateButtons();
        
        // Update items per view on resize
        window.addEventListener('resize', () => {
            const newItemsPerView = this.calculateItemsPerView();
            if (newItemsPerView !== this.itemsPerView) {
                this.itemsPerView = newItemsPerView;
                this.currentIndex = 0;
                this.updateCarousel();
            }
        });
    }

    async loadBooks() {
        console.log('Loading books...');
        try {
            // Check if API config is available
            if (typeof EDITORUM_API_CONFIG === 'undefined') {
                console.log('API configuration not found, using mock data');
                this.books = this.getMockBooks();
                console.log('Mock books loaded:', this.books.length);
                this.renderBooks();
                return;
            }

            // Try to fetch from API
            const response = await fetch(EDITORUM_API_CONFIG.endpoint, {
                headers: EDITORUM_API_CONFIG.headers
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            this.books = this.parseAPIResponse(data);
            this.renderBooks();
        } catch (error) {
            console.error('Error loading books:', error);
            console.log('Using mock data instead');
            this.books = this.getMockBooks();
            this.renderBooks();
        }
    }

    parseAPIResponse(data) {
        // Adjust this based on actual API response structure
        // This is a placeholder that should be updated when API docs are available
        if (Array.isArray(data)) {
            return data.map(book => ({
                id: book.id,
                title: book.title || book.name,
                author: book.author || book.authors?.join(', '),
                cover: book.cover_url || book.image_url || book.thumbnail,
                url: book.url || book.link
            }));
        }
        
        // Handle other possible response structures
        if (data.books) {
            return this.parseAPIResponse(data.books);
        }
        
        if (data.items) {
            return this.parseAPIResponse(data.items);
        }

        return [];
    }

    getMockBooks() {
        // Mock data for demonstration
        return [
            {
                id: 1,
                title: 'Advanced Topics in Quantum Physics',
                author: 'Dr. Ivan Petrov',
                cover: null,
                url: '#'
            },
            {
                id: 2,
                title: 'Modern Approaches to Molecular Biology',
                author: 'Prof. Anna Sokolova',
                cover: null,
                url: '#'
            },
            {
                id: 3,
                title: 'Mathematical Modeling in Engineering',
                author: 'Dr. Mikhail Volkov',
                cover: null,
                url: '#'
            },
            {
                id: 4,
                title: 'Artificial Intelligence and Machine Learning',
                author: 'Dr. Elena Dmitrieva',
                cover: null,
                url: '#'
            },
            {
                id: 5,
                title: 'Climate Change and Environmental Science',
                author: 'Prof. Sergey Ivanov',
                cover: null,
                url: '#'
            },
            {
                id: 6,
                title: 'Neurological Disorders: Recent Research',
                author: 'Dr. Natalia Kuznetsova',
                cover: null,
                url: '#'
            },
            {
                id: 7,
                title: 'Modern Chemistry: Theory and Practice',
                author: 'Prof. Alexander Popov',
                cover: null,
                url: '#'
            },
            {
                id: 8,
                title: 'Advances in Materials Science',
                author: 'Dr. Olga Romanova',
                cover: null,
                url: '#'
            }
        ];
    }

    renderBooks() {
        console.log('Rendering books:', this.books.length);
        console.log('Track element:', this.track);
        
        if (this.books.length === 0) {
            this.track.innerHTML = '<div class="book-loading"><p>Нет доступных изданий</p></div>';
            return;
        }

        this.track.innerHTML = this.books.map(book => `
            <div class="book-item" data-id="${book.id}">
                ${book.cover 
                    ? `<img src="${book.cover}" alt="${book.title}" class="book-cover">`
                    : `<div class="book-cover" style="display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: 600; padding: 20px; text-align: center;">
                        ${book.title}
                    </div>`
                }
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    ${book.author ? `<div class="book-author">${book.author}</div>` : ''}
                </div>
            </div>
        `).join('');

        // Add click handlers to books
        document.querySelectorAll('.book-item').forEach(item => {
            item.addEventListener('click', () => {
                const bookId = item.dataset.id;
                const book = this.books.find(b => b.id == bookId);
                if (book && book.url) {
                    window.open(book.url, '_blank');
                }
            });
        });
    }

    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                this.next();
            }
            if (touchEndX > touchStartX + 50) {
                this.prev();
            }
        };

        this.handleSwipe = handleSwipe;
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }

    next() {
        const maxIndex = Math.max(0, this.books.length - this.itemsPerView);
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }

    updateCarousel() {
        const bookWidth = 180; // Base width from CSS
        const gap = 24; // Gap from CSS
        const offset = -(this.currentIndex * (bookWidth + gap));
        
        this.track.style.transform = `translateX(${offset}px)`;
        this.updateButtons();
    }

    updateButtons() {
        if (!this.prevBtn || !this.nextBtn) return;

        const maxIndex = Math.max(0, this.books.length - this.itemsPerView);
        
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= maxIndex;
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing carousel...');
    try {
        new BooksCarousel();
    } catch (error) {
        console.error('Error initializing carousel:', error);
    }
});

// ==================== //
// Performance: Lazy Loading Images
// ==================== //
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== //
// Console Info
// ==================== //
console.log('%c Academus Publishing Landing Page ', 'background: #1e40af; color: white; font-size: 16px; padding: 10px;');
console.log('%c Developed with ❤️ ', 'font-size: 12px; color: #6b7280;');

