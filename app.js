var app = angular.module('diocane',['impressjs']);

app.controller('mainCtrl',['$scope',function($scope){
	function init(){
		var data=[];
		var cont = 0;
		$scope.path=[];
		for (var i = 1; i<=5;i++){
			var obj={};
			obj.title = "Slide "  + i;
			obj.img="https://lh6.googleusercontent.com/-TlY7amsfzPs/T9ZgLXXK1cI/AAAAAAABK-c/Ki-inmeYNKk/w749-h794/AngularJS-Shield-large.png";
			obj.content="One hot angel \n One cool devil \n Your mind on the fantasy \n Livin on the ecstasy \n Give it all, give it, \n Give it what you got \n Come on give it all a lot \n Pick it up move it \n Give it to the spot \n Your mind on a fantasy \n Livin on ecstasy";
			obj.x = 1000;
			obj.y = 1000 + 1000*i;
			obj.z = 0;
			obj.rotate = 0 + (90*((i-1)%4));
			obj.id = "slide"+i;

			data.push(obj);
			$scope.path.push(obj);
		}

		$scope.offPathSlides = [];
		var obj={};
			obj.title = "Slide "  + i;
			obj.img="https://lh6.googleusercontent.com/-TlY7amsfzPs/T9ZgLXXK1cI/AAAAAAABK-c/Ki-inmeYNKk/w749-h794/AngularJS-Shield-large.png";
			obj.content="Sono off path";
			obj.x = 1000;
			obj.y = 1000 + 1000*i;
			obj.z = 0;
			obj.rotate = 0 + (90*((i-1)%4));
			obj.id = "slide"+i;
		$scope.offPathSlides.push(obj);

		data.push(obj);
		$scope.slides=data;
	}

	$scope.jump = function(slide){
		$scope.$broadcast('goToId',slide);
	};



	init();

	$scope.initImpress = function(){
		$scope.$broadcast('initImpress');
	}

}]);


app.directive('premiSlides', function(){
	return {
		restrict: 'E',
		templateUrl: 'template/slides.html'
	};
});

app.directive('premiMenu',function(){
		return {
		restrict: 'E',
		templateUrl: 'template/menu.html'
	};
});

