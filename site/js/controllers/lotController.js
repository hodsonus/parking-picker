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

function filterLots (lots, decals) {
  return lots.filter(function (lot) {
    var restriction = lot.properties.decalRestriction;
    if (decals.length === 0) return true;

    var d = decals.reduce(function (acc, curr) {
      return acc + !!decalMap.getParkingOptions(curr).includes(restriction);
    }, 0)
    return d;
  });
}

var LOTS_LAYER_NAME = 'parkinglots';
var BLDG_LAYER_NAME = 'buildings';
angular.module('lots').controller('LotsController', ['$scope', 'Lots', 'filterFilter',
  function ($scope, Lots, filterFilter) {
    $scope.loaded = false;
    var map = window.map;

    $scope.popupInfo = {};
    var date = new Date(Date.now());
    var year = date.getFullYear().toString().slice(2, 4), //grab the last 2 digits of the year
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        morning = hour < 12 ? "am" : "pm";
    var datestring = month + "/" + day + "/" + year + " " + hourFormatted + ":" +
            minuteFormatted + morning;
    $scope.date = datestring;

    /* Get all the lots, then bind it to the scope */
    map.on('load', function () {
      Lots.getAll().then(function (response) {
        $scope.loaded = true;
        $scope.lots = response.data;
        map.addSource('dblots', {
          type: 'geojson',
          data: (function () {
            var data = {};
            Object.assign(data, $scope.lots);
            data.features = filterLots(data.features, $scope.selection);
            return data;
          })()
        })
        map.addLayer({
          'id': LOTS_LAYER_NAME,
          'type': 'fill',
          'source': 'dblots',
          'layout': {},
          'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
          }
        });

        map.on('click', LOTS_LAYER_NAME, function (e) {

          //bind info to the scope
          map.queryRenderedFeatures(e.point).forEach(function(entry) {
            if (entry.layer.source == "dblots") {
              $scope.popupInfo.properties = entry.properties;

              // var fullnessHistory = $scope.popupInfo.properties.history;
              // var avg;
              // if (fullnessHistory.length == 0) {
              //   avg = 0;
              // }
              // else {
              //   var sum = 0;
              //   var i;
              //   for (i = 0; i < fullnessHistory.length; i++) {
              //     sum += fullnessHistory[i];
              //   }
              //   avg = sum/fullnessHistory.length;
              // }
              // $scope.popupInfo.properties.fullnessAverage = avg;
            }
          });

          //update bindings
          $scope.$apply();

          //toggle the popup
          $('.modal').toggleClass('is-visible');
        });

        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());
        console.log(lotArray);

        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', LOTS_LAYER_NAME, function () {
          map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', LOTS_LAYER_NAME, function () {
          map.getCanvas().style.cursor = '';
        });
      }).catch(function (error) {
        console.log('Unable to retrieve lots:', error);
      }).then(function () {
        map.addLayer({
          'id': BLDG_LAYER_NAME,
          'type': 'symbol',
          'source': {
            type: 'geojson',
            data: '/api/buildings',
          },
          'layout': {
            'text-field': '{MAP_NAME}',
            'text-offset': [0, 0.6],
            'text-anchor': 'top'
          },
        });
      });
    })

    $scope.selection = JSON.parse(window.localStorage.getItem('pp-decals')) || [];
    $scope.decalRestrictions = decalMap.getDecals().map(function (decal) {
      return {
        decal,
        selected: $scope.selection.includes(decal),
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
      data.features = filterLots(data.features, $scope.selection);
      map.getSource('dblots').setData(data);
    }

    $scope.save = function () {
      $scope.updateMapLayer();
      window.localStorage.setItem('pp-decals', JSON.stringify($scope.selection));
    }

    $scope.submitFullness = function() {
        // grab the slider from the html
        var slider = document.getElementById("myRange");

        // grab the fullness from the slider
        var currFullness = slider.value;
        var id = $scope.popupInfo.properties.officialId;

        // post to the API
        Lots.postFullness(currFullness, id).then(function successCallback() {
          console.log("Lot fullness posted successfully.");
          location.reload();
        }, function errorCallback() {
          console.log("An error occurred when posting the lot fullness.");
        });
    };

  }
  ]);
