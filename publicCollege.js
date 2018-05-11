
var express = require('express');
var router = express.Router();

var redis = require('redis');

//const client =
router.get('/', function(req, res, next) {

  //use client to get info


  res.render('publicColleges');
});
router.get('/berkeley', function(req, res, next) {

//client.hgetall();

  res.render('coursesAtCollege');
});
router.get('/UCLA', function(req, res, next) {
  res.render('coursesAtCollege');
});
router.get('/michigan', function(req, res, next) {
  res.render('coursesAtCollege');
});

module.exports = router;
