/*
  Author: Chennighan
  Description: Product Controller where we retrieve our data and do our manipulation so that
               the template can display everything it needs to.
*/

'use strict';

angular.module('myApp.product', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/products', {
    templateUrl: 'product/productList.html',
    controller: 'ProductCtrl'
  });
}])

.controller('ProductCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
  // we can detect mobile by doing the following
  var mobileWidth = 1000;

  $scope.isMobile = function() {
    $scope.mobile = false;
    if(document.body.clientWidth <= mobileWidth){
        $scope.mobile = true;
        $scope.bulletLimiter = 2;
    } else {
        $scope.bulletLimiter = 3;
    }
  };

  // will update our mobile check so we can modify the number of bullets to show
  angular.element($window).bind('load resize', function(){
    $scope.$apply(function() {
        $scope.isMobile();
    });
  });

  // since I don't have access to the server to change CORS settings or implement JSONP, I just ran the request through a proxy ¯\_(ツ)_/¯
  $http({ method : 'GET', url : 'https://crossorigin.me/http://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=6&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1'})
     .success(function(data, status) {
         $scope.items = data.productList;
         // set the initial spotlight product
         $scope.spotlightProduct = data.productList[0];
      })
     .error(function(data, status) {
         console.log('there was an error with the request', status);
     });

   // used to update the spotlight product with a given product
   $scope.updateSpotlight = function(product) {
     $scope.spotlightProduct = product;
   }

   // alert the user to the price of the product in the spotlight
   $scope.alertPrice = function() {
     alert("The price of the item you wish to add to your cart is: " + $scope.spotlightProduct.pricing.price.retail);
   }

   // if you don't fire this it will have to wait until you actually resize
   $scope.isMobile();
}]);
