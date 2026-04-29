/* 
   Hany & Belal — Premium Barbershop 
   Core Logic & Interactivity
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.padding = '15px 5%';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.85)';
            navbar.style.padding = '20px 5%';
        }
    });

    // 2. Real-Time Shop Status (Cairo Time: GMT+3)
    const updateStatus = () => {
        const now = new Date();
        const hour = now.getHours();
        const dot = document.querySelector('.dot');
        const statusText = document.querySelector('.status-header strong');
        
        // Shop is Open from 10:00 AM to 1:00 AM
        const isOpen = (hour >= 10 || hour < 1);
        
        if(dot && statusText) {
            if (isOpen) {
                dot.style.background = '#28a745';
                dot.style.boxShadow = '0 0 10px #28a745';
                statusText.innerText = "We're Open Now";
            } else {
                dot.style.background = '#ff4444';
                dot.style.boxShadow = '0 0 10px #ff4444';
                statusText.innerText = "We're Currently Closed";
            }
        }
    };

    // 3. Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize Status
    updateStatus();
    
    // Refresh status every minute
    setInterval(updateStatus, 60000);
});
