angular.module('lots', []).factory('Lots', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('/api/lots');
    },
	
  	create: function(lot) {
  	  return $http.post('/api/lots', lot);
    }, 

    delete: function(id) {
      return $http.delete('/api/lots' + id);
    },

    postFullness: function(currFullness, id) {
      return $http.post('/api/lots/fullness', {
      	fullness: currFullness,
      	officialId: id,
      });
    }
  };

  return methods;
});
