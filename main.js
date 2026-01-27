// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll Effects
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const backToTop = document.querySelector('.back-to-top');

    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
        if (backToTop) backToTop.classList.add('visible');
    } else {
        nav.classList.remove('scrolled');
        if (backToTop) backToTop.classList.remove('visible');
    }

    reveal();
});

// Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 100;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}

// Testimonial Automatic Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const track = document.querySelector('.testimonial-track');

function rotateSlides() {
    if (!track || slides.length === 0) return;
    currentSlide = (currentSlide + 1) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

if (track && slides.length > 1) {
    setInterval(rotateSlides, 5000);
}

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all others
        document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('active'));
        // Toggle current
        if (!isActive) item.classList.add('active');
    });
});

// Blog Search
function searchBlog() {
    const input = document.getElementById('blogSearch');
    if (!input) return;
    const filter = input.value.toLowerCase();
    const cards = document.querySelectorAll('.blog-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(filter) ? "block" : "none";
    });
}

// Automatic Table of Contents
function generateTOC() {
    const tocList = document.querySelector('.toc-content ul');
    if (!tocList) return;

    tocList.innerHTML = '';
    const headers = document.querySelectorAll('article h2, article h3');
    if (headers.length === 0) {
        document.querySelector('.toc-container').style.display = 'none';
        return;
    }

    headers.forEach((header, index) => {
        const id = 'heading-' + index;
        header.id = id;

        const li = document.createElement('li');
        if (header.tagName === 'H3') {
            li.style.marginLeft = '20px';
            li.style.fontSize = '0.9em';
        }

        const a = document.createElement('a');
        a.href = '#' + id;
        a.textContent = header.textContent;

        a.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(id);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });

        li.appendChild(a);
        tocList.appendChild(li);
    });

    // Auto-open TOC on desktop, keep closed on mobile
    if (window.innerWidth > 768) {
        const content = document.querySelector('.toc-content');
        if (content) {
            content.style.display = 'block';
            content.classList.add('open');
            const icon = document.querySelector('.toc-title i');
            if (icon) icon.style.transform = 'rotate(180deg)';
        }
    }
}

function toggleTOC() {
    const content = document.querySelector('.toc-content');
    const icon = document.querySelector('.toc-title i');
    if (content) {
        const isOpen = content.classList.contains('open');
        if (isOpen) {
            content.style.display = 'none';
            content.classList.remove('open');
            if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
            content.style.display = 'block';
            content.classList.add('open');
            if (icon) icon.style.transform = 'rotate(180deg)';
        }
    }
}

// Initial Run
window.addEventListener('load', () => {
    reveal();
    generateTOC();
});
