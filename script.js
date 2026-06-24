document.addEventListener('DOMContentLoaded', () => {

    // 1. Structural Application Initializer Loading Handler
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 400);
    });

    // 2. Dual Layer Custom Cursor Matrix Implementation
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // Scaled cursor hover tracking interactions
    const interactiveElements = document.querySelectorAll('a, button, .glass-panel, input, textarea');
    interactiveElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'var(--neon-blue)';
        });
        elem.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--neon-purple)';
        });
    });

    // 3. Responsive Menu Controller (Hamburger Logic)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 4. Scroll Tracking Progress and Sticky Header Metric Tracking
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = progress + '%';
    });

    // 5. Scroll Reveal Intersection Observers
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger localized skill indicator progression lines on entry exposure
                if(entry.target.classList.contains('skill-card')) {
                    const dynamicLine = entry.target.querySelector('.progress');
                    // Reset value width assignment
                    dynamicLine.style.width = dynamicLine.getAttribute('style').split(':')[1].trim();
                }
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });

    // 6. Native Mathematical Background Noise/Particle Rendering Engine
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particleArray = [];
    const numberOfParticles = 65;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, 0.2)' : 'rgba(155, 81, 224, 0.2)';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particleArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particleArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
            particleArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
});