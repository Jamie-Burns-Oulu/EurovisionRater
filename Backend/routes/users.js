var express = require('express');
var router = express.Router();
var users = require("../models/users");

// GET 
router.get("/:id?", function (req, res, next) {
  if (req.params.id) {
    users.getUsersById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    users.getAllUsers(function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

// ADD
router.post("/", function (req, res, next) {
  console.log(req.body);
  users.addUser(req.body, function (err, count) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log('New User Added');
      res.json(req.body);
    }
  });
});



module.exports = router;
