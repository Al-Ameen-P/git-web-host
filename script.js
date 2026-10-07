document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Only apply smooth scroll if the link is an anchor on the same page (like #inventory)
            if (targetId !== "#") {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add click events to the "View Details" buttons
    const detailButtons = document.querySelectorAll('.btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Placeholder action - this would normally link to a dedicated car page
            alert('Detailed view coming soon! Contact our dealership to book a test drive.');
        });
    });

});
