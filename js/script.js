// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

    // Get the current year
    const currentYear = new Date().getFullYear();
    // Update the span with ID 'current-year' to the current year
    document.getElementById('current-year').textContent = currentYear;


// Add event listener for form submission
document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Select form and inputs
    const form = event.target;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Simple validation (check if fields are empty)
    if (!name || !email || !message) {
        alert("אנא מלא את כל השדות לפני שליחת הטופס.");
        return;
    }

    try {
        // Send form data using Formspree
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { Accept: "application/json" },
        });

        // Handle response
        if (response.ok) {
            form.reset(); // Clear the form fields
            showAlert("תודה! הודעתך נשלחה בהצלחה.", "success");
        } else {
            throw new Error("Failed to send the form");
        }
    } catch (error) {
        showAlert("אירעה שגיאה. אנא נסה שנית.", "error");
    }
});

function showAlert(message, type) {
    // Create alert element
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`; // Add success or error class

    // Append alert to the body
    document.body.appendChild(alertBox);

    // Make alert visible and trigger fade-in animation
    setTimeout(() => {
        alertBox.style.display = "block";
        alertBox.style.opacity = "1";
    }, 100);

    // Automatically remove the alert after 5 seconds
    setTimeout(() => {
        alertBox.style.opacity = "0"; // Trigger fade-out animation
        setTimeout(() => {
            alertBox.remove(); // Remove from DOM after fade-out
        }, 500);
    }, 5000);
}
