// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Smooth Scroll Helper
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Tracking System
function trackShipment() {
    const trackingInput = document.getElementById('trackingInput');
    const trackingNumber = trackingInput.value.trim();

    if (!trackingNumber) {
        alert('Please enter a tracking number');
        return;
    }

    // Simulate tracking data
    const trackingData = {
        id: trackingNumber,
        status: Math.random() > 0.5 ? 'in-transit' : 'delivered',
        destination: ['Los Angeles, USA', 'Chicago, USA', 'Miami, USA', 'Seattle, USA'][Math.floor(Math.random() * 4)],
        estimatedDelivery: generateRandomDate()
    };

    // Update tracking display
    document.getElementById('trackingId').textContent = `Tracking #${trackingData.id}`;
    document.getElementById('trackingStatus').textContent = trackingData.status === 'in-transit' ? 'In Transit' : 'Delivered';
    document.getElementById('trackingStatus').className = `status-badge ${trackingData.status}`;
    document.getElementById('destination').textContent = trackingData.destination;
    document.getElementById('estimatedDelivery').textContent = trackingData.estimatedDelivery;

    // Set timeline dates
    const today = new Date();
    document.getElementById('timelineDate1').textContent = formatDate(new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000));
    document.getElementById('timelineDate2').textContent = formatDate(new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000));
    
    if (trackingData.status === 'in-transit') {
        document.getElementById('timelineDate3').textContent = 'Estimated tomorrow';
        document.getElementById('dot3').classList.add('active');
        document.getElementById('dot4').classList.remove('active');
    } else {
        document.getElementById('timelineDate3').textContent = formatDate(new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000));
        document.getElementById('timelineDate4').textContent = formatDate(today);
        document.getElementById('dot3').classList.add('active');
        document.getElementById('dot4').classList.add('active');
    }

    // Show result
    document.getElementById('trackingResult').classList.remove('hidden');
    document.getElementById('trackingResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Quote Calculator
function calculateQuote() {
    const weight = parseFloat(document.getElementById('weight').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const shippingType = document.getElementById('shippingType').value;
    const insurance = document.getElementById('insurance').value;

    if (!weight || !distance) {
        alert('Please fill in all fields');
        return;
    }

    // Calculate base rate (example: $1 per pound per 100 miles)
    let baseRate = (weight * distance / 100) * 1.5;

    // Add shipping method surcharge
    let methodCost = 0;
    switch(shippingType) {
        case 'express':
            methodCost = 50;
            break;
        case 'air':
            methodCost = 150;
            break;
        case 'ocean':
            methodCost = 200;
            break;
    }

    // Calculate insurance if selected
    let insuranceCost = 0;
    if (insurance === 'yes') {
        insuranceCost = (baseRate + methodCost) * 0.05;
    }

    const totalCost = baseRate + methodCost + insuranceCost;

    // Display results
    document.getElementById('baseRate').textContent = '$' + baseRate.toFixed(2);
    document.getElementById('methodCost').textContent = '$' + methodCost.toFixed(2);
    document.getElementById('insuranceCost').textContent = '$' + insuranceCost.toFixed(2);
    document.getElementById('totalCost').textContent = '$' + totalCost.toFixed(2);

    // Show result
    document.getElementById('quoteResult').classList.remove('hidden');
    document.getElementById('quoteResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Request Quote
function requestQuote() {
    const totalCost = document.getElementById('totalCost').textContent;
    scrollToSection('contact');
    
    // Pre-fill contact form (optional enhancement)
    const firstInput = document.querySelector('.contact-form input');
    if (firstInput) {
        firstInput.focus();
    }
}

// Pricing Subscribe
function subscribeToPrice(planName) {
    alert(`Thank you! You've selected the ${planName} plan. Redirecting to checkout...`);
    // In a real application, this would redirect to a payment system
    scrollToSection('contact');
}

// Contact Form Submission
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = form.querySelector('input[placeholder="Your Name"]').value;
    const email = form.querySelector('input[placeholder="Your Email"]').value;
    const company = form.querySelector('input[placeholder="Company Name"]').value;
    const service = form.querySelector('select').value;
    const message = form.querySelector('textarea').value;

    // Validate
    if (!name || !email || !company || !service || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Simulate form submission
    console.log({
        name,
        email,
        company,
        service,
        message,
        timestamp: new Date().toISOString()
    });

    // Show success message
    alert(`Thank you, ${name}! We've received your message and will get back to you within 24 hours.`);
    form.reset();
}

// Utility Functions
function generateRandomDate() {
    const today = new Date();
    const daysToAdd = Math.floor(Math.random() * 7) + 1;
    const deliveryDate = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    return formatDate(deliveryDate);
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Navigation highlight on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInDown 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards, testimonials, etc.
document.querySelectorAll('.service-card, .testimonial-card, .blog-card, .team-card, .pricing-card').forEach(card => {
    observer.observe(card);
});

// Allow Enter key to trigger tracking
document.getElementById('trackingInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        trackShipment();
    }
});

// Blog links (demo functionality)
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Blog article coming soon! In a real application, this would navigate to the full article.');
    });
});

// Social links (demo functionality)
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Follow us on ' + link.textContent + '!');
    });
});

// Initialize
console.log('LogisticsPro website loaded successfully!');
