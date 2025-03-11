document.addEventListener('DOMContentLoaded', function() {
  // Testimonial carousel functionality
  const testimonials = document.querySelectorAll('.testimonial');
  const prevButton = document.querySelector('.testimonial-controls .prev');
  const nextButton = document.querySelector('.testimonial-controls .next');
  
  if (testimonials.length && prevButton && nextButton) {
    let currentIndex = 0;
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
      testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
      });
      testimonials[index].classList.add('active');
    }
    
    // Event listeners for prev and next buttons
    prevButton.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    });
    
    nextButton.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    });
    
    // Auto-advance the testimonials every 5 seconds
    setInterval(function() {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }, 5000);
  }
  
  // Contact form submission handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Simple form validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !subject || !message) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For this example, we'll just show a success message
      alert('¡Gracias por tu mensaje! Te contactaré pronto.');
      contactForm.reset();
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add active class to nav links based on current page
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav ul li a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});