    // Header scroll effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Product hover animation
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });

    // Cart notification
    function addToCart(productName) {
      const notification = document.getElementById('cart-notification');
      notification.innerHTML = `<span>✓ "${productName}" added to cart</span>`;
      notification.style.display = 'flex';
      
      setTimeout(() => {
        notification.style.display = 'none';
      }, 3000);
    }

    // Button functions
    function showNotification() {
      const notification = document.getElementById('cart-notification');
      notification.innerHTML = `<span>✨ Explore our amazing collection!</span>`;
      notification.style.display = 'flex';
      notification.style.background = '#3b82f6';
      
      setTimeout(() => {
        notification.style.display = 'none';
      }, 3000);
    }
    
    function scrollToProducts() {
      document.querySelector('.section').scrollIntoView({ 
        behavior: 'smooth' 
      });
    }

    // Animate elements on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll('.product-card, .feature-card');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }
    
    // Set initial state for animation
    document.querySelectorAll('.product-card, .feature-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);