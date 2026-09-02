// ===============================
// Blood Donation System
// User Registration
// reg.js
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        // ===============================
        // Get Form Values
        // ===============================

        const fullName = document.getElementById("fullName").value.trim();

        const email = document.getElementById("email").value.trim().toLowerCase();

        const phone = document.getElementById("phone").value.trim();

        const dob = document.getElementById("dob").value;

        const password = document.getElementById("password").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        // ===============================
        // Validation
        // ===============================

        if (
            fullName === "" ||
            email === "" ||
            phone === "" ||
            dob === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            alert("Please fill all fields.");
            return;
        }

        // Phone Validation

        const phonePattern = /^[0-9]{10}$/;

        if (!phonePattern.test(phone)) {

            alert("Phone number must contain exactly 10 digits.");

            return;

        }

        // Password Length

        if (password.length < 6) {

            alert("Password must be at least 6 characters.");

            return;

        }

        // Password Match

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        // ===============================
        // LocalStorage
        // ===============================

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Duplicate Email Check

        const emailExists = users.some(function (user) {

            return user.email === email;

        });

        if (emailExists) {

            alert("This email is already registered. Please login.");

            return;

        }

        // ===============================
        // Create User Object
        // ===============================

       const user = {

    fullName: fullName,

    email: email,

    phone: phone,

    dob: dob,

    password: password,

    role: "member",

    registeredDate: new Date().toLocaleDateString()

};

        // ===============================
        // Save User
        // ===============================

        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));

        // ===============================
        // Success Message
        // ===============================

        alert("Registration Successful!\n\nNow login using your Email and Password.");

registerForm.reset();

window.location.href = "login.html";

    });

});

// ==========================================
// TERMS AND CONDITIONS DIALOG
// ==========================================

const termsLink = document.getElementById("termsLink");
const termsOverlay = document.getElementById("termsOverlay");
const closeTerms = document.getElementById("closeTerms");
const closeTermsBtn = document.getElementById("closeTermsBtn");
const acceptTerms = document.getElementById("acceptTerms");
const agreeCheckbox = document.getElementById("agree");


// Open Terms Dialog
termsLink.addEventListener("click", function (event) {

    event.preventDefault();

    termsOverlay.classList.add("active");

});


// Close using X button
closeTerms.addEventListener("click", function () {

    termsOverlay.classList.remove("active");

});


// Close using Close button
closeTermsBtn.addEventListener("click", function () {

    termsOverlay.classList.remove("active");

});


// Accept Terms
acceptTerms.addEventListener("click", function () {

    agreeCheckbox.checked = true;

    termsOverlay.classList.remove("active");

});


// Close when clicking outside dialog
termsOverlay.addEventListener("click", function (event) {

    if (event.target === termsOverlay) {

        termsOverlay.classList.remove("active");

    }

});
