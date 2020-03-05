var express = require('express');
var router = express.Router();
var ratings = require("../models/ratings");

// GET 
router.get("/:id?", function (req, res, next) {
  if (req.params.id) {
    ratings.getRatingsById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    ratings.getAllRatings(function (err, rows) {
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
  ratings.addRating(req.body, function (err, count) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log('New Rating Added');
      res.json(req.body);
    }
  });
});

// Update
router.put("/overall", function (req, res, next) {
  console.log(req.body);
  ratings.updateOverall(req.body, function (err, count) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log('Overall Updated');
      res.json(req.body);
    }
  });
});

router.put("/song", function (req, res, next) {
  console.log(req.body);
  ratings.updateSong(req.body, function (err, count) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log('Song Updated');
      res.json(req.body);
    }
  });
});

router.put("/performance", function (req, res, next) {
  console.log(req.body);
  ratings.updatePerformance(req.body, function (err, count) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log('Performance Updated');
      res.json(req.body);
    }
  });
});

router.put("/comment", function (req, res, next) {
  console.log(req.body);
  ratings.updateComment(req.body, function (err, count) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log('Comment Updated');
      res.json(req.body);
    }
  });
});


module.exports = router;
