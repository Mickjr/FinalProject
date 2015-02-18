var demo = angular.module('demo', ['ngRoute','firebase']);

demo.config([
"$routeProvider",
function ($routeProvider){
	
	$routeProvider
		
		.when("/", {
		templateUrl: 'views/home.html',
		controller: 'HomeCtrl'
	})
		.when('/detail/:postId', {
		templateUrl: 'views/detail.html',
		controller: 'DetailCtrl'
	})
		.when('/search', {
		templateUrl: 'views/search.html',
		controller: 'SearchCtrl'
	})
}]);

