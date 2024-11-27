function validateForm() {
    let valid = true;

    // First Name 
    let firstName = document.getElementById("first-name").value.trim();
    let firstNameError = document.getElementById("first-name-error");
    if (firstName === "") {
        firstNameError.style.display = "block";
        valid = false;
    } else {
        firstNameError.style.display = "none";
    }

    // Last Name 
    let lastName = document.getElementById("last-name").value.trim();
    let lastNameError = document.getElementById("last-name-error");
    if (lastName === "") {
        lastNameError.style.display = "block";
        valid = false;
    } else {
        lastNameError.style.display = "none";
    }

    // Email 
    let email = document.getElementById("email").value.trim();
    let emailError = document.getElementById("email-error");
    let mailingListChecked = document.getElementById("mailing-list").checked;

    if (mailingListChecked && email === "") {
        emailError.style.display = "block";
        valid = false;
    } else if (email !== "" && (!email.includes("@") || !email.includes("."))) {
        emailError.style.display = "block";
        valid = false;
    } else {
        emailError.style.display = "none";
    }

    // LinkedIn URL 
    let linkedIn = document.getElementById("linkedin").value.trim();
    let linkedInError = document.getElementById("linkedin-error");
    if (linkedIn !== "" && !linkedIn.startsWith("https://linkedin.com/in/")) {
        linkedInError.style.display = "block";
        valid = false;
    } else {
        linkedInError.style.display = "none";
    }

    // How we met 
    let howWeMet = document.getElementById("menu").value;
    let howWeMetError = document.getElementById("menu-error");
    if (howWeMet === "none") {
        howWeMetError.style.display = "block";
        valid = false;
    } else {
        howWeMetError.style.display = "none";
    }

    // Toggle other field 
    if (howWeMet === "other") {
        document.getElementById("other-row").style.display = "block";
    } else {
        document.getElementById("other-row").style.display = "none";
    }

    // If valid go to thank you page
    if (valid) {
        document.querySelector('form').submit();
    }

    return false; // Prevent form submission for client-side validation
}

document.querySelector('form').addEventListener('submit', validateForm);

// Add event listener to toggle email format visibility when mailing-list checkbox is checked
document.getElementById("mailing-list").addEventListener("change", function() {
    let emailFormatDiv = document.getElementById("email-format");
    if (this.checked) {
        emailFormatDiv.style.display = "block";
    } else {
        emailFormatDiv.style.display = "none";
    }
});

// Add event listener to the how we met dropdown.
document.getElementById("menu").addEventListener("change", function() {
    if (this.value === "other") {
        document.getElementById("other-row").style.display = "block";
    } else {
        document.getElementById("other-row").style.display = "none";
    }
});
