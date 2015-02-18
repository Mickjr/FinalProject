demo.controller('DetailCtrl', [
	"$scope",
	"$rootScope",
	"$firebase",
	"$routeParams",
	function ($scope, $rootScope, $firebase, $routeParams){
		
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