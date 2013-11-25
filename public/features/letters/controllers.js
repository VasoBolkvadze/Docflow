function LetterListController($scope,$rootScope){
	$scope.letters = $rootScope.letters;
}
function NewLetterController($scope){

}
function LetterDetailController($scope,$routeParams,$rootScope){
	$scope.letter = $rootScope.findLetterById($routeParams.letterId);
}