var express = require('express');
var router = express.Router();
var countries = require("../models/countries");

// GET 
router.get("/:id?", function (req, res, next) {
  if (req.params.id) {
    countries.getCountryById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    countries.getAllCountries(function (err, rows) {
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
  countries.addCountry(req.body, function (err, count) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log('New Country Added');
      res.json(req.body);
    }
  });
});



module.exports = router;