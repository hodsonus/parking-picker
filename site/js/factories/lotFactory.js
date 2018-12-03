angular.module('lots', []).factory('Lots', function($http) {
  var methods = {
    getAll: function () {
      return $http.get('/api/lots');
    },

    getAllScooters: function () {
      return $http.get('/api/scooters');
    },

    postFullness: function (currFullness, id) {
      return $http.post('/api/lots/fullness', {
        fullness: currFullness,
        officialId: id,
      });
    },

    getBuildings: function () {
      return $http.get('/api/buildings');
    }
  };

  return methods;
});
