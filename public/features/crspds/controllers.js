function CrspdsListController($scope,$rootScope){
	//$scope.letters = $rootScope.letters;
}
function NewCrspdController($scope,$http){
	function toUniDateJSON(d){
		var yearStr = d.getFullYear().toString();
		var month = d.getMonth() + 1;
		var monthStr = month <= 9 ? ("0"+month) : month.toString();
		var day = d.getDate();
		var dayStr = day <= 9 ? ("0"+day) : day.toString();
		return yearStr + '-' + monthStr + '-' + dayStr + 'T00:00:00.0000000';
	}
	$scope.crspd = {};
	$scope.files = [];
	$scope.save = function(){
		if($scope.crspd.dateSent)
			$scope.crspd.dateSent = toUniDateJSON($scope.crspd.dateSent);
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
		}).success(function(){

			});
	};
}
function CrspdDetailController($scope,$routeParams,$rootScope){
	$scope.letter = $rootScope.findLetterById($routeParams.crspdId);
}