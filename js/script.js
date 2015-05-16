var myApp= angular.module("mainApp", ['ngRoute','simplePagination']);

myApp.config(["$routeProvider" , function($routeProvider){
	$routeProvider
	.when('/allbooks', {
		templateUrl: 'views/allbooks.html',
		controller: 'mainController'
	})
	.when('/videos', {
		templateUrl: 'views/videos.html'
	})
	.when('/learnings', {
		templateUrl: 'views/learnings.html'
	})
	.when('/explore', {
		templateUrl: 'views/explore.html',
		controller: 'searchController'
	})
	.otherwise({redirectTo: 'index.html'})
}]);

myApp.controller("mainController", function($scope, $http){

	var promise=$http.get("model/booksData.json");
	promise.then( function (response){
		$scope.books=response.data;
	},function (error){
		console.log(error);
	});
});

myApp.controller("searchController", function($scope,$http,$log,Pagination){
	
	
	$scope.limit=["all","5","10","15"];
	$scope.selectedSize =10;
	$scope.$watch('selectedSize',function(newValue,oldValue){
		if(newValue!=oldValue){
			$scope.pagination.perPage= $scope.selectedSize;
			$scope.pagination.numPages = Math.ceil($scope.books.length/$scope.pagination.perPage);
			if(newValue === "all") {
				$scope.selectedSize = $scope.books.length;
				$scope.pagination.perPage= $scope.selectedSize;
				$scope.pagination.numPages = Math.ceil($scope.books.length/$scope.pagination.perPage);
			}
		}
	});

	
	$scope.seltype=["all","title","genre","donated by"];
	$scope.selectedItem= "all";
	$scope.search = function(item){
		if($scope.selectedItem === "all"){
			if(item.title.indexOf($scope.searchBy || "")!=-1 || item.genre.indexOf($scope.searchBy || "")!=-1 || item.Contributor.indexOf($scope.searchBy || "")!=-1){
				return true;
			}
			return false;
		}
		if($scope.selectedItem === "title"){
			if(item.title.indexOf($scope.searchBy || "")!=-1){
				return true;
			}
			return false;
		}
		if($scope.selectedItem === "genre"){
			if(item.genre.indexOf($scope.searchBy || "")!=-1){
				return true;
			}
			return false;
		}
		if($scope.selectedItem === "donated by"){
			if(item.Contributor.indexOf($scope.searchBy || "")!=-1){
				return true;
			}
			return false;
		}
	}

	$scope.pagination = Pagination.getNew();
	$scope.pagination.perPage= $scope.selectedSize;
	$scope.pagination.numPages = Math.ceil($scope.books.length/$scope.pagination.perPage);
	console.log($scope.pagination.numPages);
});


