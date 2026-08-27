// ==========================================
// MEMBER LOGIN SYSTEM
// login.js
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // GET ELEMENTS
    // ==========================================

    const loginForm = document.getElementById("loginForm");

    const loginEmail = document.getElementById("loginEmail");

    const loginPassword = document.getElementById("loginPassword");

    const showPasswordBtn =
        document.getElementById("showPasswordBtn");


    // ==========================================
    // SHOW / HIDE PASSWORD
    // ==========================================

    if (showPasswordBtn) {

        showPasswordBtn.addEventListener("click", function () {

            if (loginPassword.type === "password") {

                loginPassword.type = "text";

                showPasswordBtn.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                loginPassword.type = "password";

                showPasswordBtn.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

            }

        });

    }


    // ==========================================
    // LOGIN
    // ==========================================

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();


            const email =
                loginEmail.value.trim().toLowerCase();

            const password =
                loginPassword.value;


            // Check empty fields

            if (email === "" || password === "") {

                alert("Please enter your email and password.");

                return;

            }


            // ==========================================
            // GET REGISTERED MEMBERS
            // ==========================================

            let users =
                JSON.parse(localStorage.getItem("users")) || [];


            // Make sure users is an array

            if (!Array.isArray(users)) {

                users = [];

            }


            // ==========================================
            // FIND USER
            // ==========================================

            const user = users.find(function (item) {

                return (

                    item.email &&
                    item.email.toLowerCase() === email &&
                    item.password === password

                );

            });


            // ==========================================
            // USER NOT FOUND
            // ==========================================

            if (!user) {

                alert(
                    "Invalid email or password.\n\n" +
                    "Only registered members can login."
                );

                return;

            }


            // ==========================================
            // LOGIN SUCCESS
            // ==========================================

            localStorage.setItem(
                "adminLogin",
                "true"
            );


            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );


            // Success message

            alert("Login Successful!");


            // ==========================================
            // OPEN ADMIN PAGE
            // ==========================================

            window.location.href = "admin.html";

        });

    }


    // ==========================================
    // FORGOT PASSWORD
    // ==========================================

    const forgotBtn =
        document.getElementById("forgotBtn");

    const forgotModal =
        document.getElementById("forgotModal");

    const closeModal =
        document.getElementById("closeModal");


    if (forgotBtn) {

        forgotBtn.addEventListener("click", function (e) {

            e.preventDefault();

            forgotModal.classList.add("show");

        });

    }


    if (closeModal) {

        closeModal.addEventListener("click", function () {

            forgotModal.classList.remove("show");

        });

    }


    // Close modal by clicking outside

    window.addEventListener("click", function (e) {

        if (e.target === forgotModal) {

            forgotModal.classList.remove("show");

        }

    });


    // ==========================================
    // OTP METHOD
    // ==========================================

    const otpMethod =
        document.getElementById("otpMethod");

    const emailDiv =
        document.getElementById("emailDiv");

    const phoneDiv =
        document.getElementById("phoneDiv");


    if (otpMethod) {

        otpMethod.addEventListener("change", function () {

            emailDiv.style.display = "none";

            phoneDiv.style.display = "none";


            if (this.value === "email") {

                emailDiv.style.display = "block";

            }


            if (this.value === "phone") {

                phoneDiv.style.display = "block";

            }

        });

    }


    // ==========================================
    // SEND OTP
    // ==========================================

    const sendOtpBtn =
        document.getElementById("sendOtpBtn");

    const otpBox =
        document.getElementById("otpBox");

    const otpPopup =
        document.getElementById("otpPopup");

    const otpMessage =
        document.getElementById("otpMessage");


    let generatedOTP = "";

    let resetUser = null;


    if (sendOtpBtn) {

        sendOtpBtn.addEventListener("click", function () {

            const method = otpMethod.value;


            if (method === "") {

                alert("Please select Email OTP or Phone OTP.");

                return;

            }


            // Get users

            let users =
                JSON.parse(localStorage.getItem("users")) || [];


            if (!Array.isArray(users)) {

                users = [];

            }


            // ==========================================
            // EMAIL OTP
            // ==========================================

            if (method === "email") {

                const email =
                    document.getElementById("forgotEmail")
                        .value.trim()
                        .toLowerCase();


                if (email === "") {

                    alert("Please enter your registered email.");

                    return;

                }


                resetUser = users.find(function (user) {

                    return (
                        user.email &&
                        user.email.toLowerCase() === email
                    );

                });


                if (!resetUser) {

                    alert(
                        "This email is not registered.\n\n" +
                        "Please create an account first."
                    );

                    return;

                }

            }


            // ==========================================
            // PHONE OTP
            // ==========================================

            if (method === "phone") {

                const phone =
                    document.getElementById("forgotPhone")
                        .value.trim();


                if (!/^[0-9]{10}$/.test(phone)) {

                    alert(
                        "Please enter a valid 10-digit phone number."
                    );

                    return;

                }


                resetUser = users.find(function (user) {

                    return user.phone === phone;

                });


                if (!resetUser) {

                    alert(
                        "This phone number is not registered."
                    );

                    return;

                }

            }


            // ==========================================
            // GENERATE OTP
            // ==========================================

            generatedOTP =
                Math.floor(
                    100000 + Math.random() * 900000
                ).toString();


            // ==========================================
            // SHOW OTP POPUP
            // ==========================================

            if (method === "email") {

                otpMessage.innerHTML =
                    "OTP has been sent to your registered email.<br><br>" +
                    "<strong>Demo OTP: " +
                    generatedOTP +
                    "</strong>";

            } else {

                otpMessage.innerHTML =
                    "OTP has been sent to your registered phone number.<br><br>" +
                    "<strong>Demo OTP: " +
                    generatedOTP +
                    "</strong>";

            }


            otpPopup.classList.add("show");

        });

    }


    // ==========================================
    // CLOSE OTP POPUP
    // ==========================================

    const closeOtpPopup =
        document.getElementById("closeOtpPopup");


    if (closeOtpPopup) {

        closeOtpPopup.addEventListener("click", function () {

            otpPopup.classList.remove("show");

            otpBox.style.display = "block";

        });

    }


    // ==========================================
    // VERIFY OTP
    // ==========================================

    const verifyOtpBtn =
        document.getElementById("verifyOtpBtn");


    if (verifyOtpBtn) {

        verifyOtpBtn.addEventListener("click", function () {

            const enteredOTP =
                document.getElementById("otpInput")
                    .value.trim();


            const newPassword =
                document.getElementById("newPassword")
                    .value;


            const confirmPassword =
                document.getElementById("confirmPassword")
                    .value;


            // Check OTP

            if (enteredOTP !== generatedOTP) {

                alert("Invalid OTP.");

                return;

            }


            // Check password

            if (newPassword.length < 6) {

                alert(
                    "New password must contain at least 6 characters."
                );

                return;

            }


            if (newPassword !== confirmPassword) {

                alert("Passwords do not match.");

                return;

            }


            if (!resetUser) {

                alert("User not found.");

                return;

            }


            // ==========================================
            // UPDATE PASSWORD
            // ==========================================

            let users =
                JSON.parse(localStorage.getItem("users")) || [];


            const userIndex =
                users.findIndex(function (user) {

                    return user.email === resetUser.email;

                });


            if (userIndex === -1) {

                alert("User not found.");

                return;

            }


            users[userIndex].password =
                newPassword;


            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );


            // ==========================================
            // SUCCESS
            // ==========================================

            alert(
                "Password reset successfully!\n\n" +
                "You can now login with your new password."
            );


            // Close modal

            forgotModal.classList.remove("show");


            otpBox.style.display = "none";


            document.getElementById("otpInput").value = "";

            document.getElementById("newPassword").value = "";

            document.getElementById("confirmPassword").value = "";

            generatedOTP = "";

            resetUser = null;

        });

    }

});