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
    }
  };

  return methods;
});