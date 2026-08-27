/* ==========================================
   hospital.js
   Blood Donation System
   Hospital Search
========================================== */


/* ==========================================
   WAIT FOR PAGE
========================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ======================================
       GET HTML ELEMENTS
    ====================================== */

    const form =
        document.getElementById(
            "hospitalSearchForm"
        );


    const searchHospital =
        document.getElementById(
            "searchHospital"
        );


    const cityFilter =
        document.getElementById(
            "cityFilter"
        );


    const resetBtn =
        document.getElementById(
            "resetBtn"
        );


    const hospitalContainer =
        document.getElementById(
            "hospitalContainer"
        );


    const noHospital =
        document.getElementById(
            "noHospital"
        );


    const hospitalCount =
        document.getElementById(
            "hospitalCount"
        );


    const cityCount =
        document.getElementById(
            "cityCount"
        );


    /* ======================================
       DEFAULT HOSPITAL DATA
    ====================================== */

    /* ======================================
   OFFICIAL HOSPITAL DETAILS
   Details checked from official websites
====================================== */

let defaultHospitals = [

    {
        id: 1,
        name: "Apollo Hospitals, Greams Road",
        city: "Chennai",
        phone: "+91-44-40401066",
        email: "infochennai@apollohospitals.com",
        address: "21, Greams Lane, Off Greams Road, Chennai - 600006"
    },

    {
        id: 2,
        name: "Apollo Specialty Hospital, Teynampet",
        city: "Chennai",
        phone: "+91-44-61151111",
        email: "apollospecialty@apollohospitals.com",
        address: "No. 320, Anna Salai, Teynampet, Nandanam, Chennai - 600035"
    },

    {
        id: 3,
        name: "Apollo Specialty Hospital, Perungudi",
        city: "Chennai",
        phone: "+91-44-40401066",
        email: "infochennai@apollohospitals.com",
        address: "05/639, Old Mahabalipuram Road, Chennai - 600096"
    },

    {
        id: 4,
        name: "Apollo Specialty Hospitals, Vanagaram",
        city: "Chennai",
        phone: "+91-44-40401066",
        email: "infochennai@apollohospitals.com",
        address: "No.64, Vanagaram to Ambattur Main Road, Chennai - 600095"
    },

    {
        id: 5,
        name: "Manipal Hospitals, Old Airport Road",
        city: "Bengaluru",
        phone: "1800 102 5555",
        email: "info@manipalhospitals.com",
        address: "98, HAL Old Airport Road, Kodihalli, Bengaluru, Karnataka - 560017"
    },

    {
        id: 6,
        name: "Manipal Hospitals, Hebbal",
        city: "Bengaluru",
        phone: "1800 102 5555",
        email: "info@manipalhospitals.com",
        address: "Kirloskar Business Park, Bellary Road, Hebbal, Bengaluru - 560024"
    },

    {
        id: 7,
        name: "CARE Hospitals, Banjara Hills",
        city: "Hyderabad",
        phone: "+91-40-68106529",
        email: "cs.office@carehospitals.com",
        address: "Road No.1, Banjara Hills, Hyderabad, Telangana - 500034"
    },

    {
        id: 8,
        name: "CARE Hospitals, HITEC City",
        city: "Hyderabad",
        phone: "+91-40-68106529",
        email: "cs.office@carehospitals.com",
        address: "Old Mumbai Highway, Near Cyberabad Police Commissionerate, Jayabheri Pine Valley, HITEC City, Hyderabad - 500032"
    },

    {
        id: 9,
        name: "CARE Hospitals, Nampally",
        city: "Hyderabad",
        phone: "+91-40-68106529",
        email: "cs.office@carehospitals.com",
        address: "Exhibition Grounds Road, Nampally, Hyderabad, Telangana - 500001"
    },

    {
        id: 10,
        name: "CARE Hospitals, Malakpet",
        city: "Hyderabad",
        phone: "+91-40-68106529",
        email: "cs.office@carehospitals.com",
        address: "16-6-104 to 109, Chaderghat Road, Hyderabad, Telangana - 500024"
    },

    {
        id: 11,
        name: "AIG Hospitals, Gachibowli",
        city: "Hyderabad",
        phone: "+91-40-42444222",
        email: "info@aighospitals.com",
        address: "1-66/AIG/2 to 5, Mindspace Road, Gachibowli, Hyderabad, Telangana - 500032"
    },

    {
        id: 12,
        name: "AIG Hospitals, Banjara Hills",
        city: "Hyderabad",
        phone: "+91-40-42444222",
        email: "info@aighospitals.com",
        address: "Opp. Taj Krishna Hotel, Beside City Center Mall, Road No.1, Banjara Hills, Hyderabad - 500045"
    }

];

    /* ======================================
       LOAD LOCAL STORAGE DATA
    ====================================== */

    let hospitals =
        JSON.parse(
            localStorage.getItem("hospitals")
        );


    /* ======================================
       IF NO DATA, SAVE DEFAULT DATA
    ====================================== */

    if (
        !Array.isArray(hospitals) ||
        hospitals.length === 0
    ) {

        hospitals = defaultHospitals;

        localStorage.setItem(
            "hospitals",
            JSON.stringify(hospitals)
        );

    }


    /* ======================================
       CREATE CITY DROPDOWN
    ====================================== */

    function loadCities() {


        /* Clear existing options */

        cityFilter.innerHTML = `

            <option value="">
                All Cities
            </option>

        `;


        /* Get unique cities */

        const cities = [];


        hospitals.forEach(function (hospital) {

            if (
                hospital.city &&
                !cities.includes(hospital.city)
            ) {

                cities.push(hospital.city);

            }

        });


        /* Sort cities */

        cities.sort();


        /* Add cities */

        cities.forEach(function (city) {

            const option =
                document.createElement("option");


            option.value = city;

            option.textContent = city;


            cityFilter.appendChild(option);

        });

    }


    /* ======================================
       DISPLAY ALL HOSPITALS
    ====================================== */

    function displayHospitals(data) {


        /* Clear previous results */

        hospitalContainer.innerHTML = "";


        /* ==================================
           NO RESULTS
        ================================== */

        if (data.length === 0) {

            noHospital.style.display = "block";

            hospitalCount.textContent = "0";

            cityCount.textContent = "0";

            return;

        }


        /* Hide no result message */

        noHospital.style.display = "none";


        /* ==================================
           COUNT CITIES
        ================================== */

        const cities =
            [...new Set(
                data.map(function (hospital) {

                    return hospital.city;

                })
            )];


        hospitalCount.textContent =
            data.length;


        cityCount.textContent =
            cities.length;


        /* ==================================
           CREATE HOSPITAL CARDS
        ================================== */

        data.forEach(function (hospital) {


            const card =
                document.createElement("div");


            card.className =
                "hospital-card";


            card.innerHTML = `

                <!-- HOSPITAL HEADER -->

                <div class="hospital-card-header">

                    <div class="hospital-logo">

                        <i class="fa-solid fa-hospital"></i>

                    </div>


                    <div class="hospital-title">

                        <h3>
                            ${hospital.name}
                        </h3>

                        <span>

                            <i class="fa-solid fa-location-dot"></i>

                            ${hospital.city}

                        </span>

                    </div>

                </div>


                <!-- HOSPITAL DETAILS -->

                <div class="hospital-details">


                    <div class="hospital-detail">

                        <i class="fa-solid fa-location-dot"></i>

                        <div>

                            <strong>
                                Address
                            </strong>

                            <br>

                            ${hospital.address}

                        </div>

                    </div>


                    <div class="hospital-detail">

                        <i class="fa-solid fa-phone"></i>

                        <div>

                            <strong>
                                Phone
                            </strong>

                            <br>

                            ${hospital.phone}

                        </div>

                    </div>


                    <div class="hospital-detail">

                        <i class="fa-solid fa-envelope"></i>

                        <div>

                            <strong>
                                Email
                            </strong>

                            <br>

                            ${hospital.email}

                        </div>

                    </div>


                </div>


                <!-- FOOTER -->

                <div class="hospital-card-footer">


                    <a
                        href="tel:${hospital.phone}"
                        class="btn btn-primary">

                        <i class="fa-solid fa-phone"></i>

                        Call Hospital

                    </a>


                    <a
                        href="mailto:${hospital.email}"
                        class="btn btn-secondary">

                        <i class="fa-solid fa-envelope"></i>

                        Email

                    </a>


                </div>

            `;


            hospitalContainer.appendChild(card);

        });

    }


    /* ======================================
       SEARCH HOSPITALS
    ====================================== */

    function searchHospitals() {


        /* Get search text */

        const name =
            searchHospital.value
            .trim()
            .toLowerCase();


        /* Get selected city */

        const city =
            cityFilter.value
            .trim()
            .toLowerCase();


        /* ==================================
           FILTER DATA
        ================================== */

        const filtered =
            hospitals.filter(function (hospital) {


                const hospitalName =
                    String(
                        hospital.name || ""
                    )
                    .toLowerCase();


                const hospitalCity =
                    String(
                        hospital.city || ""
                    )
                    .toLowerCase();


                /* Name matching */

                const nameMatch =
                    name === "" ||
                    hospitalName.includes(name);


                /* City matching */

                const cityMatch =
                    city === "" ||
                    hospitalCity === city;


                return (
                    nameMatch &&
                    cityMatch
                );

            });


        /* Display results */

        displayHospitals(filtered);


        /* Scroll to results */

        document
            .getElementById(
                "hospitalContainer"
            )
            .scrollIntoView({

                behavior: "smooth",

                block: "nearest"

            });

    }


    /* ======================================
       FORM SUBMIT
    ====================================== */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            searchHospitals();

        }
    );


    /* ======================================
       LIVE HOSPITAL NAME SEARCH
    ====================================== */

    searchHospital.addEventListener(
        "input",
        function () {

            searchHospitals();

        }
    );


    /* ======================================
       CITY SEARCH
    ====================================== */

    cityFilter.addEventListener(
        "change",
        function () {

            searchHospitals();

        }
    );


    /* ======================================
       RESET
    ====================================== */

    form.addEventListener(
        "reset",
        function () {


            /* Wait for browser reset */

            setTimeout(function () {


                /* Display all hospitals */

                displayHospitals(
                    hospitals
                );


            }, 50);

        }
    );


    /* ======================================
       INITIALIZE PAGE
    ====================================== */

    loadCities();


    displayHospitals(
        hospitals
    );


});