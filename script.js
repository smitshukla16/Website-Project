document.addEventListener('DOMContentLoaded', function() {
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