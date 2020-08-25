//// function handler ketika page terreload
document.addEventListener("DOMContentLoaded", function() {
    getMatchToday();
    getTeamEng();
    getKlasmenLeag("2001", "standing-ul", "ul-progress");
    getKlasmenLeag("2021", "standing-pl", "pl-progress");
    getKlasmenLeag("2014", "standing-ll", "ll-progress");
    Mhandler();
    getSavedTeams();
});

//Save and Delete handler
document.addEventListener("click", function(elm) {
    if (elm.target.id == "save") {
        let timId = elm.target.classList[4];
        let svMark = elm.target;
        let item = getTeamInfo(timId, svMark);
        item.then(function(data) {
            saveForLater(data);
        });
    }

    if (elm.target.id == "delete") {
        let timId = elm.target.classList[0];
        deleteTeam(timId);
    }
});