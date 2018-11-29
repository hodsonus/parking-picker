angular.module('lots', []).factory('Lots', function($http) {
  var methods = {
    getAll: function () {
      return $http.get('/api/lots');
    },

    getAllScooters: function () {
      return $http.get('/api/scooters');
    },
  };

  return methods;
});
