// Mobile menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('nav-menu');
const cinnamoroll = document.querySelector('.cinnamoroll');
const head = document.querySelector('.head');
const leftEye = document.querySelector('.left-eye');
const rightEye = document.querySelector('.right-eye');
const leftPupil = document.querySelector('.left-eye .pupil');
const rightPupil = document.querySelector('.right-eye .pupil');
const leftArm = document.querySelector('.left-arm');
const bouquet = document.querySelector('.bouquet');

// Mobile menu functionality
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Cinnamoroll eye movement
document.addEventListener('mousemove', (e) => {
    if (!leftPupil || !rightPupil) return;
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Limit pupil movement
    const maxOffset = 3;
    const leftPupilX = Math.min(maxOffset, Math.max(-maxOffset, (mouseX - 0.5) * 10));
    const leftPupilY = Math.min(maxOffset, Math.max(-maxOffset, (mouseY - 0.5) * 10));
    
    leftPupil.style.transform = `translate(${leftPupilX}px, ${leftPupilY}px)`;
    rightPupil.style.transform = `translate(${leftPupilX}px, ${leftPupilY}px)`;
});

// Make Cinnamoroll wave when hovering
if (cinnamoroll) {
    cinnamoroll.addEventListener('mouseenter', () => {
        leftArm.style.animation = 'wave 0.5s ease-in-out infinite';
        bouquet.style.animation = 'bounce 0.5s ease-in-out infinite';
    });
    
    cinnamoroll.addEventListener('mouseleave', () => {
        leftArm.style.animation = 'wave 3s ease-in-out infinite';
        bouquet.style.animation = '';
    });
}

// Add floating hearts periodically
function createFloatingHeart() {
    const hearts = document.querySelector('.hearts');
    if (!hearts) return;
    
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animation = `float-heart ${3 + Math.random() * 3}s ease-in-out forwards`;
    heart.style.opacity = '0';
    heart.style.fontSize = (20 + Math.random() * 20) + 'px';
    
    hearts.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 1000);

// Add bounce animation for the bouquet
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: rotate(-20deg) translateY(0); }
        50% { transform: rotate(-15deg) translateY(-5px); }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        
        // Show success message
        Swal.fire({
            title: '¡Mensaje enviado!',
            text: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
            icon: 'success',
            confirmButtonColor: '#ff4d8d',
            confirmButtonText: '¡Genial!'
        });
        
        // Reset form
        this.reset();
    });
}

// Add animation to gallery items on scroll
const animateOnScroll = () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (itemPosition < screenPosition) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for gallery items
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    // Initial check in case items are already in view
    setTimeout(animateOnScroll, 500);
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Mobile menu toggle (optional - can be added if needed)
const setupMobileMenu = () => {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    
    const nav = document.querySelector('nav');
    const navList = document.querySelector('nav ul');
    
    if (window.innerWidth <= 768) {
        nav.insertBefore(menuToggle, navList);
        navList.style.display = 'none';
        
        menuToggle.addEventListener('click', () => {
            if (navList.style.display === 'none' || !navList.style.display) {
                navList.style.display = 'flex';
                menuToggle.innerHTML = '✕';
            } else {
                navList.style.display = 'none';
                menuToggle.innerHTML = '☰';
            }
        });
    } else {
        if (menuToggle.parentNode) {
            menuToggle.parentNode.removeChild(menuToggle);
        }
        if (navList) {
            navList.style.display = 'flex';
        }
    }
};

// Run mobile menu setup on load and resize
window.addEventListener('load', () => {
    setupMobileMenu();
    setupGifLoop();
});
window.addEventListener('resize', setupMobileMenu);

// Función para reiniciar el GIF periódicamente
function setupGifLoop() {
    const cinnamorollImg = document.querySelector('.cinnamoroll-img');
    if (!cinnamorollImg) return;
    
    // Reiniciar el GIF cada 5 segundos
    setInterval(() => {
        const src = cinnamorollImg.src;
        cinnamorollImg.src = '';
        cinnamorollImg.src = src;
    }, 5000); // 5000ms = 5 segundos
}

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Add animation to buttons on hover
const buttons = document.querySelectorAll('.cta-button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 6px 20px rgba(255, 77, 141, 0.6)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 15px rgba(255, 77, 141, 0.4)';
    });
});
