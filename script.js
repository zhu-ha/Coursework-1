// Apple-like UI Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    init();
    
    // Handle URL parameters for success/error messages
    handleNotifications();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Form validation
    initFormValidation();
});

function init() {
    // Set up event listeners
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Navigation active state
    updateActiveNavLink();
    
    // Auto-hide booking form on page load
    const bookingSection = document.getElementById('booking-form');
    if (bookingSection && !bookingSection.classList.contains('hidden')) {
        bookingSection.classList.add('hidden');
    }
}

function showBookingForm() {
    const bookingSection = document.getElementById('booking-form');
    const bookingForm = document.getElementById('bookingForm');
    
    // Reset form
    if (bookingForm) {
        bookingForm.reset();
        bookingForm.action = 'booking.php';
        bookingForm.querySelector('input[name="action"]').value = 'create';
        
        // Remove any hidden index field
        const indexField = bookingForm.querySelector('input[name="booking_index"]');
        if (indexField) {
            indexField.remove();
        }
    }
    
    // Update form title
    const formTitle = document.querySelector('.form-header h2');
    if (formTitle) {
        formTitle.textContent = 'Book Your Flight';
    }
    
    // Show with smooth animation
    bookingSection.classList.remove('hidden');
    
    // Focus first input
    setTimeout(() => {
        const firstInput = bookingForm.querySelector('input[type="text"]');
        if (firstInput) {
            firstInput.focus();
        }
    }, 300);
}

function hideBookingForm() {
    const bookingSection = document.getElementById('booking-form');
    bookingSection.classList.add('hidden');
}

function editBooking(index) {
    // Get booking data via AJAX
    fetch(`booking.php?ajax=1&action=get_booking&index=${index}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const booking = data.booking;
                const bookingForm = document.getElementById('bookingForm');
                
                // Populate form fields
                bookingForm.querySelector('#passengerName').value = booking.passenger_name;
                bookingForm.querySelector('#flightNumber').value = booking.flight_number;
                bookingForm.querySelector('#phoneNumber').value = booking.phone_number;
                
                // Update form action and add index field
                bookingForm.action = 'booking.php';
                bookingForm.querySelector('input[name="action"]').value = 'update';
                
                // Remove existing index field if any
                const existingIndexField = bookingForm.querySelector('input[name="booking_index"]');
                if (existingIndexField) {
                    existingIndexField.remove();
                }
                
                // Add booking index
                const indexField = document.createElement('input');
                indexField.type = 'hidden';
                indexField.name = 'booking_index';
                indexField.value = index;
                bookingForm.appendChild(indexField);
                
                // Update form title
                const formTitle = document.querySelector('.form-header h2');
                if (formTitle) {
                    formTitle.textContent = 'Edit Booking';
                }
                
                // Show form
                showBookingForm();
            } else {
                showNotification('Error loading booking data', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Failed to load booking data', 'error');
        });
}

function deleteBooking(index) {
    // Apple-like confirmation dialog
    if (showConfirmDialog('Are you sure you want to delete this booking?', 'This action cannot be undone.')) {
        // Create form and submit
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'booking.php';
        
        const actionField = document.createElement('input');
        actionField.type = 'hidden';
        actionField.name = 'action';
        actionField.value = 'delete';
        
        const indexField = document.createElement('input');
        indexField.type = 'hidden';
        indexField.name = 'booking_index';
        indexField.value = index;
        
        form.appendChild(actionField);
        form.appendChild(indexField);
        document.body.appendChild(form);
        form.submit();
    }
}

function showConfirmDialog(title, message) {
    // Create Apple-style confirmation dialog
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const dialog = document.createElement('div');
    dialog.style.cssText = `
        background: white;
        border-radius: 16px;
        padding: 32px;
        width: 90%;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    dialog.innerHTML = `
        <h3 style="margin-bottom: 16px; font-size: 1.25rem; font-weight: 600; color: #1D1D1F;">${title}</h3>
        <p style="margin-bottom: 32px; color: #86868B; line-height: 1.5;">${message}</p>
        <div style="display: flex; gap: 16px;">
            <button class="cancel-btn" style="flex: 1; padding: 12px; border: 1px solid #D1D1D6; background: white; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.2s ease;">Cancel</button>
            <button class="confirm-btn" style="flex: 1; padding: 12px; background: #FF3B30; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.2s ease;">Delete</button>
        </div>
    `;
    
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
        overlay.style.opacity = '1';
        dialog.style.transform = 'scale(1)';
    }, 10);
    
    return new Promise((resolve) => {
        const confirmBtn = dialog.querySelector('.confirm-btn');
        const cancelBtn = dialog.querySelector('.cancel-btn');
        
        function cleanup() {
            overlay.style.opacity = '0';
            dialog.style.transform = 'scale(0.9)';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        }
        
        confirmBtn.addEventListener('click', () => {
            cleanup();
            resolve(true);
        });
        
        cancelBtn.addEventListener('click', () => {
            cleanup();
            resolve(false);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                cleanup();
                resolve(false);
            }
        });
    });
}

function handleFormSubmit(e) {
    // Form validation is handled by HTML5 and CSS
    // Add any additional custom validation here if needed
    showLoadingSpinner();
}

function showLoadingSpinner() {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Re-enable after form submission
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

function handleNotifications() {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');
    const seat = urlParams.get('seat');
    
    if (success) {
        let message = '';
        switch (success) {
            case 'booking_created':
                message = seat ? `Booking confirmed! Your seat number is ${seat}.` : 'Booking created successfully!';
                break;
            case 'booking_updated':
                message = 'Booking updated successfully!';
                break;
            case 'booking_deleted':
                message = 'Booking deleted successfully!';
                break;
            default:
                message = 'Operation completed successfully!';
        }
        showNotification(message, 'success');
    }
    
    if (error) {
        let message = '';
        switch (error) {
            case 'missing_fields':
                message = 'Please fill in all required fields.';
                break;
            case 'booking_full':
                message = 'Maximum booking capacity reached. Please try again later.';
                break;
            case 'booking_not_found':
                message = 'Booking not found.';
                break;
            case 'invalid_action':
                message = 'Invalid operation.';
                break;
            default:
                message = 'An error occurred. Please try again.';
        }
        showNotification(message, 'error');
    }
    
    // Clean URL
    if (success || error) {
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 24px;
        background: ${type === 'success' ? '#34C759' : type === 'error' ? '#FF3B30' : '#007AFF'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        z-index: 4000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active nav link
                    updateActiveNavLink(this);
                }
            }
        });
    });
}

function updateActiveNavLink(activeLink = null) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    if (activeLink) {
        activeLink.classList.add('active');
    } else {
        // Set first link as active by default
        if (navLinks.length > 0) {
            navLinks[0].classList.add('active');
        }
    }
}

function initFormValidation() {
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    if (!value) {
        showFieldError(field, 'This field is required');
    } else if (field.type === 'tel' && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
    }
}

function showFieldError(field, message) {
    clearFieldError({ target: field });
    
    const error = document.createElement('div');
    error.className = 'field-error';
    error.style.cssText = `
        color: #FF3B30;
        font-size: 0.875rem;
        margin-top: 4px;
        opacity: 0;
        transform: translateY(-5px);
        transition: all 0.2s ease;
    `;
    error.textContent = message;
    
    field.parentNode.appendChild(error);
    field.style.borderColor = '#FF3B30';
    
    setTimeout(() => {
        error.style.opacity = '1';
        error.style.transform = 'translateY(0)';
    }, 10);
}

function clearFieldError(e) {
    const field = e.target;
    const error = field.parentNode.querySelector('.field-error');
    if (error) {
        error.remove();
    }
    field.style.borderColor = '';
}

function isValidPhone(phone) {
    // Basic phone validation - adjust regex as needed
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Keyboard shortcuts (Apple-like)
document.addEventListener('keydown', function(e) {
    // Escape to close forms
    if (e.key === 'Escape') {
        const bookingSection = document.getElementById('booking-form');
        if (bookingSection && !bookingSection.classList.contains('hidden')) {
            hideBookingForm();
        }
    }
    
    // Cmd/Ctrl + K to open booking form
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        showBookingForm();
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe booking cards for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const bookingCards = document.querySelectorAll('.booking-card');
    bookingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});