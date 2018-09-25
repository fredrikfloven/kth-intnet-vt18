(function() {

  angular.module('chat')

  .factory('HttpService', function($http) {
    return {
      post: function(path, data, callback){
        $http.post('/API/' + path, data).success(callback);
      },
      get: function(path, callback){
        $http.get('/API/' + path).success(callback);
      }
    };
  });

})();
