(function(){
    var router = angular.module("log", [
    'ngRoute',
    'clientControllers',
    'ui.bootstrap'
    ]);
  
    router.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/login', {
          templateUrl: 'login.html',
          controller: 'loginController'
        }).
        when('/meals', {
          templateUrl: 'meals.html',
          controller: 'mealsController'
        }).
        when('/meals/:id', {
          templateUrl: 'meal.html',
          controller: 'mealController'
        }).
        when('/newMeal', {
          templateUrl: 'newMeal.html',
          controller: 'newMealController'
        }).
        when('/ingredients', {
          templateUrl: 'ingredients.html',
          controller: 'ingredientsController'
        }).
        otherwise({
          redirectTo: '/meals'
        });
    }]);
  })();