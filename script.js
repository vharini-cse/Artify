javascript
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // MOBILE MENU
    // =========================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        menuToggle.textContent =
            navLinks.classList.contains("active") ? "✕" : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.textContent = "☰";
        });
    });


    // =========================
    // GALLERY FILTER
    // =========================

    const filterButtons = document.querySelectorAll(".filter-btn");
    const artCards = document.querySelectorAll(".art-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedCategory = button.dataset.filter;

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            artCards.forEach(card => {

                const category = card.dataset.category;

                if (
                    selectedCategory === "all" ||
                    category === selectedCategory
                ) {
                    card.classList.remove("hidden");

                    setTimeout(() => {
                        card.classList.add("reveal");
                    }, 50);

                } else {
                    card.classList.add("hidden");
                    card.classList.remove("reveal");
                }

            });
        });

    });


    // =========================
    // LIKE ARTWORK
    // =========================

    const likeButtons = document.querySelectorAll(".like-btn");

    let likedArtwork =
        JSON.parse(localStorage.getItem("artifyLikedArtwork")) || [];

    likeButtons.forEach((button, index) => {

        // Restore previously liked artwork
        if (likedArtwork.includes(index)) {
            button.classList.add("liked");
            button.textContent = "♥";
        }

        button.addEventListener("click", () => {

            if (likedArtwork.includes(index)) {

                // Remove like
                likedArtwork = likedArtwork.filter(
                    item => item !== index
                );

                button.classList.remove("liked");
                button.textContent = "♡";

            } else {

                // Add like
                likedArtwork.push(index);

                button.classList.add("liked");
                button.textContent = "♥";

            }

            localStorage.setItem(
                "artifyLikedArtwork",
                JSON.stringify(likedArtwork)
            );

        });

    });


    // =========================
    // CONTACT FORM
    // =========================

    const contactForm = document.getElementById("contactForm");
    const toast = document.getElementById("toast");

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const project = document.getElementById("project").value;
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !project || !message) {
            showToast("Please complete all fields.");
            return;
        }

        showToast("Your message has been sent successfully!");

        contactForm.reset();

    });


    // =========================
    // TOAST MESSAGE
    // =========================

    function showToast(message) {

        toast.querySelector("p").textContent = message;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3500);

    }


    // =========================
    // FEATURED ARTWORK
    // =========================

    const featuredBtn = document.getElementById("featuredBtn");

    featuredBtn.addEventListener("click", () => {

        showToast(
            "Featured artwork: Color Stories — Acrylic on Canvas."
        );

    });


    // =========================
    // SCROLL REVEAL
    // =========================

    const revealElements = document.querySelectorAll(
        ".art-card, .timeline-item, .featured-card, .about-grid"
    );

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // =========================
    // NAVBAR SCROLL EFFECT
    // =========================

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            navbar.style.boxShadow =
                "0 8px 30px rgba(40, 25, 70, 0.08)";

        } else {

            navbar.style.boxShadow = "none";

        }

    });


    // =========================
    // ACTIVE NAVIGATION
    // =========================

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navItems.forEach(item => {

            item.style.color = "";

            if (
                item.getAttribute("href") ===
                `#${currentSection}`
            ) {
                item.style.color = "#7c3aed";
            }

        });

    });


    // =========================
    // ART CARD HOVER
    // =========================

    artCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transition = "transform 0.3s ease";
        });

    });


    // =========================
    // INITIAL ART REVEAL
    // =========================

    setTimeout(() => {

        document.querySelectorAll(".art-card").forEach(card => {
            card.classList.add("reveal");
        });

    }, 300);

});
