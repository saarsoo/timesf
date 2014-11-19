.import QtQuick.LocalStorage 2.0 as LS

var db;

function checkDBConnection(){
    if (db){
        return;
    }

    db = LS.LocalStorage.openDatabaseSync('timesfDB', '1.0');

    db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS settings(key TEXT, value TEXT)');
    });
}

function getSettings(){
    checkDBConnection();

    var settings = {};
    db.transaction(function(tx){
        var rs = tx.executeSql('SELECT key, value FROM settings');
        for (var i = 0; i < rs.rows.length; i++) {
            var setting = rs.rows.item(i);
            settings[setting.key] = setting.value;
        }
    });

    return settings;
}

function saveSid(sid){
    checkDBConnection();

    db.transaction(function(tx){
        tx.executeSql('INSERT INTO settings VALUES (?, ?)', ['sid', sid]);
    });
}


function saveSettings(settings){
    checkDBConnection();

    db.transaction(function(tx){
        tx.executeSql('DELETE FROM settings');

        for (var key in settings) {
            if (settings.hasOwnProperty(key)) {
                tx.executeSql('INSERT INTO settings VALUES (?, ?)', [key, settings[key]]);
            }
        }
    });
}
