/* register the modules the application depends upon here */
angular.module('lots', ['Lots, LotsController']);
/* register the application and inject all the necessary dependencies */
var app = angular.module('parkingpicker', ['lots']);
