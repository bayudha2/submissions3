document.addEventListener("DOMContentLoaded", function() {

    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                document.querySelectorAll(".sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {

                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);

                    });
                });

                document.addEventListener("click", function(elm) {
                    if (elm.target.id === "delete") {
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    }
                });
            }
        };
        xhttp.open("GET", "sidenav.html", true);
        xhttp.send();
    }

    document.addEventListener("click", function(elm) {
        if (elm.target.classList.contains("checkout")) {
            const active = document.querySelectorAll(".nav-items");
            active.forEach(elm => {
                elm.classList.remove("active")
            });
            active[1].classList.add("active");

            page = "league";
            loadPage(page);
        }
    })

    var page = window.location.hash.substr(1);
    if (page === "") { page = "home" };

    loadPage(page);

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var content = document.querySelector("#body-content");

                if (page === "home") {

                    getTeamEng();
                    getMatchToday();
                }

                if (page === "league") {
                    Mhandler();
                    getKlasmenLeag("2001", "standing-ul", "ul-progress");
                    getKlasmenLeag("2021", "standing-pl", "pl-progress");
                    getKlasmenLeag("2014", "standing-ll", "ll-progress");
                }

                if (page === "liked") {
                    getSavedTeams();
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});