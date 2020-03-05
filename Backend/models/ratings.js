const db = require('../database');

const ratings = {
    getAllRatings(callback) {
        db.query('SELECT * FROM ratings;', callback);
    },
    getRatingsById(id, callback) {
        db.query(`SELECT * FROM ratings WHERE idRatings = ?;`, [id], callback);
    },
    addRating(info, callback) {
        return db.query(
            "insert into ratings (overall, song, performance, comment, user_id, country_id) values(?,?,?,?,?,?)",
            [info['overall'], info['song'], info['performance'], info['comment'], info['user_id'],
            info['country_id']], callback
        );
    },
    updateOverall(info, callback) {
        return db.query(" UPDATE ratings SET overall = ? WHERE user_id = ? and country_id = ?;",
            [info['overall'], info['user'], info['country']], callback
        );
    },
    updateSong(info, callback) {
        return db.query(" UPDATE ratings SET song = ? WHERE user_id = ? and country_id = ?;",
            [info['song'], info['user'], info['country']], callback
        );
    },
    updatePerformance(info, callback) {
        return db.query(" UPDATE ratings SET performance = ? WHERE user_id = ? and country_id = ?;",
            [info['performance'], info['user'], info['country']], callback
        );
    },
    updateComment(info, callback) {
        return db.query(" UPDATE ratings SET comment = ? WHERE user_id = ? and country_id = ?;",
            [info['comment'], info['user'], info['country']], callback
        );
    },

};

module.exports = ratings;

