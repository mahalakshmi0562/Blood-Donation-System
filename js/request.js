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