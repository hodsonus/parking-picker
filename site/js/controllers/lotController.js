const MAP_LAYER_NAME = 'parkinglots';

angular.module('lots').controller('LotsController', ['$scope', 'Lots',
  function ($scope, Lots) {
    /* Get all the lots, then bind it to the scope */
    console.log('in controller', $scope);
    Lots.getAll().then(function (response) {
      $scope.lots = response.data;
      // TODO race condition
      if (!map.loaded()) {
        setTimeout($scope.updateMapLayer.bind(this), 750);
      } else $scope.updateMapLayer();

      console.log('res', response);
    }, function (error) {
      console.log('Unable to retrieve lots:', error);
    });

    $scope.updateMapLayer = function () {
      var data = $scope.lots;
      console.log(data, 'UPDATING');
      if (map.getLayer(MAP_LAYER_NAME)) map.removeLayer(MAP_LAYER_NAME);

      map.addLayer({
        'id': MAP_LAYER_NAME,
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': data
        },
        'layout': {},
        'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.8
        }
      });
      console.log('map after update layer', map);

      map.on('click', MAP_LAYER_NAME, function (e) {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.name)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the states layer.
      map.on('mouseenter', MAP_LAYER_NAME, function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', MAP_LAYER_NAME, function () {
        map.getCanvas().style.cursor = '';
      });
    }
  }
]);
