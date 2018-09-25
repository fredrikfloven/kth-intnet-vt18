/* jslint node: true */
"use strict";

//Module imports
var express = require('express');
var router = express.Router();
var userManager = require("./userManager.js");
var crypto = require('crypto');
var mysql = require('mysql');
var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'uncrackable',
  database: 'new_schema',
  multipleStatements: true
});
// mysql --host=127.0.0.1 --user=root --password=uncrackable

//Function for running query
function runQuery(query, callback) {
  console.log('Running: ' + query);

  pool.getConnection(function (error, connection) {
    //Make sure that we got the new connection from the pool and there was no error
    if (error != undefined) {
      //return error
      if (callback != undefined) {
        callback(error, []);
      }
      //exit so that we don't run the query
      return;
    }
    //Send query to mysql
    connection.query(query, function (error, result) {
      //disconnect from mysql
      connection.release();

      // If the query failed, return error and empty array.
      if (error != undefined) {
        //return error
        if (callback != undefined) {
          callback(error, []);
        }
        //exit so that we don't run the query
        return;
      } else {
        //call the callback with result
        if (callback != undefined) {
          callback(undefined, result);
        }
      }
    });
  });
};

//salt function
var genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex') /** convert to hexadecimal format */
          .slice(0,length);   /** return required number of characters */
};

//hash function
var sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  return {
      salt:salt,
      passwordHash:value
  };
};


// Get all meals for logged in user
router.get('/meals', function (req, res) {
  var userId = req.query.uid;
  runQuery('SELECT * FROM meals WHERE userName = "' + userId + '";', function (error, result) {
    res.json(result);
  });
});



// Get specific meal for logged in user
router.get('/meals/:id', function (req, res) {
  runQuery('SELECT * FROM meals WHERE id = ' + req.params.id + ' AND userName = "' + req.query.uid + '";', function (error, result) {
    if (result == undefined) {
      res.status(404).send("Not found");
    } else {
      res.json(result[0]);
    }
  });
});

// Post new meal
router.post('/meals', function (req, res) {
  // Create 'create meal' function to use later.
  var createMeal = function () {
    var query = 'INSERT INTO meals VALUES (0, "' + req.body.userName + '", "' +
      req.body.mealType + '", "' + req.body.mealName + '", "' + req.body.eatenAt + '", "' + req.body.ingredients + '");';
      console.log(req.body.eatenAt);
    //Insert request body into db
    runQuery(query, function (error, result) {
      //check if error occurred and return error code
      if (error != undefined) {
        console.log(error);
        res.status(500).send("oopsie");
        return;
      }
      res.json(result);
    });
  }
  createMeal();
});

// Get all ingredients
router.get('/ingredients', function (req, res) {
  runQuery('SELECT * FROM ingredients', function (error, result) {
    res.json(result);
  });
});

function saltHashPassword(userpassword) {
  //Gives salt of length 16
  var salt = genRandomString(16);
  //calls the hash-function
  var passwordData = sha512(userpassword, salt);
  return {
    pwhash:passwordData.passwordHash,
    pwhashsalt:passwordData.salt
  }
}

//Set user functions
router.post('/setUser', function (req, res) {
  //Get variables connected to user
  var username = req.body.username;
  var password = req.body.password;
  var createOrLogin = req.body.createOrLogin;
  console.log("createOrLogin: " + createOrLogin);
  //If user wants to create a new account
  if (createOrLogin == "create") {
    //Creates a user id
    userManager.clearArray();
    userManager.addUser(username);
    var userid = userManager.getUserId();
    //gets hashed password and hashed salt
    var hash = saltHashPassword(password);
    //function for storing user into db, with salt-hashed password and hashed salt
    var createUser = function () {
      var query = 'INSERT INTO users VALUES ("'+ userid +'","' + username +  '", "'  + hash.pwhash 
      + '", "' + hash.pwhashsalt +'");';
      runQuery(query, function (error, result) {
        //If a user with that username already exists, return error status
        if (error != undefined) {
          console.log(error);
          res.status(500).send("User exists");
          return;
        }
        //Set cookie to user id
        res.cookie('userId', userid);
        res.json(result);
      });
    }
    createUser();
  }
  //if the user wants to log in to an existing account
  else{
    //check in db if user exists
    runQuery('SELECT * FROM users where username = "' + username + '";', function (error, result) {
      var data = result;
      //if retrieved query isnt empty
      if(data[0] != undefined){
        //get userid, username and password and stored salt
        var retrievedUserid = data[0].userid;
        var retrievedUsername = data[0].username;
        var retrievedPassword = data[0].password;
        var retrievedSalt = data[0].salt;
        //set variable for hash-check
        var newhash = sha512(password, retrievedSalt);
        //if password is correct
        if(retrievedPassword == newhash.passwordHash){
          console.log("Correct password");
          console.log(data[0].userid);
          //set cookie
          res.cookie('userId', retrievedUserid);
          res.status(200).send("ok");
          return;
        }
        else{
          console.log("Username not found or password incorrect");
        }
      }
      else{
        console.log("Username not found or password incorrect");
        res.status(404).send("Not found");
        return;
      }
    });       
  }
});


module.exports = router;