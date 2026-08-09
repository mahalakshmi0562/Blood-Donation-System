document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("donorForm");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const fullName = document.getElementById("fullname").value.trim();
        const age = document.getElementById("age").value.trim();
        const gender = document.getElementById("gender").value;
        const bloodGroup = document.getElementById("bloodGroup").value;
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const city = document.getElementById("city").value.trim();
        const date = document.getElementById("date").value;
        const address = document.getElementById("address").value.trim();
        const agree = document.getElementById("agree").checked;

        // Validation
        if (
            fullName === "" ||
            age === "" ||
            gender === "" ||
            bloodGroup === "" ||
            phone === "" ||
            city === "" ||
            address === ""
        ) {
            alert("Please fill all required fields.");
            return;
        }

        if (age < 18 || age > 65) {
            alert("Age must be between 18 and 65.");
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Phone number must contain exactly 10 digits.");
            return;
        }

        if (!agree) {
            alert("Please accept the declaration.");
            return;
        }

        // Donor object
        const donor = {
            fullName: fullName,
            age: age,
            gender: gender,
            bloodGroup: bloodGroup,
            phone: phone,
            email: email,
            city: city,
            date: date,
            address: address,
            available: true
        };

        // Read existing donors
        let donors = JSON.parse(localStorage.getItem("donors"));

        if (!Array.isArray(donors)) {
            donors = [];
        }

        // Save donor
        donors.push(donor);

        localStorage.setItem("donors", JSON.stringify(donors));

        alert("Donor Registered Successfully!");

        form.reset();

        // Optional redirect
        // window.location.href = "donors.html";
    });

});