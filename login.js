    function showForm(type) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));

      if (type === 'basic') {
        document.querySelectorAll('.tab')[0].classList.add('active');
        document.getElementById('basic').classList.add('active');
      } else {
        document.querySelectorAll('.tab')[1].classList.add('active');
        document.getElementById('profile').classList.add('active');
      }
    }

    // Touch event handling for better mobile response
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('touchstart', function() {
        this.style.opacity = '0.7';
      });
      
      tab.addEventListener('touchend', function() {
        this.style.opacity = '1';
      });
    });

    // Prevent zoom on input focus on mobile
    document.querySelectorAll('input[type="number"]').forEach(input => {
      input.addEventListener('focus', function() {
        this.style.fontSize = '16px';
      });
    });