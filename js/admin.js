// ======================================
// ADMIN LOGIN PROTECTION
// ======================================

// Check whether the user is logged in
const isLoggedIn = localStorage.getItem("adminLogin");

if (isLoggedIn !== "true") {

    alert("Please login first.");

    window.location.replace("login.html");

}

// Get current logged-in user
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {

    alert("Session expired. Please login again.");

    localStorage.removeItem("adminLogin");

    window.location.replace("login.html");

}

// Display logged-in user name (if element exists)
const adminName = document.getElementById("adminName");

if (adminName) {

    adminName.textContent = currentUser.fullName;

}

// ======================================
// ADMIN LOGIN CHECK
// ======================================

const isAdmin = localStorage.getItem("adminLogin");

if (isAdmin !== "true") {

    alert("Please login as Admin.");

    window.location.href = "login.html";

}

// ======================================
// LOAD LOCAL STORAGE DATA
// ======================================

let users = JSON.parse(localStorage.getItem("users")) || [];

let donors = JSON.parse(localStorage.getItem("donors")) || [];

let requests = JSON.parse(localStorage.getItem("bloodRequests")) || [];

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// ======================================
// DASHBOARD COUNT
// ======================================

document.getElementById("userCount").textContent = users.length;

document.getElementById("donorCount").textContent = donors.length;

document.getElementById("requestCount").textContent = requests.length;

document.getElementById("messageCount").textContent = contacts.length;

// ======================================
// TABLE REFERENCES
// ======================================

const userTable = document.getElementById("userTable");

const donorTable = document.getElementById("donorTable");

const requestTable = document.getElementById("requestTable");

const messageTable = document.getElementById("messageTable");

// ======================================
// SEARCH BOXES
// ======================================

const searchUser = document.getElementById("searchUser");

const searchDonor = document.getElementById("searchDonor");

const searchRequest = document.getElementById("searchRequest");

const searchMessage = document.getElementById("searchMessage");

// ======================================
// LOAD ALL TABLES
// ======================================

loadUsers();

loadDonors();

loadRequests();

loadMessages();
// ======================================
// LOAD REGISTERED USERS
// ======================================

function loadUsers() {

    userTable.innerHTML = "";

    if (users.length === 0) {

        userTable.innerHTML = `

<tr>

<td colspan="7" style="text-align:center">

No Registered Users Found

</td>

</tr>

`;

        return;
    }

    users.forEach(function (user, index) {

        userTable.innerHTML += `

<tr>

<td>${index + 1}</td>

<td>${user.fullName}</td>

<td>${user.email}</td>

<td>${user.phone}</td>

<td>${user.dob}</td>

<td>

<span class="status active">

Registered

</span>

</td>

<td>

<button
class="btn-danger"
onclick="deleteUser(${index})">

Delete

</button>

</td>

</tr>

`;

    });

}

// ======================================
// LOAD BLOOD DONORS
// ======================================

function loadDonors() {

    donorTable.innerHTML = "";

    if (donors.length === 0) {

        donorTable.innerHTML = `

<tr>

<td colspan="7" style="text-align:center">

No Blood Donors Found

</td>

</tr>

`;

        return;

    }

    donors.forEach(function (donor, index) {

        donorTable.innerHTML += `

<tr>

<td>${index + 1}</td>

<td>${donor.fullName}</td>

<td>${donor.bloodGroup}</td>

<td>${donor.phone}</td>

<td>${donor.email}</td>

<td>${donor.city}</td>

<td>

<button
class="btn-danger"
onclick="deleteDonor(${index})">

Delete

</button>

</td>

</tr>

`;

    });

}

// ======================================
// SEARCH REGISTERED USERS
// ======================================

searchUser.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const rows = userTable.getElementsByTagName("tr");

    for (let row of rows) {

        row.style.display =
        row.innerText.toLowerCase().includes(value)
        ? ""
        : "none";

    }

});

// ======================================
// SEARCH DONORS
// ======================================

searchDonor.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const rows = donorTable.getElementsByTagName("tr");

    for (let row of rows) {

        row.style.display =
        row.innerText.toLowerCase().includes(value)
        ? ""
        : "none";

    }

});

// ======================================
// LOAD BLOOD REQUESTS
// ======================================

function loadRequests() {

    requestTable.innerHTML = "";


    /* ==================================
       NO REQUESTS
    ================================== */

    if (requests.length === 0) {

        requestTable.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="no-data">

                    No Blood Requests Found

                </td>

            </tr>

        `;

        return;

    }


    /* ==================================
       DISPLAY REQUESTS
    ================================== */

    requests.forEach(
        function (request, index) {

            requestTable.innerHTML += `

                <tr>

                    <td>

                        ${index + 1}

                    </td>


                    <td>

                        ${request.patientName || "-"}

                    </td>


                    <td>

                        ${request.bloodGroup || "-"}

                    </td>


                    <td>

                        ${request.hospital || "-"}

                    </td>


                    <td>

                        ${request.city || "-"}

                    </td>


                    <td>

                        <span class="priority-badge">

                            ${request.priority || "-"}

                        </span>

                    </td>


                    <td>

                        <button
                            type="button"
                            class="btn btn-danger"
                            onclick="deleteRequest(${index})">

                            <i
                                class="fa-solid fa-trash">
                            </i>

                            Delete

                        </button>

                    </td>

                </tr>

            `;

        }
    );

}


// ======================================
// LOAD CONTACT MESSAGES
// ======================================

function loadMessages() {

    messageTable.innerHTML = "";

    if (contacts.length === 0) {

        messageTable.innerHTML = `

<tr>

<td colspan="6" style="text-align:center">

No Contact Messages

</td>

</tr>

`;

        return;

    }

    contacts.forEach(function(contact, index){

        messageTable.innerHTML += `

<tr>

<td>${index + 1}</td>

<td>${contact.name}</td>

<td>${contact.email}</td>

<td>${contact.subject}</td>

<td>${contact.message}</td>

<td>

<button
class="btn-danger"
onclick="deleteMessage(${index})">

Delete

</button>

</td>

</tr>

`;

    });

}

// ======================================
// SEARCH BLOOD REQUESTS
// ======================================

searchRequest.addEventListener(
    "keyup",
    function () {

        const value =
            this.value
                .toLowerCase()
                .trim();


        const rows =
            requestTable
                .getElementsByTagName("tr");


        for (
            let row of rows
        ) {

            row.style.display =
                row.innerText
                    .toLowerCase()
                    .includes(value)
                    ? ""
                    : "none";

        }

    }
);
// ======================================
// SEARCH CONTACT MESSAGES
// ======================================

searchMessage.addEventListener("keyup", function(){

    const value = this.value.toLowerCase();

    const rows = messageTable.getElementsByTagName("tr");

    for(let row of rows){

        row.style.display =
        row.innerText.toLowerCase().includes(value)
        ? ""
        : "none";

    }

});

// ======================================
// DELETE REGISTERED USER
// ======================================

function deleteUser(index){

    if(confirm("Delete this registered user?")){

        users.splice(index,1);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        location.reload();

    }

}

// ======================================
// DELETE DONOR
// ======================================

function deleteDonor(index){

    if(confirm("Delete this donor?")){

        donors.splice(index,1);

        localStorage.setItem(
            "donors",
            JSON.stringify(donors)
        );

        location.reload();

    }

}

// ======================================
// DELETE BLOOD REQUEST
// ======================================

function deleteRequest(index) {

    if (
        confirm(
            "Delete this blood request?"
        )
    ) {

        /* Remove request */

        requests.splice(index, 1);


        /* Save updated data */

        localStorage.setItem(
            "bloodRequests",
            JSON.stringify(requests)
        );


        /* Reload table */

        loadRequests();


        /* Update count */

        document.getElementById(
            "requestCount"
        ).textContent = requests.length;

    }

}

// ======================================
// DELETE CONTACT MESSAGE
// ======================================

function deleteMessage(index){

    if(confirm("Delete this contact message?")){

        contacts.splice(index,1);

        localStorage.setItem(
            "contacts",
            JSON.stringify(contacts)
        );

        location.reload();

    }

}



// ======================================
// LOGOUT
// ======================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("adminLogin");

        localStorage.removeItem("currentUser");

        alert("Logout Successful");

        window.location.replace("login.html");

    });

}

// ======================================
// DARK MODE BUTTON
// ======================================

const darkBtn = document.getElementById("darkBtn");

if(localStorage.getItem("darkMode") === "on"){

    document.body.classList.add("dark");

    darkBtn.innerHTML =
    '<i class="fa-solid fa-sun"></i>';

}

darkBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("darkMode","on");

        darkBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }else{

        localStorage.setItem("darkMode","off");

        darkBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }

});