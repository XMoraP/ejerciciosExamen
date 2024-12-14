const express = require('express');
const router = express.Router();
const users = require('../database/models/user.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user:req.session.user});
});

module.exports = router;
