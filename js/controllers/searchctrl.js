demo.controller('SearchCtrl', [
	"$scope",
	"$firebase",
	"$routeParams",
	function ($scope, $firebase, $routeParams){
		
	var postsRef = new Firebase('https://glowing-heat-2588.firebaseio.com/posts'+$routeParams.postId);
	
	$scope.posts = $firebase(postsRef).$asObject();

    
	}// ENDS SearchCtrl
]);