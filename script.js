/* 
   Hany & Belal Premium Barbershop 
   Global Styles & Variables 
*/
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@300;400;500;600&display=swap');

:root {
    --gold: #C9A84C;
    --gold-hover: #E8C060;
    --dark: #111111;
    --darker: #0A0A0A;
    --light-bg: #F9F7F2;
    --text-white: #FFFFFF;
    --text-muted: #A09880;
    --border: rgba(255, 255, 255, 0.1);
    --font-heading: 'Playfair Display', serif;
    --font-body: 'Inter', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-body);
    background: var(--dark);
    color: var(--text-white);
    line-height: 1.6;
    overflow-x: hidden;
}

/* Reusable Components */
.gold-text { color: var(--gold); }
.section-tag {
    color: var(--gold);
    font-size: 0.8rem;
    letter-spacing: 2px;
    font-weight: 600;
    text-transform: uppercase;
    display: block;
    margin-bottom: 12px;
}

.btn {
    padding: 14px 28px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    font-size: 0.95rem;
}

.btn-gold { background: var(--gold); color: #000; border: none; }
.btn-gold:hover { background: var(--gold-hover); transform: translateY(-3px); box-shadow: 0 10px 20px rgba(201, 168, 76, 0.3); }

.btn-outline-gold { border: 1px solid var(--gold); color: var(--gold); }
.btn-outline-gold:hover { background: var(--gold); color: #000; }

.btn-dark { background: #1A1A1A; color: white; border: none; }
.btn-dark:hover { background: #333; }

/* Navbar */
.navbar {
    position: fixed;
    width: 100%;
    z-index: 1000;
    padding: 25px 5%;
    transition: all 0.4s ease;
    background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%);
}

.navbar.scrolled {
    background: rgba(10, 10, 10, 0.95);
    padding: 15px 5%;
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(10px);
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
}

.logo-text h1 {
    font-family: var(--font-heading);
    font-size: 1.4rem;
    color: white;
    line-height: 1;
}

.logo-text span {
    font-size: 0.65rem;
    letter-spacing: 3px;
    color: var(--text-muted);
    text-transform: uppercase;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 30px;
    list-style: none;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.3s;
}

.nav-links a:hover { color: var(--gold); }

.btn-fb-mini {
    border: 1px solid rgba(201, 168, 76, 0.4);
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 0.8rem !important;
    color: var(--gold) !important;
}

/* Hero Section */
.hero {
    height: 100vh;
    min-height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    background: url('image_6cae1b.jpg') center/cover no-repeat;
}

.hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
}

.hero-content {
    position: relative;
    z-index: 2;
    max-width: 1000px;
    padding: 0 5%;
}

.hero-badge {
    border: 1px solid var(--gold);
    background: rgba(201, 168, 76, 0.1);
    color: var(--gold);
    padding: 6px 20px;
    border-radius: 50px;
    font-size: 0.8rem;
    display: inline-block;
    margin-bottom: 25px;
}

.hero h1 {
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 8vw, 5.5rem);
    line-height: 1.1;
    margin-bottom: 20px;
}

.hero .subtitle {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: #CCC;
    max-width: 700px;
    margin: 0 auto 40px;
}

.hero-cta-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
}

.phone-link {
    display: flex;
    align-items: center;
    gap: 12px;
    color: white;
    text-decoration: none;
    font-weight: 600;
}

.phone-icon-circle {
    width: 48px;
    height: 48px;
    border: 1.5px solid rgba(255,255,255,0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.trust-bar {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-top: 60px;
    font-size: 0.85rem;
    color: var(--text-muted);
}

.trust-bar .sep { width: 1px; height: 15px; background: rgba(255,255,255,0.1); }

/* Services Section (Light) */
.services-section {
    background: var(--light-bg);
    color: #111;
    padding: 100px 5%;
    text-align: center;
}

.services-section h2 {
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 5vw, 3.8rem);
    margin-bottom: 20px;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 50px auto;
}

.service-card {
    background: white;
    padding: 40px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.04);
    transition: 0.3s;
}

.service-card:hover { transform: translateY(-10px); }

.service-card .icon-box {
    background: var(--dark);
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 1.5rem;
}

/* Team Section (Diagonal Pattern) */
.team-section {
    padding: 100px 5%;
    background-color: #0F0F0F;
    background-image: repeating-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.02) 0px,
        rgba(255, 255, 255, 0.02) 1px,
        transparent 1px,
        transparent 10px
    );
    text-align: center;
}

.team-section h2 {
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    margin-bottom: 50px;
}

.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 30px;
    max-width: 1300px;
    margin: 0 auto 50px;
}

.barber-card { text-align: center; }

.barber-photo {
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    height: 320px;
    margin-bottom: 20px;
}

.barber-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s;
}

.barber-card:hover img { transform: scale(1.1); }

.barber-label {
    position: absolute;
    bottom: 12px;
    left: 12px;
    background: var(--gold);
    color: #000;
    font-size: 0.7rem;
    font-weight: 800;
    padding: 4px 12px;
    border-radius: 4px;
    text-transform: uppercase;
}

.barber-card h3 { font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 4px; }
.barber-card p { color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }

/* Final CTA Section */
.final-cta {
    padding: 120px 5%;
    text-align: center;
    background: linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('image_6caa00.jpg') center/cover;
    position: relative;
}

.location-tag {
    background: rgba(201, 168, 76, 0.15);
    color: var(--gold);
    padding: 6px 16px;
    border-radius: 50px;
    font-size: 0.85rem;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 25px;
}

.cta-info-footer {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 50px;
    color: var(--text-muted);
    font-size: 0.85rem;
}

/* Footer */
footer {
    background: #080808;
    padding: 80px 5% 40px;
    border-top: 1px solid var(--border);
}

.footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
    gap: 50px;
    max-width: 1400px;
    margin: 0 auto;
}

.footer-brand p { margin: 20px 0; color: var(--text-muted); font-size: 0.95rem; }

.footer-grid h4 {
    color: var(--gold);
    font-size: 1.1rem;
    margin-bottom: 25px;
    font-family: var(--font-heading);
}

.footer-grid ul { list-style: none; }
.footer-grid ul li { margin-bottom: 12px; }
.footer-grid ul a { color: var(--text-muted); text-decoration: none; transition: 0.3s; }
.footer-grid ul a:hover { color: var(--gold); }

.status-badge {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
}

.status-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
}

.status-dot {
    width: 8px;
    height: 8px;
    background: #28a745;
    border-radius: 50%;
    box-shadow: 0 0 10px #28a745;
}

.status-badge p { font-size: 0.8rem; color: #777; line-height: 1.4; }

/* Mobile Menu */
.hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
}

.hamburger span {
    display: block;
    width: 25px;
    height: 2px;
    background: var(--gold);
    transition: 0.3s;
}

@media (max-width: 1024px) {
    .footer-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 768px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .hero-cta-group { flex-direction: column; }
    .footer-grid { grid-template-columns: 1fr; gap: 40px; }
    .trust-bar, .cta-info-footer { flex-wrap: wrap; gap: 15px; }
    .trust-bar .sep { display: none; }
}
