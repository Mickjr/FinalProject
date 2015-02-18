var demo = angular.module('demo', ['ngRoute','firebase', 'ui.bootstrap']);

demo.config([
"$routeProvider",
function ($routeProvider){
	
	$routeProvider
		
		.when("/", {
		templateUrl: 'views/home.html',
		controller: 'HomeCtrl'
	})
		.when('/detail/:flightId', {
		templateUrl: 'views/detail.html',
		controller: 'DetailCtrl'
	})
		.when('/search', {
		templateUrl: 'views/search.html',
		controller: 'SearchCtrl'
	})
}]);

demo.run(["$firebaseSimpleLogin", "$rootScope", 
	function ($firebaseSimpleLogin, $rootScope){
		var loginRef = new Firebase("https://glowing-heat-2588.firebaseio.com/");

		$rootScope.loginObj = $firebaseSimpleLogin(loginRef);

		$rootScope.$on("$firebaseSimpleLogin:login", 
			function(e,user){
				console.log("this is the user object: ", user);
			});

		//console.log("Your Stuff: ", $rootScope.loginObj.user.thirdPartyUserData);

	}]);


