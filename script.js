// Modal functionality
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Close modal on click
document.querySelector('.close')?.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Section navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle nav link clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
        window.location.hash = sectionId; // Update URL hash
    });
});

// Load section based on URL hash
window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    showSection(hash);
});

// Handle hash change
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    showSection(hash);
});

// Trip Planner Form Submission
document.getElementById('trip-planner')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const duration = document.getElementById('duration').value;
    const preferences = document.getElementById('preferences').value;

    // Validate form
    if (!destination || !date || !duration) {
        showModal('Please fill in all required fields.');
        return;
    }

    if (duration < 1) {
        showModal('Duration must be at least 1 day.');
        return;
    }

    // Store data in localStorage
    localStorage.setItem('trip', JSON.stringify({
        destination,
        date,
        duration,
        preferences
    }));

    // Show confirmation modal
    showModal(`Trip to ${destination} planned successfully! Redirecting to itinerary...`);

    // Redirect to itinerary section after 2 seconds
    setTimeout(() => {
        showSection('itinerary');
        window.location.hash = 'itinerary';
        closeModal();
    }, 2000);
});

// Contact Form Submission
document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate form
    if (!name || !email || !message) {
        showModal('Please fill in all required fields.');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        showModal('Please enter a valid email address.');
        return;
    }

    // Show confirmation modal
    showModal('Your message has been sent successfully!');

    // Reset form
    this.reset();
});

// Itinerary Display
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#itinerary') {
        const trip = JSON.parse(localStorage.getItem('trip'));
        const itineraryDetails = document.getElementById('itinerary-details');
        const itineraryList = document.getElementById('itinerary-list');

        if (trip) {
            itineraryDetails.textContent = `Your trip to ${trip.destination} starting on ${trip.date} for ${trip.duration} days.`;
            
            // Generate detailed itinerary
            itineraryList.innerHTML = `
                <li>Day 1: Arrive in ${trip.destination}, check into your accommodation, and explore nearby attractions.</li>
                <li>Day 2: Take a guided city tour to visit iconic landmarks and enjoy local cuisine.</li>
                <li>Day 3: Dive into cultural experiences${trip.preferences ? ' (' + trip.preferences + ')' : ''}, such as museums or local markets.</li>
                ${trip.duration > 3 ? `<li>Day 4: Enjoy a free day for relaxation or optional activities like hiking or shopping.</li>` : ''}
                ${trip.duration > 4 ? `<li>Day 5: Depart from ${trip.destination} or extend your adventure!</li>` : ''}
            `;
            
            // Show modal
            showModal('Your itinerary is ready to view!');
        } else {
            itineraryDetails.textContent = 'No trip planned yet. Please use the planner to create one.';
        }
    }
});