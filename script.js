// Trip Planner Form Validation and Submission
document.getElementById('trip-planner')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const duration = document.getElementById('duration').value;
    const preferences = document.getElementById('preferences').value;

    // Validate form
    if (!destination || !date || !duration) {
        alert('Please fill in all required fields.');
        return;
    }

    if (duration < 1) {
        alert('Duration must be at least 1 day.');
        return;
    }

    // Store data in localStorage for itinerary page
    localStorage.setItem('trip', JSON.stringify({
        destination,
        date,
        duration,
        preferences
    }));

    // Show confirmation popup
    alert(`Trip to ${destination} planned successfully!`);

    // Redirect to itinerary page
    window.location.href = 'itinerary.html';
});

// Contact Form Validation and Submission
document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate form
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
    }

    // Show confirmation popup
    alert('Your message has been sent successfully!');

    // Reset form
    this.reset();
});

// Itinerary Page: Display Trip Details
if (window.location.pathname.includes('itinerary.html')) {
    window.onload = function() {
        const trip = JSON.parse(localStorage.getItem('trip'));
        const itineraryDetails = document.getElementById('itinerary-details');
        const itineraryList = document.getElementById('itinerary-list');

        if (trip) {
            itineraryDetails.textContent = `Your trip to ${trip.destination} starting on ${trip.date} for ${trip.duration} days.`;
            
            // Generate sample itinerary
            itineraryList.innerHTML = `
                <li>Day 1: Arrive in ${trip.destination}, check into hotel</li>
                <li>Day 2: City tour and local attractions</li>
                <li>Day 3: Explore cultural sites${trip.preferences ? ' (' + trip.preferences + ')' : ''}</li>
                ${trip.duration > 3 ? `<li>Day 4: Free day or optional activities</li>` : ''}
            `;
            
            // Show popup
            alert('Your itinerary is ready to view!');
        } else {
            itineraryDetails.textContent = 'No trip planned yet. Please use the planner to create one.';
        }
    };
}