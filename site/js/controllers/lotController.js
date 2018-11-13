const decalMap = {
  decalTypes: {
    'Green': ['Green', 'Any Decal'],
    'Park & Ride': ['Any Decal'],
    'Red 1': ['Red 1', 'All Red', 'Any Decal'],
    'Red 3': ['All Red', 'Any Decal'],
    'Brown 2': ['Brown 2', 'Any Decal'],
    'Brown 3': ['Brown 3', 'Any Decal'],
    'Disabled Student': ['Disabled', 'Orange', 'Blue', 'Commuter', 'Red 1', 'All Red', 'Brown 2', 'Brown 3', 'Any Decal'],

    'Gold': ['Gated', 'Orange', 'Blue', 'Green', 'Red 1', 'All Red', 'Brown', 'Any Decal'],
    'Silver': ['Gated'],
    'Official Business': ['Orange', 'Blue', 'Green', 'Red 1', 'All Red', 'Brown', 'Any Decal'],
    'Orange': ['Orange', 'Green', 'Any Decal'],
    'Blue': ['Blue', 'Green', 'Any Decal'],
    'Medical Resident': ['Orange', 'Green', 'Red 1', 'All Red', 'Brown', 'Any Decal', 'Med Res'],
    'Shands South 1': ['Yellow'],
    'HVN Shands South 2': ['Yellow'],
    'Staff Commuter': ['Green', 'Any Decal'],

    'Motorcycle / Scooter': ['Motorcycle / Scooter']
  },

  // Returns an array populated with the names of available decals
  getDecals: function () { return Object.keys(this.decalTypes) },

  // Given a valid decal name, returns an array with the parking options you have available
  getParkingOptions: function (decal) { return this.decalTypes[decal] }
}

angular.module('lots').controller('LotsController', ['$scope', 'Lots', 'filterFilter',
  function ($scope, Lots, filterFilter) {
    /* Get all the lots, then bind it to the scope */
    console.log('in controller', $scope);

    $scope.loaded = false;
    Lots.getAll().then(function (response) {
      $scope.lots = response.data;
    }, function (error) {
      console.log('Unable to retrieve lots:', error);
    });
    $scope.selection = [];
    $scope.decalRestrictions = decalMap.getDecals().map(function (decal) {
      return {
        decal,
        selected: false,
      }
    })

    $scope.selectedDecals = function selectedDecals () {
      return filterFilter($scope.decalRestrictions, { selected: true });
    };

    $scope.$watch('decalRestrictions|filter:{selected:true}', function (nv) {
      $scope.selection = nv.map(function (decal) {
        return decal.decal;
      });
      console.log($scope.selection);
    }, true);

    $scope.updateMapLayer = function () {
      console.log('databefore', $scope.lots);
      var data = {};
      Object.assign(data, $scope.lots);
      data.features = data.features.filter(function (lot) {
        var restriction = lot.properties.decalRestriction;
        if ($scope.selection.length === 0) return true;


        var d = $scope.selection.reduce(function (acc, curr) {
          // console.log(decalMap.getParkingOptions(curr).includes(restriction));
          // console.log('acc', acc);
          // console.log('restr', restriction, 'curr', curr);
          return acc + !!decalMap.getParkingOptions(curr).includes(restriction);
        }, 0)
        return d;
      });
      console.log('data', data, 'lots', $scope.lots);
      map.getSource('dblots').setData(data);
      // if (map.getLayer(MAP_LAYER_NAME)) map.removeLayer(MAP_LAYER_NAME);

      // map.addLayer({
      //   'id': MAP_LAYER_NAME,
      //   'type': 'fill',
      //   'source': {
      //     'type': 'geojson',
      //     'data': data
      //   },
      //   'layout': {},
      //   'paint': {
      //     'fill-color': '#088',
      //     'fill-opacity': 0.8
      //   }
      // });
      $scope.loaded = true;


    }
  }
]);
