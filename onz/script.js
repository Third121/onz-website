// DOM Elements
let modal = document.getElementById('signupModal');
let signupBtn = document.getElementById('signupBtn');
let closeBtn = document.getElementById('closeBtn');
let signupForm = document.getElementById('signupForm');
let submitBtn = signupForm?.querySelector('button[type="submit"]');
let currentPage = document.querySelector('.page');

// Page Transition Management
const pageTransition = {
  init() {
    // Add loaded class to current page
    if (currentPage) {
      currentPage.classList.add('loaded');
    }

    // Handle page transitions
    document.querySelectorAll('a').forEach(link => {
      if (link.hostname === window.location.hostname) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = link.getAttribute('href');
          this.navigateTo(href);
        });
      }
    });
  },

  async navigateTo(url) {
    try {
      // Start transition out
      if (currentPage) {
        currentPage.classList.remove('loaded');
      }

      // Wait for transition out
      await new Promise(resolve => setTimeout(resolve, 500));

      // Navigate to new page
      window.location.href = url;
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }
};

// Modal State Management
const modalState = {
  isOpen: false,
  
  open() {
    this.isOpen = true;
    if (modal) {
      modal.style.display = 'flex';
      // Use requestAnimationFrame to ensure the display: flex is applied before adding the open class
      requestAnimationFrame(() => {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }
  },
  
  close() {
    this.isOpen = false;
    if (modal) {
      modal.classList.remove('open');
      // Wait for the animation to complete before hiding the modal
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        if (signupForm) {
          signupForm.reset();
          submitBtn.disabled = true;
        }
      }, 300); // Match this with the CSS transition duration
    }
  }
};

// Form Validation
function validateForm() {
  if (!signupForm) return;
  
  const username = signupForm.querySelector('input[type="text"]');
  const email = signupForm.querySelector('input[type="email"]');
  const password = signupForm.querySelector('input[type="password"]');
  
  // Check if all fields are valid
  const isUsernameValid = username.checkValidity();
  const isEmailValid = email.checkValidity();
  const isPasswordValid = password.checkValidity();
  
  // Enable/disable submit button based on form validity
  submitBtn.disabled = !(isUsernameValid && isEmailValid && isPasswordValid);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize page transition
  pageTransition.init();

  // Re-initialize DOM elements
  modal = document.getElementById('signupModal');
  signupBtn = document.getElementById('signupBtn');
  closeBtn = document.getElementById('closeBtn');
  signupForm = document.getElementById('signupForm');
  submitBtn = signupForm?.querySelector('button[type="submit"]');
  currentPage = document.querySelector('.page');
  
  // Ensure modal is hidden on page load
  modalState.close();
  
  // Add event listeners to all signup buttons
  const signupButtons = document.querySelectorAll('.user-btn');
  signupButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      modalState.open();
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalState.close();
    });
  }
  
  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modalState.close();
      }
    });
  }
  
  // Handle form validation
  if (signupForm) {
    signupForm.addEventListener('input', validateForm);
    signupForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Close modal on escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalState.isOpen) {
      modalState.close();
    }
  });

  // Show signup modal when "Add to Cart" button is clicked
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default action
      modalState.open(); // Open the signup modal
    });
  });
});

// Form submission handler
async function handleFormSubmit(event) {
  event.preventDefault();
  
  if (!signupForm) return;
  
  const formData = new FormData(signupForm);
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');
  
  try {
    // Here you would typically send the data to your backend
    // For now, we'll just log it and show a success message
    console.log('Form submitted:', { username, email, password });
    
    // Show success message (you can customize this)
    alert('Sign up successful!');
    modalState.close();
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('There was an error signing up. Please try again.');
  }
}

const zoomOverlay = document.getElementById('zoomOverlay');
const zoomedImage = document.getElementById('zoomedImage');

document.querySelectorAll('.merch-item img').forEach(img => {
  img.addEventListener('click', function() {
    // Set the source of the zoomed image
    zoomedImage.src = this.src;
    // Show the overlay
    zoomOverlay.style.display = 'flex';
  });
});

// Close the zoom overlay when clicking on it
zoomOverlay.addEventListener('click', function() {
  this.style.display = 'none'; // Hide the overlay
});
