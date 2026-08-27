/* ==========================================
   request.js
   Blood Donation System
   Blood Request Storage
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const requestForm =
        document.getElementById("requestForm");


    /* ======================================
       CHECK FORM
    ====================================== */

    if (!requestForm) {

        console.error(
            "ERROR: requestForm not found."
        );

        return;

    }


    /* ======================================
       SUBMIT EVENT
    ====================================== */

    requestForm.addEventListener(
        "submit",
        saveRequest
    );

});


        /* ==========================================
        SAVE BLOOD REQUEST
        ========================================== */

        function saveRequest(event) {

            event.preventDefault();

            /* ======================================
        PATIENT NAME VALIDATION
        ====================================== */

        const patientName =
            document
                .getElementById("patientName")
                .value
                .trim();

        const namePattern = /^[A-Za-z. ]+$/;

        if (!namePattern.test(patientName)) {

            alert(
                "Patient name can contain only letters, spaces, and dots."
            );

            return;
        }


        /* ======================================
        REQUIRED DATE VALIDATION
        TODAY TO EXACTLY ONE YEAR
        ====================================== */

        const requiredDate =
            document
                .getElementById("requiredDate")
                .value;

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const selectedDate =
            new Date(requiredDate + "T00:00:00");

        const oneYearLater =
            new Date(today);

        oneYearLater.setFullYear(
            today.getFullYear() + 1
        );

        if (
            selectedDate < today ||
            selectedDate > oneYearLater
        ) {

            alert(
                "Required date must be from today up to exactly one year."
            );

            return;
        }


        /* ======================================
        EMAIL VALIDATION
        ====================================== */

        const email = document.getElementById("email").value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            email !== "" &&
            !emailPattern.test(email)
        ) {

            alert(
                "Please enter a valid email address."
            );

            return;
        }

        /* ======================================
        CITY VALIDATION
        ====================================== */

        const city = document.getElementById("city").value.trim();

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

    /* ======================================
       GET FORM DATA
    ====================================== */

    const request = {

        id: Date.now(),

        patientName:
            document
                .getElementById("patientName")
                .value
                .trim(),

        patientAge:
            document
                .getElementById("patientAge")
                .value
                .trim(),

        gender:
            document
                .getElementById("gender")
                .value,

        bloodGroup:
            document
                .getElementById("bloodGroup")
                .value,

        units:
            document
                .getElementById("units")
                .value,

        requiredDate:
            document
                .getElementById("requiredDate")
                .value,

        hospital:
            document
                .getElementById("hospital")
                .value
                .trim(),

        city:
            document
                .getElementById("city")
                .value
                .trim(),

        contactPerson:
            document
                .getElementById("contactPerson")
                .value
                .trim(),

        phone:
            document
                .getElementById("phone")
                .value
                .trim(),

        email:
            document
                .getElementById("email")
                .value
                .trim(),

        priority:
            document
                .getElementById("priority")
                .value,

        address:
            document
                .getElementById("address")
                .value
                .trim(),

        message:
            document
                .getElementById("message")
                .value
                .trim(),

        requestDate:
            new Date().toLocaleString()

    };


    /* ======================================
       GET EXISTING REQUESTS

       IMPORTANT:
       Use bloodRequests
    ====================================== */

    let requests =
        JSON.parse(
            localStorage.getItem(
                "bloodRequests"
            )
        ) || [];


    /* ======================================
       ADD NEW REQUEST
    ====================================== */

    requests.push(request);


    /* ======================================
       SAVE TO LOCAL STORAGE

       IMPORTANT:
       Same key: bloodRequests
    ====================================== */

    localStorage.setItem(
        "bloodRequests",
        JSON.stringify(requests)
    );


    /* ======================================
       SUCCESS MESSAGE
    ====================================== */

    alert(
        "Blood request submitted successfully."
    );


    /* ======================================
       RESET FORM
    ====================================== */

    requestForm.reset();

}