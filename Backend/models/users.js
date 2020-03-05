const db = require('../database');

const users = {
    getAllUsers(callback) {
        db.query('SELECT * FROM users', callback);
    },
    getUsersById(id, callback) {
        db.query('SELECT * FROM users WHERE idUsers = ?', [id], callback);
    },
    addUser(info, callback) {
        return db.query(
            "insert into users (name) values(?)", [info['Name']], callback
        );
    },

};

module.exports = users;