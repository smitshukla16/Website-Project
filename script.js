document.addEventListener('DOMContentLoaded', function() {
    // Orientation handling
    const orientationMessage = document.querySelector('.orientation-message');
    const container = document.querySelector('.container');
    
    // Function to check and handle orientation
    function handleOrientation() {
        // Check if device is mobile (width less than 1024px)
        const isMobile = window.innerWidth < 1024;
        
        if (isMobile) {
            // Always display in landscape mode
            container.style.display = 'block';
            
            // Calculate and apply scaling
            const scale = window.innerWidth / 1024;
            container.style.transform = `scale(${scale})`;
            container.style.width = '1024px';
            container.style.height = `${window.innerHeight / scale}px`;
            
            // Fix scaling issues
            const sidebar = document.querySelector('.slide-sidebar');
            if (sidebar) {
                sidebar.style.width = '25%';
            }
            
            const headerExtension = document.querySelector('.header-extension');
            if (headerExtension) {
                headerExtension.style.height = '40px';
                headerExtension.style.left = '25%';
            }
            
            const slideNumber = document.querySelector('.slide-number');
            if (slideNumber) {
                slideNumber.style.left = '25%';
                slideNumber.style.marginLeft = '3vw';
                slideNumber.style.top = '10vh';
            }
            
            const authorThumbnail = document.querySelector('.author-thumbnail');
            if (authorThumbnail) {
                authorThumbnail.style.left = '25%';
                authorThumbnail.style.transform = 'translateX(0)';
                authorThumbnail.style.marginLeft = '-2.2vw';
                authorThumbnail.style.bottom = '4vh';
            }
        } else {
            // Desktop view - no special handling needed
            container.style.display = 'block';
            container.style.transform = 'none';
            container.style.width = '100%';
            container.style.height = '100vh';
        }
    }
    
    // Initial check
    handleOrientation();
    
    // Listen for orientation changes
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