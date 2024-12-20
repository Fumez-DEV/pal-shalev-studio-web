// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
        event.preventDefault();
        const targetSection = document.querySelector(anchor.getAttribute("href"));
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});

function scrollToContact() {
    // Get the contact section by its ID
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth', // Smooth scroll animation
            block: 'start' // Align to the top of the section
        });
    }
}

// Scroll to Services Section
function scrollToServices() {
    const servicesSection = document.getElementById("services");
    servicesSection.scrollIntoView({ behavior: "smooth" });
}

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Scroll to Specific Section
const scrollToSection = id => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
};

// Update Footer with Current Year
const currentYearElement = document.getElementById("current-year");
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

const imageElement = document.getElementById('studio-image');

// Create hover image element
const hoverImage = document.createElement('img');
hoverImage.src = imageElement.getAttribute('data-hover-src');
hoverImage.classList.add('hover-effect');

// Append hover image as a sibling
imageElement.parentElement.appendChild(hoverImage);

// Optionally, remove hover image on page unload (cleanup)
window.addEventListener('beforeunload', () => {
    hoverImage.remove();
});

document.addEventListener("DOMContentLoaded", () => {
    const testimonials = [
        {
            text: "השירות היה מצוין ומקצועי. ממליץ בחום לכל מי שמחפש חווית אימון איכותית.",
            author: "דניאל כהן",
        },
        {
            text: "הסטודיו נקי ומזמין, והמדריכים פשוט מעולים! תודה רבה על הליווי הצמוד.",
            author: "עדי לוי",
        },
        {
            text: "פאל פיטנס קלאב שינה לי את החיים. לא האמנתי שאוכל להגיע לתוצאות כאלו.",
            author: "רוני ישראלי",
        },
        {
            text: "האווירה בסטודיו מדהימה, וזה בדיוק מה שהייתי צריך כדי להיכנס לכושר.",
            author: "אבי יוסף",
        },
    ];

    const display = document.getElementById("testimonial-display");
    const prevButton = document.getElementById("prev-testimonial");
    const nextButton = document.getElementById("next-testimonial");

    let currentIndex = 0;

    // Render Testimonials
    const renderTestimonials = () => {
        display.innerHTML = testimonials
            .map(
                (testimonial, index) => `
                <div class="testimonial-item" style="display: ${
                    index === currentIndex ? "block" : "none"
                };">
                    <p>"${testimonial.text}"</p>
                    <div class="author">- ${testimonial.author}</div>
                </div>
            `
            )
            .join("");
    };

    // Navigate Testimonials
    const showNextTestimonial = () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        renderTestimonials();
    };

    const showPrevTestimonial = () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        renderTestimonials();
    };

    // Event Listeners
    nextButton.addEventListener("click", showNextTestimonial);
    prevButton.addEventListener("click", showPrevTestimonial);

    // Auto Rotate Testimonials
    setInterval(showNextTestimonial, 10000); // Rotate every 10 seconds

    // Initial Render
    renderTestimonials();
});


// Contact Form Submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", async event => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        if (!data.name || !data.email || !data.message) {
            showAlert("אנא מלא את כל השדות לפני שליחת הטופס.", "error");
            return;
        }

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                contactForm.reset();
                showAlert("תודה! הודעתך נשלחה בהצלחה.", "success");
            } else {
                throw new Error("Failed to send the form.");
            }
        } catch {
            showAlert("אירעה שגיאה. אנא נסה שנית.", "error");
        }
    });
}

// Display Alert Messages
function showAlert(message, type) {
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    document.body.appendChild(alertBox);

    setTimeout(() => (alertBox.style.opacity = "1"), 100);
    setTimeout(() => {
        alertBox.style.opacity = "0";
        setTimeout(() => alertBox.remove(), 500);
    }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
    const faqContainer = document.getElementById("faq-container");
    const jsonPath = "json/faq-data.json"; // Path to your JSON file

    // Load FAQ Data
    const loadFAQ = async () => {
        try {
            const response = await fetch(jsonPath);
            const data = await response.json();

            // Check if FAQs are already stored and not expired
            const storedFAQs = localStorage.getItem("selectedFAQs");
            const lastUpdate = localStorage.getItem("lastUpdate");

            const today = new Date();
            const midnight = new Date(today);
            midnight.setHours(0, 0, 0, 0);

            if (storedFAQs && lastUpdate && new Date(lastUpdate) >= midnight) {
                // Use stored FAQs if it's still the same day
                renderFAQs(JSON.parse(storedFAQs));
            } else {
                // Select 4 random FAQs and store them
                const selectedFAQs = data.sort(() => Math.random() - 0.5).slice(0, 4);
                localStorage.setItem("selectedFAQs", JSON.stringify(selectedFAQs));
                localStorage.setItem("lastUpdate", new Date());
                renderFAQs(selectedFAQs);
            }
        } catch (error) {
            console.error("Failed to load FAQ data:", error);
        }
    };

    // Render FAQs
    const renderFAQs = (faqs) => {
        // Clear existing FAQs
        faqContainer.innerHTML = "";

        // Render provided FAQs
        faqs.forEach(faq => {
            const faqItem = document.createElement("div");
            faqItem.className = "faq-item";

            const question = document.createElement("button");
            question.className = "faq-question";
            question.textContent = faq.question;

            const answer = document.createElement("div");
            answer.className = "faq-answer";
            answer.textContent = faq.answer;

            // Add click functionality to toggle answer visibility
            question.addEventListener("click", () => {
                const isActive = answer.style.display === "block";
                document.querySelectorAll(".faq-answer").forEach(el => el.style.display = "none");
                document.querySelectorAll(".faq-question").forEach(el => el.classList.remove("active"));

                if (!isActive) {
                    answer.style.display = "block";
                    question.classList.add("active");
                }
            });

            faqItem.appendChild(question);
            faqItem.appendChild(answer);
            faqContainer.appendChild(faqItem);
        });
    };

    // Initial load
    loadFAQ();
});
