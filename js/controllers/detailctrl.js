demo.controller('DetailCtrl', [
	"$scope",
	"$rootScope",
	"$firebase",
	"$routeParams",
	"$http",
	function ($scope, $rootScope, $firebase, $routeParams, $http){
		
		$http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+$rootScope.dude.appendix.airports[0].city+'%2C%20'+$rootScope.dude.appendix.airports[0].stateCode+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
		.then(function(response){
	    $scope.weather = response.data
	    console.log(response)
	    });

	    $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+$rootScope.dude.appendix.airports[1].city+'%2C%20'+$rootScope.dude.appendix.airports[1].stateCode+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
		.then(function(response){
	    $scope.weather2 = response.data
	    console.log(response)
	    });

		// $http.get('https://www.eventbrite.com/json/event_search?app_key=JUYT3UGQP4K235L3WV&city='+$rootScope.dude.appendix.airports[1].city+'&region='+$rootScope.dude.appendix.airports[2].stateCode+'&country='+$rootScope.dude.appendix.airports[2].countryCode+'&date_created=This%20Week')
		// .then(function(response){
	 //    $scope.city = response.data
	 //    console.log(response)
	 //    });

		var flightRef = new Firebase('https://glowing-heat-2588.firebaseio.com/flights/'+$routeParams.flightId);
		$scope.flight = $firebase(flightRef).$asArray();
		var url = 'https://glowing-heat-2588.firebaseio.com/flights/'+$routeParams.flightId+'/comments/';
		var commentRef = new Firebase(url);
		$scope.comments = $firebase(commentRef).$asArray();

		$scope.createComment = function(){
			$scope.newComment.user = $rootScope.loginObj.user.thirdPartyUserData.name;
			$scope.newComment.userId = $rootScope.loginObj.user.thirdPartyUserData.id;
			$scope.comments.$add($scope.newComment).then(function()
				{$scope.newComment = {};
			});
			console.info('New Comment Added!');
		}

		$scope.deleteComment = function(commentId){
			var commentRef = new Firebase(url+'/'+commentId);
			commentRef.remove();
		}

		$scope.SearchTwitter = {
			lat : $rootScope.dude.appendix.airports[0].latitude,
            lon :  $rootScope.dude.appendix.airports[0].longitude,
            miles : "10m"
		}

		console.log("TWITTER ", $scope.SearchTwitter);
	} 
]);