/* ==========================================
   Blood Donation System
   app.js
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =============================
       MOBILE MENU
    ============================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", function () {

            navbar.classList.toggle("active");

        });

    }

    /* =============================
       ACTIVE NAVIGATION
    ============================= */

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".navbar a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.classList.add("active");

        }

    });

    /* =============================
       BACK TO TOP BUTTON
    ============================= */

    const topBtn = document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {

                topBtn.style.display = "block";

            } else {

                topBtn.style.display = "none";

            }

        });

        topBtn.addEventListener("click", function () {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }

    /* =============================
       FOOTER YEAR
    ============================= */

    const year = document.getElementById("year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

    /* =============================
       HOME PAGE DONOR COUNT
    ============================= */

    const donorCount = document.getElementById("donorCount");

    if (donorCount) {

        let donors = JSON.parse(localStorage.getItem("donors")) || [];

        donorCount.textContent = donors.length;

    }

    /* =============================
       SIMPLE FADE ANIMATION
    ============================= */

    const cards = document.querySelectorAll(
        ".service-card, .process-card, .stat-card, .faq-card, .contact-box"
    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.2
    });

    cards.forEach(card => {

        observer.observe(card);

    });

});