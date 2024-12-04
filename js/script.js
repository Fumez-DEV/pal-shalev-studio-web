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

// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
}

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

// FAQ Toggle Functionality
document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isActive = answer && answer.style.display === "block";

        // Close all other answers
        document.querySelectorAll(".faq-answer").forEach(el => (el.style.display = "none"));
        document.querySelectorAll(".faq-question").forEach(el => el.classList.remove("active"));

        // Toggle current answer
        if (answer && !isActive) {
            answer.style.display = "block";
            question.classList.add("active");
        }
    });
});
