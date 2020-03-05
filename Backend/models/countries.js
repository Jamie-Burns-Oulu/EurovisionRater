const db = require('../database');

const countries = {
    getAllCountries(callback) {
        db.query('SELECT * FROM countries;', callback);
    },
    getCountryById(id, callback) {
        db.query('SELECT * FROM countries WHERE idCountries = ?;', [id], callback);
    },
    addCountry(info, callback) {
        return db.query(
            "insert into countries (name, flag, runningOrder) values(?,?,?)",
            [info['Name'], info['Flag'], info['runningOrder']], callback
        );
    },

};

module.exports = countries;