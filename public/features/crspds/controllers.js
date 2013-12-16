function CrspdsListController($scope,$rootScope){
	//$scope.letters = $rootScope.letters;
}
function NewCrspdController($scope,$http){
	$scope.crspd = {};
	$scope.files = [];
	$scope.save = function(){
		$http({
			method:'POST',
			url:'/api/crspds/save',
			headers: {'Content-Type':undefined },
			transformRequest: function (data) {
				var formData = new FormData();
				formData.append("model", angular.toJson(data.model));
				formData.append("fileCount",data.files.length);
				for (var i = 0; i < data.files.length; i++) {
					formData.append("file" + i, data.files[i]);
				}
				return formData;
			},
			data: { model: $scope.crspd, files: $scope.files }
		});
	};
}
function CrspdDetailController($scope,$routeParams,$rootScope){
	$scope.letter = $rootScope.findLetterById($routeParams.crspdId);
}