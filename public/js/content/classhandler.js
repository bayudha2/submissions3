const active = document.querySelectorAll(".nav-items");
active.forEach(button => {
    button.addEventListener("click", function() {
        active.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
    });
});

function Mhandler() {
    setTimeout(function() {
        let modal = document.querySelectorAll('.modal');
        let carousel = document.querySelectorAll('.carousel');
        let collap = document.querySelectorAll('.collapsible');
        M.Carousel.init(carousel, { fullWidth: true });
        M.Modal.init(modal);
        M.Collapsible.init(collap);

        document.querySelector(".tmodal-ul").addEventListener("click", function() { getTeams("2001", "modal-ul", "ul-mprogress"); })
        document.querySelector(".tmodal-pl").addEventListener("click", function() { getTeams("2021", "modal-pl", "pl-mprogress"); })
        document.querySelector(".tmodal-ll").addEventListener("click", function() { getTeams("2014", "modal-ll", "ll-mprogress"); })
        document.querySelector(".tcollap-cl").addEventListener("click", function() { getAllMatchesLeag("2001", "cl-league", "cl-cprogress"); })
        document.querySelector(".tcollap-pl").addEventListener("click", function() { getAllMatchesLeag("2021", "pl-league", "pl-cprogress"); })
        document.querySelector(".tcollap-ll").addEventListener("click", function() { getAllMatchesLeag("2014", "ll-league", "ll-cprogress"); })
    }, 400);
}