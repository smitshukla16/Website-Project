document.addEventListener('DOMContentLoaded', function() {
    // Orientation handling
    const orientationMessage = document.querySelector('.orientation-message');
    const container = document.querySelector('.container');
    
    // Function to check and handle orientation
    function handleOrientation() {
        // Check if device is mobile (width less than 1024px)
        const isMobile = window.innerWidth < 1024;
        
        if (!isMobile) {
            // Desktop view - ensure no transforms/scaling are applied
            document.body.style.transform = 'none';
            document.body.style.width = '100vw';
            document.body.style.height = 'auto'; // Or 100vh if preferred
            document.body.style.overflow = 'visible';
            document.body.style.position = 'static';
            
            container.style.transform = 'none';
            container.style.width = '100%';
            container.style.height = '100vh';
        } 
        // Mobile view (portrait/landscape) is now handled purely by CSS media queries
        // No JS style manipulation needed for mobile layout
    }
    
    // Initial check
    handleOrientation();
    
    // Listen for orientation changes and resize
    window.addEventListener('resize', handleOrientation);
    window.addEventListener('orientationchange', handleOrientation);
    
    // Hide orientation message after 5 seconds
    setTimeout(() => {
        if (orientationMessage) {
            orientationMessage.style.display = 'none';
        }
    }, 5000);
    
    // Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    function showSlide(index) {
        if (index < 0) {
            currentSlide = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        slides[currentSlide].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    // Optional: Auto slide
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Add hover animations for interactive elements

    const slideTitles = document.querySelectorAll('.slide-title');

    slideTitles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = ''; // Clear existing text
        let charIndex = 0;
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            // Assign index only to non-whitespace characters for animation
            if (char.trim() !== '') {
                span.style.setProperty('--char-index', charIndex++);
            }
            // Add class for styling
            span.classList.add('title-char');
            title.appendChild(span);
        });
    });
});