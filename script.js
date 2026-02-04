// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Phone validation regex (optional, basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;

    // Form field validation functions
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        let isValid = true;
        let message = '';

        // Remove previous error state
        formGroup.classList.remove('error');

        // Check if field is required and empty
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = 'This field is required';
        }
        // Email specific validation
        else if (field.type === 'email' && field.value.trim()) {
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }
        // Phone specific validation (only if filled)
        else if (field.type === 'tel' && field.value.trim()) {
            if (!phoneRegex.test(field.value.trim())) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
        }
        // Select field validation
        else if (field.tagName === 'SELECT' && field.hasAttribute('required') && !field.value) {
            isValid = false;
            message = 'Please select an option';
        }

        // Show error if validation failed
        if (!isValid) {
            formGroup.classList.add('error');
            errorMessage.textContent = message;
        }

        return isValid;
    }

    // Add real-time validation on blur
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });

        // Remove error on input
        field.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        let isFormValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        // If form is valid, process submission
        if (isFormValid) {
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value.trim(),
                newsletter: document.getElementById('newsletter').checked
            };

            // Log form data (in production, you would send this to a server)
            console.log('Form submitted with data:', formData);

            // Simulate form submission
            submitForm(formData);
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Simulate form submission (replace with actual API call)
    function submitForm(data) {
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate API call with timeout
        setTimeout(() => {
            // Hide form and show success message
            form.style.display = 'none';
            successMessage.classList.add('show');

            // Reset form
            form.reset();
            btnText.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';

            // Optional: Hide success message and show form again after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
                form.style.display = 'block';
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 5000);

        }, 1500); // Simulate 1.5 second delay
    }

    // Character counter for message field (optional enhancement)
    const messageField = document.getElementById('message');
    const maxChars = 500;
    
    messageField.addEventListener('input', function() {
        const remaining = maxChars - this.value.length;
        if (remaining < 0) {
            this.value = this.value.substring(0, maxChars);
        }
    });
});
