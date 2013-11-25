var app = angular.module('docflow-app',['ngRoute','ui.bootstrap']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'views/main',
		controller:'HomeController'
	})
	.when('/route1',{
		templateUrl:'features/main2.jade',
		controller:'Route1Controller'
	})
	.otherwise({
		redirectTo:'/'
	});
});

function HomeController($scope){
	$scope.msg = 'Hello Home Page';
	$scope.selected = undefined;
	$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
		'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
		'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
		'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
		'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
		'West Virginia', 'Wisconsin', 'Wyoming'];
}
function Route1Controller($scope){
	$scope.msg = 'Route1';
};