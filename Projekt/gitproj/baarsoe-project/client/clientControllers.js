var clientControllers = angular.module('clientControllers', []);


clientControllers.controller('navigationController', ['$scope', '$location',
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

clientControllers.controller('loginController', ['$scope', 'HttpService', '$location',
  function ($scope, http, $location) {
    $scope.userid = "";
    $scope.username = "";
    $scope.password = "";
    $scope.done = function () {
      http.post('setUser', {
        userid: $scope.userid,
        username: $scope.username,
        password: $scope.password,
        createOrLogin: $scope.createOrLogin
      }, function (response) {
        console.log(response);
        $location.path('meals');
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

clientControllers.controller('mealsController', ['$scope', '$location', 'HttpService', 
  function ($scope, $location, http) {

      // Check for user id in cookie, redirect to login if there is none
    var userId = getCookie("userId");
    if (userId == undefined) {
      $location.path('login');
      return;
    }
    var params = {
      uid: userId
    };

    $scope.meals = [];
    http.get("meals"+"?"+$.param(params), function (data) {
      $scope.meals = data;
    });

    $scope.redirect = function (address) {
      $location.hash("");
      $location.path('/' + address);
      $scope.location = $location.path();
      console.log("location = " + $scope.location);
    };
  }
]);

clientControllers.controller('newMealController', ['$scope', '$location', 'HttpService',
  function ($scope, $location, http) {
      // Check for user id in cookie, redirect to login if there is none
    var userId = getCookie("userId");
    if (userId == undefined) {
      $location.path('login');
      return;
    }

    var d = new Date();
    $scope.userName = userId;
    $scope.mealType = "Omnivorianskt";
    $scope.mealName = "";
    $scope.eatenAt = d.getUTCFullYear() + "/" + (d.getUTCMonth() + 1) + "/" + d.getUTCDate();
    $scope.ingredients = "";
    $scope.done = function () {
      http.post('meals', {
        id: $scope.id,
        userName: $scope.userName,
        mealType: $scope.mealType,
        mealName: $scope.mealName,
        eatenAt: $scope.eatenAt,
        ingredients: $scope.ingredients
      }, function (response) {
        console.log(response);

        $location.path('meals');
      });
    };
  }
]);

clientControllers.controller('mealController', ['$scope', '$location', 'HttpService', '$routeParams',
  function ($scope, $location, http, $routeParams) {

    // Check for user id in cookie, redirect to login if there is none
    var userId = getCookie("userId");
    if (userId == undefined) {
      $location.path('login');
      return;
    }
    var params = {
      uid: userId
    };

    $scope.meal = undefined;
    http.get("meals/" + $routeParams.id + "?" + $.param(params), function (data) {
      $scope.meal = data;
    });

    $scope.redirect = function (address) {
      $location.hash("");
      $location.path('/' + address);
      $scope.location = $location.path();
      console.log("location = " + $scope.location);
    };
  }
]);

clientControllers.controller('ingredientsController', ['$scope', '$location', 'HttpService',
  function ($scope, $location, http) {
    $scope.ingredients = [];
    http.get("ingredients", function (data) {
      $scope.ingredients = data;
    });
  }
]);