(function(){
  var app = angular.module("chat", [
  'ngRoute',
  'controllers',
  'ui.bootstrap'
  ]);

  app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'login.html',
        controller: 'loginController'
      }).
      when('/securities/:id', {
        templateUrl: 'security.html',
        controller: 'securityController'
      }).
      when('/securities', {
        templateUrl: 'securities.html',
        controller: 'securitiesController'
      }).
      when('/newSecurity', {
        templateUrl: 'newSecurity.html',
        controller: 'newSecurityController'
      }).
      when('/securities/:id/newOrder', {
        templateUrl: 'newOrder.html',
        controller: 'newOrderController'
      }).
      otherwise({
        redirectTo: '/securities'
      });
  }]);
})();