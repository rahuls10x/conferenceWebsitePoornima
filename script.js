document.addEventListener('DOMContentLoaded', function() {
    initScheduleTabs();
    initNewsletterForm();
    initScrollEffects();
    initButtonActions();
});

function initScheduleTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function initNewsletterForm() {
    const newsletterButton = document.querySelector('.newsletter button');
    const newsletterInput = document.querySelector('.newsletter input');

    if (newsletterButton) {
        newsletterButton.addEventListener('click', function() {
            const email = newsletterInput.value;
            if (email && validateEmail(email)) {
                alert('Thank you for subscribing!');
                newsletterInput.value = '';
            } else if (email) {
                alert('Please enter a valid email address');
            }
        });
    }

    if (newsletterInput) {
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterButton.click();
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function initScrollEffects() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

function initButtonActions() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const ticketButtons = document.querySelectorAll('.ticket-card');
    ticketButtons.forEach(card => {
        const button = card.querySelector('button:not(.tab-btn)');
        if (button) {
            button.addEventListener('click', function() {
                const ticketType = card.querySelector('h3').textContent;
                const price = card.querySelector('.ticket-price').textContent;
                handleTicketPurchase(ticketType, price);
            });
        }
    });
}

function handleTicketPurchase(ticketType, price) {
    alert(`You selected: ${ticketType} - ${price}\n\nProceeding to checkout...`);
}

function updateCountdown() {
    // time format (YYYY, MM-1, DD, HH, MM, SS)
    const targetTime = new Date(2026, 4, 23, 0, 0, 0);

    function updateTimer() {
        const now = new Date();
        const diff = targetTime - now;

        if (diff <= 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.querySelectorAll(".stat-number")[0].textContent = days;
        document.querySelectorAll(".stat-number")[1].textContent = hours;
        document.querySelectorAll(".stat-number")[2].textContent = minutes;
        document.querySelectorAll(".stat-number")[3].textContent = seconds;
    }

    setInterval(updateTimer, 1000);
    updateTimer();
}

updateCountdown();

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.schedule-card, .speaker-card, .sponsor-logo').forEach(el => {
    observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
