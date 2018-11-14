/* register the modules the application depends upon here*/
angular.module('lots', ['Lots, LotsController']);
console.log(angular, 'registered');
/* register the application and inject all the necessary dependencies */
var app = angular.module('parkingpicker', ['lots']);
