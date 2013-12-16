app.directive('appFilereader', function(){
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, element, attrs, ngModel){
			var slice = Array.prototype.slice;
			if(!ngModel) return;
			ngModel.$render = function(){};
			element.bind('change', function(e){
				var element = e.target;
				var a = slice.call(element.files, 0);
				ngModel.$setViewValue(a);
			});
		}
	};
});