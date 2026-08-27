/* =====================================================
   Blood Donation System
   search.js

   Search registered donors by:
   1. Person Name
   2. Blood Group
===================================================== */


document.addEventListener("DOMContentLoaded", function () {


    // =================================================
    // GET ELEMENTS
    // =================================================

    const searchForm =
        document.getElementById("searchForm");

    const bloodGroup =
        document.getElementById("bloodGroup");

    const donorResults =
        document.getElementById("donorResults");

    const noResults =
        document.getElementById("noResults");

    const resultMessage =
        document.getElementById("resultMessage");


    // =================================================
    // CHECK FORM
    // =================================================

    if (!searchForm) {

        console.error("searchForm not found.");

        return;

    }


    // =================================================
    // SEARCH BUTTON
    // =================================================

    searchForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            searchDonors();

        }
    );


    // =================================================
    // RESET BUTTON
    // =================================================

    searchForm.addEventListener(
        "reset",
        function () {

            setTimeout(function () {

                donorResults.innerHTML = "";

                noResults.style.display = "none";

                resultMessage.textContent =
                    "Enter a donor name or blood group and click Search Donor.";

            }, 50);

        }
    );


});



/* =====================================================
   SEARCH DONORS
===================================================== */

function searchDonors() {


    // =================================================
    // GET SEARCH VALUES
    // =================================================

    


    const bloodGroup =
        document
            .getElementById("bloodGroup")
            .value
            .trim();


    // =================================================
    // GET REGISTERED DONORS
    // =================================================

    let donors =
        JSON.parse(
            localStorage.getItem("donors")
        );


    // =================================================
    // CHECK DONOR DATA
    // =================================================

    if (!Array.isArray(donors)) {

        donors = [];

    }


    console.log("Registered Donors:", donors);


    // =================================================
    // CHECK SEARCH INPUT
    // =================================================

    if ( bloodGroup === "") {

        displayNoResults(
            "Please select a blood group."
        );

        return;

    }


    // =================================================
    // FILTER DONORS
    // =================================================

    const filteredDonors =
        donors.filter(function (donor) {



            // -----------------------------------------
            // BLOOD GROUP MATCH
            // -----------------------------------------

            const donorBloodGroup =
                String(
                    donor.bloodGroup || ""
                )
                .trim();


            const bloodMatch =
                bloodGroup === "" ||
                donorBloodGroup === bloodGroup;


            // -----------------------------------------
            // BOTH CONDITIONS
            // -----------------------------------------

            return bloodMatch;

        });


    // =================================================
    // DISPLAY RESULT
    // =================================================

    if (filteredDonors.length === 0) {

        displayNoResults(
            "No registered donor matches your search."
        );

        return;

    }


    displayDonors(filteredDonors);

}



/* =====================================================
   DISPLAY DONORS
===================================================== */

function displayDonors(donors) {


    const results =
        document.getElementById("donorResults");

    const noResults =
        document.getElementById("noResults");

    const resultMessage =
        document.getElementById("resultMessage");


    // =================================================
    // CLEAR OLD RESULTS
    // =================================================

    results.innerHTML = "";


    noResults.style.display = "none";


    // =================================================
    // RESULT MESSAGE
    // =================================================

    resultMessage.textContent =
        donors.length +
        " registered donor(s) found.";


    // =================================================
    // CREATE DONOR CARDS
    // =================================================

    donors.forEach(function (donor, index) {


        const card =
            document.createElement("div");


        card.className =
            "card donor-card";


        // =================================================
        // DONOR DATA
        // =================================================

        const fullName =
            donor.fullName || "Not Available";


        const age =
            donor.age || "Not Available";


        const gender =
            donor.gender || "Not Available";


        const group =
            donor.bloodGroup || "N/A";


        const phone =
            donor.phone || "Not Available";


        const email =
            donor.email || "Not Available";


        const city =
            donor.city || "Not Available";


        const date =
            donor.date || "Not Available";


        const available =
            donor.available !== false;


        // =================================================
        // DONOR CARD
        // =================================================

        card.innerHTML = `

            <div class="donor-header">

                <div>

                    <h3>

                        ${escapeHTML(fullName)}

                    </h3>

                    <p>

                        Registered Donor #${index + 1}

                    </p>

                </div>


                <span class="blood-badge">

                    ${escapeHTML(group)}

                </span>

            </div>


            <div class="donor-body">


                <p>

                    <i class="fa-solid fa-user"></i>

                    <strong>Age:</strong>

                    ${escapeHTML(String(age))}

                </p>


                <p>

                    <i class="fa-solid fa-venus-mars"></i>

                    <strong>Gender:</strong>

                    ${escapeHTML(String(gender))}

                </p>


                <p>

                    <i class="fa-solid fa-location-dot"></i>

                    <strong>City:</strong>

                    ${escapeHTML(String(city))}

                </p>


                <p>

                    <i class="fa-solid fa-phone"></i>

                    <strong>Phone:</strong>

                    ${escapeHTML(String(phone))}

                </p>


                <p>

                    <i class="fa-solid fa-envelope"></i>

                    <strong>Email:</strong>

                    ${escapeHTML(String(email))}

                </p>


                <p>

                    <i class="fa-solid fa-calendar"></i>

                    <strong>Registration Date:</strong>

                    ${escapeHTML(String(date))}

                </p>


                <p>

                    <i class="fa-solid fa-circle-check"></i>

                    <strong>Status:</strong>

                    <span class="${
                        available
                            ? "available"
                            : "not-available"
                    }">

                        ${
                            available
                                ? "Available"
                                : "Not Available"
                        }

                    </span>

                </p>


            </div>


            <div class="donor-footer">

                ${
                    phone !== "Not Available"
                    ?

                    `<a
                        href="tel:${escapeHTML(String(phone))}"
                        class="btn btn-primary">

                        <i class="fa-solid fa-phone"></i>

                        Contact Donor

                    </a>`

                    :

                    ""
                }

            </div>

        `;


        // =================================================
        // ADD CARD
        // =================================================

        results.appendChild(card);

    });

}



/* =====================================================
   NO RESULTS
===================================================== */

function displayNoResults(message) {


    const results =
        document.getElementById("donorResults");


    const noResults =
        document.getElementById("noResults");


    const resultMessage =
        document.getElementById("resultMessage");


    results.innerHTML = "";


    noResults.style.display = "block";


    resultMessage.textContent =
        message;

}



/* =====================================================
   HTML SECURITY
===================================================== */

function escapeHTML(value) {


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}