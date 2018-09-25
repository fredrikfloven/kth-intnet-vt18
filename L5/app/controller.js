/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
var userManager = require("./userManager.js");
var socketManager = require('./socketManager.js');
var mysql = require('mysql');
var pool = mysql.createPool({
  // host: 'eu-cdbr-azure-west-b.cloudapp.net',
  // user: 'bed56617000a00',
  // password: '73289a7b',
  // database: 'simfrelabs',
  host: '127.0.0.1',
  user: 'root',
  password: 'uncrackable',
  database: 'new_schema',
  multipleStatements: true
});

//mysql --host=eu-cdbr-azure-west-b.cloudapp.net --user=bed56617000a00 --password=73289a7b

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
// Get all securities
router.get('/securities', function (req, res) {

  runQuery('SELECT * FROM securities', function (error, result) {
    res.json(result);
  });
});
// Get specific security
router.get('/securities/:id', function (req, res) {

  runQuery('SELECT * FROM securities WHERE id = ' + req.params.id, function (error, result) {
    if (result == undefined) {
      res.status(404).send("Not found");
    } else {
      res.json(result[0]);
    }
  });
});
// Get orders for specific security
router.get('/securities/:id/orders', function (req, res) {

  runQuery('SELECT * FROM orders WHERE securityId = ' + req.params.id, function (error, result) {
    if (result == undefined) {
      res.status(404).send("Not found");
    } else {
      res.json(result);
    }
  });
});
// Get trades for specific security
router.get('/securities/:id/trades', function (req, res) {

  runQuery('SELECT * FROM trades WHERE securityId = ' + req.params.id, function (error, result) {
    if (result == undefined) {
      res.status(404).send("Not found");
    } else {
      res.json(result);
    }
  });
});

//Post new security
router.post('/securities', function (req, res) {

  var query = 'INSERT INTO securities VALUES (0, "' +
    req.body.name + '")' + '; SELECT * FROM securities WHERE id = LAST_INSERT_ID();';


  //Insert request body (name) into db
  runQuery(query, function (error, result) {
    //check if error occurred and return error code
    if (error != undefined) {
      console.log(error);
      res.status(500).send("oopsie");
      return;
    }
    // res.status(201).send("created");
    res.json(result[1][0]);
  });

});

// Post new order for specific security
router.post('/orders', function (req, res) {
  // Create 'create order' function to use later.
  var createOrder = function () {
    var query = 'INSERT INTO orders VALUES (0, ' + req.body.securityId + ', "' +
      req.body.type + '", ' + req.body.price + ', ' + req.body.amount + ', "' + req.body.uid + '")' +
      '; SELECT * FROM orders WHERE id = LAST_INSERT_ID();';

    //Insert request body (name) into db
    runQuery(query, function (error, result) {
      //check if error occurred and return error code
      if (error != undefined) {
        console.log(error);
        res.status(500).send("oopsie");
        return;
      }

      // get shared io so we can access all the sockets and 
      // broadcast the new order object.
      var io = socketManager.getIo();
      io.sockets.emit('newOrder', result[1][0]);
      // res.status(201).send("created");
      res.json(result[1][0]);
    });
  }
  // For matching orders
  var match = function (orderType) {
    // Create opposite.
    var oppositeOrderType = 'sell';
    if (orderType == 'sell') {
      oppositeOrderType = 'buy';
    }
    // Show opposite query, if you bought, show sell and vice versa 
    runQuery('SELECT * FROM orders WHERE securityId = ' + req.body.securityId +
      ' AND type = "' + oppositeOrderType + '" AND price = ' + req.body.price,
      function (error, result) {
        if (result == undefined) {
          res.status(404).send("Not found");
        } else {
          // Keep track if the order should be created.
          var shouldCreate = true;

          for (var i = 0; i < result.length; i++) {
            // Figure out buyer and seller.
            var buyer = result[i].uid;
            var seller = req.body.uid;
            if (orderType == 'buy') {
              buyer = req.body.uid;
              seller = result[i].uid;
            }

            // Create date time.
            var dt = new Date().toISOString();
            // Check if orders match exactly, is less or is more
            if (req.body.amount == result[i].amount) {
              // Execute queries.
              runQuery('DELETE FROM orders WHERE id = ' + result[i].id);
              runQuery('INSERT INTO trades VALUES (0, ' + req.body.securityId + ', ' + req.body.price +
                ', ' + result[i].amount + ', "' + dt + '", "' + buyer + '", "' + seller + '")');

              // get shared io so we can access all the sockets and 
              // broadcast the new order object.
              var io = socketManager.getIo();
              io.sockets.emit('newTrade', {
                securityId: req.body.securityId,
                price: req.body.price,
                amount: req.body.amount,
                dt: dt,
                buyer: buyer,
                seller: seller
              });
              io.sockets.emit('deleteOrder', {
                securityId: req.body.securityId,
                id: result[i].id
              });

              // Don't create this.
              shouldCreate = false;

              // Done, nothing more to sell.
              break;
            } else if (req.body.amount > result[i].amount) {
              // Execute queries.
              runQuery('DELETE FROM orders WHERE id = ' + result[i].id);
              runQuery('INSERT INTO trades VALUES (0, ' + req.body.securityId + ', ' + req.body.price +
                ', ' + result[i].amount + ', "' + dt + '", "' + buyer + '", "' + seller + '")');

              // get shared io so we can access all the sockets and 
              // broadcast the new order object.
              var io = socketManager.getIo();
              io.sockets.emit('newTrade', {
                securityId: req.body.securityId,
                price: req.body.price,
                amount: result[i].amount,
                dt: dt,
                buyer: buyer,
                seller: seller
              });
              io.sockets.emit('deleteOrder', {
                securityId: req.body.securityId,
                id: result[i].id
              });

              // Reduce amount in requested order.
              req.body.amount -= result[i].amount;
            } else if (req.body.amount < result[i].amount) {
              // Reduce amount in other order.
              result[i].amount -= req.body.amount;

              // Execute queries.
              runQuery('UPDATE orders SET amount = ' + result[i].amount + ' WHERE id = ' + result[i].id);
              runQuery('INSERT INTO trades VALUES (0, ' + req.body.securityId + ', ' + req.body.price +
                ', ' + req.body.amount + ', "' + dt + '", "' + buyer + '", "' + seller + '")');

              // get shared io so we can access all the sockets and 
              // broadcast the new order object.
              var io = socketManager.getIo();
              io.sockets.emit('newTrade', {
                securityId: req.body.securityId,
                price: req.body.price,
                amount: result[i].amount,
                dt: dt,
                buyer: buyer,
                seller: seller
              });
              io.sockets.emit('updateOrder', {
                securityId: req.body.securityId,
                id: result[i].id,
                amount: result[i].amount
              });

              // Don't create this.
              shouldCreate = false;

              // Done, nothing more to sell.
              break;
            }
          }

          // If the for loop was passed, and the order should still
          // be created, create it.
          if (shouldCreate) {
            createOrder();
          } else {
            res.status(200).send('ok');
          }
        }
      });
  }

  // Run match with right type.
  match(req.body.type);
});

router.post('/setUser', function (req, res) {
  //get user by name
  var name = req.body.name;
  var user = userManager.getUserByName(name);
  // If user doesn't exist, create user
  if (user == undefined) {
    userManager.addUser(name);
    user = userManager.getUserByName(name);
  }
  res.cookie('userId', user.id);
  res.status(200).send("ok");

});


module.exports = router;