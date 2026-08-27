// =======================================
// DARK MODE
// =======================================

const darkBtn = document.getElementById("darkBtn");

// Load saved theme

if (localStorage.getItem("darkMode") === "on") {

    document.body.classList.add("dark");

    if (darkBtn) {

        darkBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }

}

// Toggle Theme

if (darkBtn) {

    darkBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("darkMode", "on");

            darkBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem("darkMode", "off");

            darkBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        }

    });

}