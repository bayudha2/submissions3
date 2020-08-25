const base_url = "https://api.football-data.org/v2/";
const api_token = {
    headers: {
        "X-Auth-Token": "34a46c95352e4e62a88947219f5a7f70",
    }
};
// const api_token = "34a46c95352e4e62a88947219f5a7f70";

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function matchTodalHtml(data) {
    var matchHTML = "";
    data.matches.forEach(function(match) {
        matchHTML += `
                <div class="carousel-item black-text">
                    <div class="row" >
                        <div class="col s12 m12 l5" >
                            <h2 style="font-weight:bold; font-size:28px;">${match.awayTeam.name}</h2>
                            <p class="black-text">Team Lawan</p>
                        </div>
                        <div class="col s12 m12 l2">
                            <h6 style="margin-top:50px; font-weight: bold;">VS</h6>
                        </div>
                        <div class="col s12 m12 l5">
                            <h2 style="font-weight:bold; font-size:28px;">${match.homeTeam.name}</h2>
                            <p class="black-text">Team Rumah</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12 m4 l4">
                            <p>Tanggal:</p>
                            <p>${data.filters.dateFrom}</p>
                        </div>
                        <div class="col s12 m4 l4">
                            <p>Kompetisi:</p>
                            <p>${match.competition.name}</p>
                        </div>
                        <div class="col s12 m4 l4">
                            <p>Area:</p>
                            <p>${match.competition.area.name}</p>
                        </div>
                    </div>
                </div>
        `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id# content
    document.getElementById("matches").innerHTML = matchHTML;
}

function TeamEngHtml(data) {
    let teams = data.teams;
    teams.map(key => {
        if (key.email === null) {
            key.email = "-";
        }
        if (key.phone === null) {
            key.phone = "-";
        }
    });
    var engTimHTML = "";
    teams.forEach(function(team) {
        if (team.id == 57 || team.id == 58 || team.id == 61 || team.id == 62 || team.id == 63 || team.id == 64 || team.id == 65 || team.id == 332 || team.id == 73) {
            engTimHTML += `
                    <div class="col s12 m6 l4" style="padding: 0;">
                        <a class="modal-trigger" href="#modal${team.id}" style="color: black;">
                            <div class="card fav-tim" style="margin: 10px;">
                                <div class="card-content row">
                                    <div style="margin-right:auto !important;">
                                        <img src="${team.crestUrl}" alt="${team.name}" class="col s12 m6 l5 fav-tim-img">
                                    </div>
                                    <span class="col s12 m6 l6 center-align fav-tim-name">${team.name}</span>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div id="modal${team.id}" class="modal">
                        <div class="modal-content">
                            <h4 class="center-align">${team.name}</h4>
                            <div class="row">
                                <div class="col s12 m2 l4 center-align">
                                    <img width=100 class="center-align" alt="${team.name}" src="${team.crestUrl}"/>
                                </div>
                                <div class="col s12 m10 l8 left-align">
                                    <p style="margin: 0;"> <span style="font-weight:bold;">Nama : </span>${team.shortName}</p>
                                    <p style="margin: 0;"> <span style="font-weight:bold;">Alamat : </span>${team.address}</p>
                                    <p style="margin: 0;"> <span style="font-weight:bold;">Didirikan : </span>${team.founded}</p>
                                    <p style="margin: 0;"> <span style="font-weight:bold;">Stadiun : </span>${team.venue}</p>
                                    <p style="margin: 0;"> <span style="font-weight:bold;">Email : </span>${team.email}</p>
                                    <p style="margin: 0;"> <span style="font-weight:bold;">phone : </span>${team.phone}</p>
                                    <p style="margin: 0;"> <span style="font-weight:bold;">Website : </span>${team.website}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                        <button class="btn modal-close blue-grey darken-4" type="submit" name="action">Back</button>
                        </div>
                    </div>
                    `;
        }
    });
    //Menyisipkan ke England Football
    document.getElementById("eng-tim").innerHTML = engTimHTML;
}

function allMatchesleagHtml(data, elemid, cprogressid) {
    let matches = data.matches;
    matches = matches.slice(0, 150);
    var matchHTML = '';
    matches.forEach(function(hasil) {
        matchHTML += `
                    <tr>
                        <td>${hasil.homeTeam.name}</td>
                        <td>${hasil.awayTeam.name}</td>
                        <td>${hasil.score.fullTime.homeTeam} - ${hasil.score.fullTime.awayTeam}</td>
                    </tr>
                    `;
    });
    // Menyisipkan ke table
    document.getElementById(elemid).innerHTML = matchHTML;
    document.getElementById(cprogressid).classList.remove("progress");
}

function klasmenLeagHtml(data, ligaid, elemid, progressid) {
    var standingHTML = "";

    //liga UEFA
    if (ligaid === "2001") {
        let standingU = data.standings.filter(obj => {
            return obj.type === "TOTAL"
        })
        standingU.map(obj => {
            if (obj.group === "GROUP_A") {
                obj.group = "A";
            }
            if (obj.group === "GROUP_B") {
                obj.group = "B";
            }
            if (obj.group === "GROUP_C") {
                obj.group = "C";
            }
            if (obj.group === "GROUP_D") {
                obj.group = "D";
            }
            if (obj.group === "GROUP_E") {
                obj.group = "E";
            }
            if (obj.group === "GROUP_F") {
                obj.group = "F";
            }
            if (obj.group === "GROUP_G") {
                obj.group = "G";
            }
            if (obj.group === "GROUP_H") {
                obj.group = "H";
            }
        });
        standingU.forEach(function(groups) {
            groups.table.forEach(function(tim) {
                standingHTML += `
                    <tr>
                        <td>${tim.position}</td>
                        <td><img src="${tim.team.crestUrl}" alt="${tim.team.name}" width=15px;> ${tim.team.name}</td>
                        <td>${groups.group}</td>
                        <td>${tim.playedGames}</td>
                        <td>${tim.won}</td>
                        <td>${tim.draw}</td>
                        <td>${tim.lost}</td>
                        <td>${tim.points}</td>
                    </tr>
                    `;
            });
        });
        document.getElementById(elemid).innerHTML = standingHTML;
        document.getElementById(progressid).classList.remove("progress");
    }

    //liga la&premiere
    if (ligaid === "2014" || ligaid === "2021") {
        let standingLP = data.standings[0].table;
        standingLP = standingLP.slice(0, 15);
        standingLP.forEach(function(tim) {
            standingHTML += `
                    <tr>
                        <td>${tim.position}</td>
                        <td><img src="${tim.team.crestUrl}" width=15px;> ${tim.team.name}</td>
                        <td>${tim.playedGames}</td>
                        <td>${tim.won}</td>
                        <td>${tim.draw}</td>
                        <td>${tim.lost}</td>
                        <td>${tim.points}</td>
                    </tr>
                    `;
        });
        document.getElementById(elemid).innerHTML = standingHTML;
        document.getElementById(progressid).classList.remove("progress");
    }
}

function TeamsHtml(data, ligaid, modalid, progressid) {
    var teamHTML = "";

    getAll().then(function(team) {
        return team;
    }).then(function(team) {

        //liga UEFA
        if (ligaid === "2001") {
            let teamUEFA = data.standings.filter(obj => {
                return obj.type === "TOTAL"
            })
            let timU = [];
            for (i = 0; i < teamUEFA.length; i++) {
                for (j = 0; j < teamUEFA[i].table.length; j++) {
                    timU.push(teamUEFA[i].table[j]);
                }
            }

            timU.forEach(function(tim) {
                tim.like = 0;
            });

            timU.forEach(function(teamUefa) {
                team.forEach(function(teamSaved) {
                    if (teamUefa.team.id === teamSaved.id) {
                        teamUefa.like = 1;
                    }
                });
            });

            timU.forEach(function(tim) {
                if (tim.like === 1) {
                    teamHTML += `
                                <div class="col s12 m5 l5 card" style="margin: 10px; overflow: auto;">
                                    <p> <img style="object-fit: cover; width:10px; height: 10px;" src="${tim.team.crestUrl}" alt="${tim.team.name}" /> ${tim.team.name} <span id="save" class="new badge blue btn ${tim.team.id} disabled" data-badge-caption="Liked" onclick="M.toast({html: '${tim.team.name} liked'})"></span> </p>
                                </div>
                                `;
                }
                if (tim.like === 0) {
                    teamHTML += `
                                <div class="col s12 m5 l5 card" style="margin: 10px; overflow: auto;">
                                    <p> <img style="object-fit: cover; width:10px; height: 10px;" src="${tim.team.crestUrl}" alt="${tim.team.name}" /> ${tim.team.name} <span id="save" class="new badge blue btn ${tim.team.id}" data-badge-caption="Like" onclick="M.toast({html: '${tim.team.name} liked'})"></span> </p>
                                </div>
                                `;
                }
            });
            document.getElementById(modalid).innerHTML = teamHTML;
            document.getElementById(progressid).classList.remove("progress");
        }

        //liga laliga&premiereliga
        if (ligaid === "2014" || ligaid === "2021") {
            let teamLaPrem = data.standings[0].table;

            teamLaPrem.forEach(function(tim) {
                tim.like = 0;
            });

            teamLaPrem.forEach(function(teamLP) {
                team.forEach(function(teamSaved) {
                    if (teamLP.team.id === teamSaved.id) {
                        teamLP.like = 1;
                    }
                });
            });

            teamLaPrem.forEach(function(tim) {
                if (tim.like === 1) {
                    teamHTML += `
                            <div class="col s12 m5 l5 card" style="margin: 10px; overflow: auto;">
                                <p> <img style="object-fit: cover; width:10px; height: 10px;" src="${tim.team.crestUrl}" alt="${tim.team.name}" /> ${tim.team.name} <span id="save" class="new badge blue btn ${tim.team.id} disabled" data-badge-caption="Liked" onclick="M.toast({html: '${tim.team.name} liked'})"></span> </p>
                            </div>
                        `;
                }
                if (tim.like === 0) {
                    teamHTML += `
                            <div class="col s12 m5 l5 card" style="margin: 10px; overflow: auto;">
                                <p> <img style="object-fit: cover; width:10px; height: 10px;" src="${tim.team.crestUrl}" alt="${tim.team.name}" /> ${tim.team.name} <span id="save" class="new badge blue btn ${tim.team.id}" data-badge-caption="Like" onclick="M.toast({html: '${tim.team.name} liked'})"></span> </p>
                            </div>
                        `;
                }
            });
            document.getElementById(modalid).innerHTML = teamHTML;
            document.getElementById(progressid).classList.remove("progress");
        }
    })

}

//Mendapatkan Pertandingan hari ini
function getMatchToday() {
    if ('caches' in window) {
        caches.match(base_url + "matches/").then(function(response) {
            if (response) {
                response.json().then(matchTodalHtml)
                    .then(function() {
                        const carouselH = document.querySelectorAll(".carousel");
                        M.Carousel.init(carouselH, { fullWidth: true });
                    })
            }
        })
    }



    fetch(base_url + "matches/", api_token)
        .then(status)
        .then(json)
        .then(matchTodalHtml)
        .then(function() {
            const carouselH = document.querySelectorAll(".carousel");
            M.Carousel.init(carouselH, { fullWidth: true });
        })
        .catch(error);
}

//Mendapatkan informasi team/team tertentu
function getTeamEng() {
    if ('caches' in window) {
        caches.match(base_url + "teams/").then(function(response) {
            if (response) {
                response.json().then(TeamEngHtml)
                    .then(function() {
                        const modalH = document.querySelectorAll(".modal");
                        M.Modal.init(modalH);
                    })
            }
        })
    }

    fetch(base_url + "teams/", api_token)
        .then(status)
        .then(json)
        .then(TeamEngHtml)
        .then(function() {
            const modalH = document.querySelectorAll(".modal");
            M.Modal.init(modalH);
        })
        .catch(error);
}


//Mendapatkan pertandingan di league tertentu
function getAllMatchesLeag(ligaid, elemid, cprogressid) {

    if ('caches' in window) {
        caches.match(base_url + "competitions/" + ligaid + "/matches").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    allMatchesleagHtml(data, elemid, cprogressid);
                })
            }
        })
    }

    fetch(base_url + "competitions/" + ligaid + "/matches", api_token)
        .then(status)
        .then(json)
        .then(function(data) {
            allMatchesleagHtml(data, elemid, cprogressid);
        })
        .catch(error);
}


//Mendapatkan klasmen League
function getKlasmenLeag(ligaid, elemid, progressid) {

    if ('caches' in window) {
        caches.match(base_url + "competitions/" + ligaid + "/standings").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    klasmenLeagHtml(data, ligaid, elemid, progressid);
                })
            }
        })
    }

    fetch(base_url + "competitions/" + ligaid + "/standings", api_token)
        .then(status)
        .then(json)
        .then(function(data) {
            klasmenLeagHtml(data, ligaid, elemid, progressid);
        })
        .catch(error);
}

//Mendapatkan team liga, siap untuk disimpan
function getTeams(ligaid, modalid, progressid) {

    if ('caches' in window) {
        caches.match(base_url + "competitions/" + ligaid + "/standings").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    TeamsHtml(data, ligaid, modalid, progressid);
                })
            }
        })
    }

    fetch(base_url + "competitions/" + ligaid + "/standings", api_token)
        .then(status)
        .then(json)
        .then(function(data) {
            TeamsHtml(data, ligaid, modalid, progressid);
        })
        .catch(error);
}

function getTeamInfo(id, svMark) {
    return new Promise(function(resolve, reject) {
        if ('caches' in window) {
            caches.match(base_url + "teams/" + id).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        svMark.classList.add("disabled");
                        svMark.setAttribute("data-badge-caption", "Liked");
                        resolve(data);
                    })
                }
            })
        }

        fetch(base_url + "teams/" + id, api_token)
            .then(status)
            .then(json)
            .then(function(data) {
                svMark.classList.add("disabled");
                svMark.setAttribute("data-badge-caption", "Liked");
                resolve(data);
            })
            .catch(function() {
                alert("Mohon maaf, terjadi kesalahan. Silahkan klik tombol Like kembali.")
            });
    })
}

function getSavedTeams() {
    getAll().then(function(team) {
        team.map(key => {
            if (key.email === null) {
                key.email = "-";
            }
            if (key.phone === null) {
                key.phone = "-";
            }
        });

        var savedTeamsHtml = "";
        team.forEach(function(team) {
            savedTeamsHtml += `
            <div class="col s12 m6 l4" style="padding: 0;">
                <a class="modal-trigger" href="#modal${team.id}" style="color: black;">
                    <div class="card fav-tim" style="margin: 10px;">
                        <div class="card-content row">
                            <div style="margin-right:auto !important;">
                                <img src="${team.crestUrl}" alt="${team.name}" onError="this.onerror=null;this.src='/images/page/unknown_logo.svg';" class="col s12 m6 l5 fav-tim-img">
                            </div>
                            <span class="col s12 m6 l6 center-align fav-tim-name">${team.name}</span>
                        </div>
                    </div>
                </a>
            </div>

            <div id="modal${team.id}" class="modal">
                <div class="modal-content">
                    <h4 class="center-align">${team.name}</h4>
                        <div class="row">
                            <div class="col s12 m2 l4 center-align">
                                <img width=100 class="center-align" alt="${team.name}" src="${team.crestUrl}"/>
                            </div>
                                <div class="col s12 m10 l8 left-align">
                                    <p style="margin: 0;"> <span style="font-weight:bold;">Nama : </span>${team.shortName}</p>
                                    <p style="margin: 0;"> <span style="font-weight:bold;">Alamat : </span>${team.address}</p>
                                    <p style="margin: 0;"> <span style="font-weight:bold;">Didirikan : </span>${team.founded}</p>
                                    <p style="margin: 0;"> <span style="font-weight:bold;">Stadiun : </span>${team.venue}</p>
                                    <p style="margin: 0;"> <span style="font-weight:bold;">Email : </span>${team.email}</p>
                                    <p style="margin: 0;"> <span style="font-weight:bold;">phone : </span>${team.phone}</p>
                                    <p style="margin: 0;"> <span style="font-weight:bold;">Website : </span>${team.website}</p>
                                </div>
                        </div>
                </div>
                <div class="modal-footer">
                    <button id="delete" href="#liked" class="${team.id} modal-close btn pink darken-4" type="submit" style="margin-right:10px; name="action">Dislike</button>
                    <button class="btn modal-close blue-grey darken-4" type="submit" name="action">Back</button>
                </div>
            </div>
            `;
        });
        //Menyisipkan team yang disukai
        document.getElementById("savedTeams").innerHTML = savedTeamsHtml;
    }).then(function() {
        const modalSt = document.querySelectorAll(".modal");
        M.Modal.init(modalSt);
    })
}

// Event binding handler 
document.addEventListener("click", function(elm) {
    if (elm.target.classList.contains("checkout")) {
        getKlasmenLeag("2001", "standing-ul", "ul-progress");
        getKlasmenLeag("2021", "standing-pl", "pl-progress");
        getKlasmenLeag("2014", "standing-ll", "ll-progress");
    }
})