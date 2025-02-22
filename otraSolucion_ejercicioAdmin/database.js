const bcrypt = require("bcrypt");
const { json } = require("express");

const NAMES = ["juan", "ana", "rodrigo", "maria"];

const database = {};
database.users = {};
database.users.data = {};
database.games = {}; //Trabajar con este objeto

database.users.generateHash = function(pass, callback){
    bcrypt.hash(pass, 10, callback);
}
database.users.comparePass = async function(pass, hash){
    return await bcrypt.compare(pass, hash);
}
database.users.register = function(username, password, role) {
    if (database.users.data.hasOwnProperty(username)){
        throw new Error(`Username ${username} already exists`);
    }
    
    database.users.generateHash(password, function(err, hash){
        if (err){
            throw new Error("Error generating hash for " + password);
        }
        database.users.data[username] = {username, hash, role, last_login: new Date().toISOString()};
    });
}
database.users.isLoginRight = async function(username, password) {
    if (!database.users.data.hasOwnProperty(username)){
        return false;
    }
    return await database.users.comparePass(password, database.users.data[username].hash);
}

database.games.saveGames = async function(nombre, genero, descripcion) {
    database.games[nombre] = {nombre, genero, descripcion, fecha: new Date().toISOString()};
};
database.games.remove = async function(nombre){
  delete database.games[nombre];
};
function initializeUsers(){
    
    database.users.register("admin", "admin", "admin");
    database.games.saveGames('default', 'defaul', 'default');
    NAMES.forEach(function(username){
        database.users.register(username, "1234", "user");
    });
    console.log("Database initialized");
    console.log(database);
    
}


initializeUsers();

module.exports = database;