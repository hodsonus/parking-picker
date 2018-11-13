angular.module('lots').controller('LotsController', ['$scope', 'Lots', 
  function($scope, Lots) {
    /* Get all the lots, then bind it to the scope */
    Lots.getAll().then(function(response) {
      $scope.lots = response.data;
      console.log(response);
    }, function(error) {
      console.log('Unable to retrieve lots:', error);
    });

    // $scope.detailedInfo = undefined;

   //  $scope.addListing = function() {
	  // /*
   //  Save the article using the Listings factory. If the object is successfully 
	  // saved redirect back to the list page. Otherwise, display the error
	  // */

   //    Listings.create($scope.newListing);
   //    $scope.newListing = {};
   //    location.reload();
   //  };

   //  $scope.deleteListing = function(index) {
	  //  /*
   //   Delete the article using the Listings factory. If the removal is successful, 
	  //  navigate back to 'listing.list'. Otherwise, display the error. 
   //   */

   //    var listing = $scope.listings[index];
   //    Listings.delete(listing._id);
   //    location.reload();
   //  };
  }
]);