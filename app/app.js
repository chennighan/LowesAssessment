/*
  Author: Chennighan
  Description: Our main app file where we declare our modules and components we'll be using as well as most of the global config.
*/

'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'myApp.product',
  'myApp.version'
]);

myApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/products'});
}]);
