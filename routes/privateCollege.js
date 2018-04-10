var express = require('express');
var router = express.Router();
var redis = require('redis');


router.get('/', function(req, res, next) {
  res.render('colleges');
});
router.get('/harvard', function(req, res, next) {
  res.render('coursesAtCollege');
});
router.get('/stanford', function(req, res, next) {
  res.render('coursesAtCollege');
});
router.get('/MIT', function(req, res, next) {
  res.render('coursesAtCollege');
});

module.exports = router;
