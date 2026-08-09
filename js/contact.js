/* ==========================================
   contact.js
   Blood Donation System
   Contact Messages
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm =
        document.getElementById("contactForm");

    if (!contactForm) {
        return;
    }


    /* ==========================================
       CONTACT FORM SUBMIT
    ========================================== */

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* Get form values */

            const name =
                document.getElementById("name")
                    .value
                    .trim();

            const email =
                document.getElementById("email")
                    .value
                    .trim();

            const subject =
                document.getElementById("subject")
                    .value
                    .trim();

            const message =
                document.getElementById("message")
                    .value
                    .trim();


            /* Check fields */

            if (
                name === "" ||
                email === "" ||
                subject === "" ||
                message === ""
            ) {

                alert(
                    "Please fill in all fields."
                );

                return;
            }


            /* ==================================
               CREATE MESSAGE OBJECT
            ================================== */

            const contactData = {

                id: Date.now(),

                name: name,

                email: email,

                subject: subject,

                message: message,

                date:
                    new Date().toLocaleString()

            };


            /* ==================================
               GET EXISTING CONTACT DATA
            ================================== */

            let contacts =
                JSON.parse(
                    localStorage.getItem("contacts")
                ) || [];


            /* ==================================
               ADD NEW MESSAGE
            ================================== */

            contacts.push(contactData);


            /* ==================================
               SAVE CONTACT DATA
            ================================== */

            localStorage.setItem(
                "contacts",
                JSON.stringify(contacts)
            );


            /* ==================================
               SUCCESS MESSAGE
            ================================== */

            alert(
                "Your message has been sent successfully!"
            );


            /* Clear form */

            contactForm.reset();

        }
    );

});