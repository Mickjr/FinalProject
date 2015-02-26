demo.controller('DetailCtrl', [
	"$scope",
	"$rootScope",
	"$firebase",
	"$routeParams",
	"$http",
	function ($scope, $rootScope, $firebase, $routeParams, $http){
		
		$http.get('http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%22'+$rootScope.dude.appendix.airports[0].postalCode+'%22&format=json')
		.then(function(response){
	    $scope.weather = response.data
	    console.log(response)
	    });

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