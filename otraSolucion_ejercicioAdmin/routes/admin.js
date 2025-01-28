let express = require('express');
let router = express.Router();
const database = require('../database');
const { name } = require('ejs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Admin', usuarios:database.users.data ,logged_user: req.session.user, games: database.games});
});

router.post('/deleteUser',function(req, res, next) {
    
   //si logeas como admin, puedes borrar el usuario recibido que esta en body  
        if(req.session.user.role == 'admin'){
            delete database.users.data[req.body.username];
            res.redirect("/admin");
          } else {
            req.session.error = "Unauthorized access";
            res.redirect("/");
          }
    }


  );

router.post('/games', function(req, res, next){
  const name = req.body.nombre;
  const genero = req.body.genero;
  const descripcion = req.body.descripcion;
  if (name){
    database.games.saveGames(name, genero, descripcion);
  }
  console.log(database.games);
  res.redirect('/admin');
});

router.post('/games/remove', function(req, res){
  const nombre = req.body.btn; 
  database.games.remove(nombre);
  res.redirect('/admin');
});

module.exports = router;
