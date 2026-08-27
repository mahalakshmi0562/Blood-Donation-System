document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("donorForm");

    // Set maximum date as today's date

    const dateInput = document.getElementById("date");

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const currentDate = `${year}-${month}-${day}`;

    dateInput.max = currentDate;

    if (!form) {
        console.log("ERROR: donorForm not found");
        return;
    }

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        // =====================================
        // GET VALUES
        // =====================================

        const fullName =
            document.getElementById("fullname").value.trim();

        const age =
            document.getElementById("age").value.trim();

        const gender =
            document.getElementById("gender").value;

        const bloodGroup =
            document.getElementById("bloodGroup").value;

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const city =
            document.getElementById("city").value.trim();

        const date =
            document.getElementById("date").value;

        const address =
            document.getElementById("address").value.trim();

        const agree =
            document.getElementById("agree").checked;


        // =====================================
        // 1. FULL NAME
        // ONLY LETTERS AND SPACES
        // =====================================

        const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

        if (fullName === "") {

            alert("❌ Please enter your full name.");

            document.getElementById("fullname").focus();

            return;
        }

        if (!namePattern.test(fullName)) {

            alert(
                "❌ Invalid Full Name!\n\n" +
                "Full Name must contain only letters and spaces.\n\n" +
                "Numbers and special characters are NOT allowed."
            );

            document.getElementById("fullname").focus();

            return;
        }


        // =====================================
        // 2. AGE
        // =====================================

        if (age === "") {

            alert("❌ Please enter your age.");

            document.getElementById("age").focus();

            return;
        }

        if (Number(age) < 18 || Number(age) > 65) {

            alert(
                "❌ Invalid Age!\n\n" +
                "Age must be between 18 and 65."
            );

            document.getElementById("age").focus();

            return;
        }


        // =====================================
        // 3. GENDER
        // =====================================

        if (gender === "") {

            alert("❌ Please select your gender.");

            document.getElementById("gender").focus();

            return;
        }


        // =====================================
        // 4. BLOOD GROUP
        // =====================================

        if (bloodGroup === "") {

            alert("❌ Please select your blood group.");

            document.getElementById("bloodGroup").focus();

            return;
        }


        // =====================================
        // 5. PHONE NUMBER
        // ONLY 10 DIGITS
        // =====================================

        if (phone === "") {

            alert("❌ Please enter your phone number.");

            document.getElementById("phone").focus();

            return;
        }


        // =====================================
        // 6. EMAIL
        // =====================================

        const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            email !== "" &&
            !emailPattern.test(email)
        ) {

            alert(
                "Please enter a valid email address."
            );

            return;
        }

        // =====================================
        // 7. CITY
        // ONLY LETTERS AND SPACES
        // =====================================

        if (city === "") {

            alert("❌ Please enter your city.");

            document.getElementById("city").focus();

            return;
        }

        const cityPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

        if (!cityPattern.test(city)) {

            alert(
                "❌ Invalid City Name!\n\n" +
                "City name must contain only letters and spaces.\n\n" +
                "Numbers and special characters are NOT allowed."
            );

            document.getElementById("city").focus();

            return;
        }

        // =====================================
        // LAST DONATION DATE
        // DATE MUST NOT BE AFTER TODAY
        // =====================================

        if (date !== "") {

            const today = new Date();

            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");

            const currentDate = `${year}-${month}-${day}`;

            if (date > currentDate) {

                alert(
                    "❌ Invalid Last Donation Date!\n\n" +
                    "Last Donation Date cannot be a future date.\n" +
                    "Please enter today or a previous date."
                );

                document.getElementById("date").focus();

                return;
            }
        }
        // =====================================
        // 8. ADDRESS
        // =====================================

        if (address === "") {

            alert("❌ Please enter your complete address.");

            document.getElementById("address").focus();

            return;
        }


        // =====================================
        // 9. DECLARATION
        // =====================================

        if (!agree) {

            alert(
                "❌ Please accept the declaration before registering."
            );

            return;
        }


        // =====================================
        // CREATE DONOR OBJECT
        // =====================================

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


        // =====================================
        // GET EXISTING DONORS
        // =====================================

        let donors =
            JSON.parse(localStorage.getItem("donors"));


        if (!Array.isArray(donors)) {

            donors = [];

        }


        // =====================================
        // SAVE DONOR
        // =====================================

        donors.push(donor);

        localStorage.setItem(
            "donors",
            JSON.stringify(donors)
        );


        // =====================================
        // SUCCESS
        // =====================================

        alert(
            "✅ Donor Registered Successfully!"
        );


        // Reset form

        form.reset();

    });

});