  // Header scroll effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Image gallery functionality
  function changeImage(src) {
    document.getElementById('main-image').src = src;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
      thumb.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
  }

  // Size selector
  const sizeButtons = document.querySelectorAll('.size-btn');
  sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
      sizeButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
      
      // Show size confirmation
      const size = button.getAttribute('data-size');
      showNotification(`Size ${size} selected`);
    });
  });

  // Tab functionality
  function openTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
  }

  // Notification system
  function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerHTML = `<span>✓ ${message}</span>`;
    notification.style.display = 'flex';
    
    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  }

  // Button actions
  function tryAI() {
    showNotification("Opening AI Try-On experience...");
    setTimeout(() => {
      // In a real app, this would open the AI try-on feature
      alert("AI Try-On feature would open here! This would use your camera to show how the T-Shirt looks on you.");
    }, 500);
  }

  function addToCart() {
    const selectedSize = document.querySelector('.size-btn.selected').getAttribute('data-size');
    showNotification(`Classic Cotton T-Shirt (Size: ${selectedSize}) added to cart!`);
  }

  function buyNow() {
    const selectedSize = document.querySelector('.size-btn.selected').getAttribute('data-size');
    showNotification(`Proceeding to checkout with Classic Cotton T-Shirt (Size: ${selectedSize})`);
    setTimeout(() => {
      // In a real app, this would redirect to checkout
      alert("You would be redirected to the checkout page!");
    }, 1000);
  }

  // Initialize with first tab active
  document.addEventListener('DOMContentLoaded', () => {
    openTab('description');
  });