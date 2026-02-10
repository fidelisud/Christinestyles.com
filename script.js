document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('#statistics');
    const counters = document.querySelectorAll('#statistics [data-count]');

    const animateCounter = (element, target, suffix) => {
        let count = 0;
        const increment = target / 100;
        const interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            element.textContent = Math.floor(count) + (suffix || '');
        }, 20);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const suffix = counter.textContent.includes('+') ? '+' : '';
                    if (target === 10000) {
                        animateCounter(counter, target / 1000, 'K+');
                    } else {
                        animateCounter(counter, target, suffix);
                    }
                });
                observer.unobserve(statsSection);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);

    const whatsappButton = document.querySelector('.whatsapp-button');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            window.open(whatsappButton.href, '_blank');
        });
    }
});

window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});