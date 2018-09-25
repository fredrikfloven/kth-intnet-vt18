var controllers = angular.module('controllers', []);


controllers.controller('navigationController', ['$scope', '$location',
  function ($scope, $location) {
    $scope.location = $location.path();

    // // This function should direct the user to the wanted page
    $scope.redirect = function (address) {
      $location.hash("");
      $location.path('/' + address);
      $scope.location = $location.path();
      console.log("location = " + $scope.location);
    };

  }
]);

controllers.controller('loginController', ['$scope', 'HttpService', '$location',
  function ($scope, http, $location) {
    $scope.name = "";
    $scope.done = function () {
      console.log("Reached done()");
      http.post('setUser', {
        name: $scope.name
      }, function (response) {
        console.log(response);
        $location.path('securities');
      });
    };
  }
]);

// Helpers to get cookie.
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

controllers.controller('securitiesController', ['$scope', '$location', 'HttpService',
  function ($scope, $location, http) {

    // Check for user id in cookie, redirect to login if there is none
    var userId = getCookie("userId");
    if (userId == undefined) {
      $location.path('login');
      return;
    }

    $scope.securities = [];
    http.get("securities", function (data) {
      $scope.securities = data;
    });

    $scope.redirect = function (address) {
      $location.hash("");
      $location.path('/' + address);
      $scope.location = $location.path();
      console.log("location = " + $scope.location);
    };
  }
]);


controllers.controller('newSecurityController', ['$scope', '$location', 'HttpService',
  function ($scope, $location, http) {

    // Check for user id in cookie, redirect to login if there is none
    var userId = getCookie("userId");
    if (userId == undefined) {
      $location.path('login');
      return;
    }

    $scope.name = "";
    $scope.done = function () {
      http.post('securities', {
        name: $scope.name
      }, function (response) {
        console.log(response);

        $location.path('securities');
      });
    };
  }
]);

controllers.controller('securityController', ['$scope', '$location', 'HttpService', '$routeParams',
  function ($scope, $location, http, $routeParams) {

    // Check for user id in cookie, redirect to login if there is none
    var userId = getCookie("userId");
    if (userId == undefined) {
      $location.path('login');
      return;
    }

    $scope.security = undefined;
    $scope.orders = [];
    $scope.trades = [];
    http.get("securities/" + $routeParams.id, function (data) {
      $scope.security = data;

      // connect the front-end to the open socket.
      var socket = io().connect();

      // register callback for the 'newOrder' event.
      socket.on('newOrder', function (data) {
        // if the security id of the new order belongs to the security
        // we are 'watching' - add it to the orders list.
        if (data.securityId == $scope.security.id) {
          // $scope.$apply makes sure that angular rerenders the HTML 
          // when we update the scope. For any code that is within
          // the callback.
          $scope.$apply(function () {
            $scope.orders.push(data);
          });
        }
      });

      // register callback for the 'deleteOrder' event.
      socket.on('deleteOrder', function (data) {
        // if the security id of the new order belongs to the security
        // we are 'watching' - add it to the orders list.
        if (data.securityId == $scope.security.id) {
          // $scope.$apply makes sure that angular rerenders the HTML 
          // when we update the scope. For any code that is within
          // the callback.
          $scope.$apply(function () {
            // Loop through all of the orders and find the order
            // with the id from the event (in data) and delete it.
            for (var i = 0; i < $scope.orders.length; i++) {
              if ($scope.orders[i].id == data.id) {
                $scope.orders.splice(i, 1);
                break;
              }
            }
          });
        }
      });

       // register callback for the 'updateOrder' event.
       socket.on('updateOrder', function (data) {
        // if the security id of the new order belongs to the security
        // we are 'watching' - add it to the orders list.
        if (data.securityId == $scope.security.id) {
          // $scope.$apply makes sure that angular rerenders the HTML 
          // when we update the scope. For any code that is within
          // the callback.
          $scope.$apply(function () {
            // Loop through all of the orders and find the order
            // with the id from the event (in data) and delete it.
            for (var i = 0; i < $scope.orders.length; i++) {
              if ($scope.orders[i].id == data.id) {
                $scope.orders[i].amount = data.amount;
                break;
              }
            }
          });
        }
      });

      // register callback for the 'newTrade' event.
      socket.on('newTrade', function (data) {
        // if the security id of the new order belongs to the security
        // we are 'watching' - add it to the orders list.
        if (data.securityId == $scope.security.id) {
          // $scope.$apply makes sure that angular rerenders the HTML 
          // when we update the scope. For any code that is within
          // the callback.
          $scope.$apply(function () {
            $scope.trades.push(data);
          });
        }
      });
    });
    http.get("securities/" + $routeParams.id + "/orders", function (data) {
      $scope.orders = data;
    });
    http.get("securities/" + $routeParams.id + "/trades", function (data) {
      $scope.trades = data;
    });

    $scope.redirect = function (address) {
      $location.hash("");
      $location.path('/' + address);
      $scope.location = $location.path();
      console.log("location = " + $scope.location);
    };
  }
]);


controllers.controller('newOrderController', ['$scope', '$location', 'HttpService', '$routeParams',
  function ($scope, $location, http, $routeParams) {

    // Check for user id in cookie, redirect to login if there is none
    var userId = getCookie("userId");
    if (userId == undefined) {
      $location.path('login');
      return;
    }

    $scope.security = undefined;
    http.get("securities/" + $routeParams.id, function (data) {
      $scope.security = data;
    });

    $scope.type = "";
    $scope.price = 0;
    $scope.amount = 0;
    $scope.done = function () {
      http.post('orders', {
        securityId: $scope.security.id,
        type: $scope.type,
        price: $scope.price,
        amount: $scope.amount,
        uid: userId
      }, function (response) {
        console.log(response);

        $location.path('securities/' + $routeParams.id);
      });
    };
  }
]);
