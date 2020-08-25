var dbPromised = idb.open("soccer-base", 1, function(upgradeDb) {
    var teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamsObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(team) {
    dbPromised
        .then(function(db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            store.put(team);
            return tx.complete;
        })
        .then(function() {
            console.log("Team berhasil di simpan.");
        })
        .catch(function() {
            alert("Tim sudah tersimpan di Liked Teams.");
        })
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll()
            })
            .then(function(teams) {
                resolve(teams);
            });
    });
}

function deleteTeam(key) {
    dbPromised
        .then(function(db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            let intKey = parseInt(key);
            store.delete(intKey);
            return tx.complete;
        })
        .then(function() {
            console.log("Team berhasil dihapus.");
        })
        .catch(function() {
            console.log("Team gagal dihapus.");
        });
}