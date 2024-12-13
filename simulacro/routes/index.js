const express = require('express');
const router = express.Router();
const users = require('../database/models/user.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user:req.session.user});
});

router.post('/cookies', async (req, res) => {
  console.log(users);
  req.session.cookies = req.body.cookiesAceptadas;
  
  //const nombre = req.session.user.username;
  console.log(req.session.user);
  console.log(users.data);
  const cookies = req.body.cookiesAceptadas;
  users.data[req.session.user.username].cookies = cookies;
  console.log(users.data);
  console.log(req.body);
  console.log(req.session.cookies);
  res.json({cookies: req.session.cookies});
});

module.exports = router;
