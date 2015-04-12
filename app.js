/**
 * Created by gmanzoli on 09/04/15.
 */
var app = angular.module("app",['ngRoute']);

//Factory per la barra di navigazione
app.factory('navigationFactory',function(){
    var names = ["Projects", "Paths"];
    var paths = ["view1","view2"];

    var getPath = function(p){
        var i = names.indexOf(p);
        return paths[i];
    };
    return {
        tabs: names,
        getPath: getPath
    };
});


//Factory per la gestione dei progetti
app.factory('projectFactory',['$rootScope', function($rootScope){

    var factory={};

    $rootScope.projects = ["progetto1","progetto2"];
    $rootScope.currentProjectId = -1;


    factory.getProject = function(i){
        return $rootScope.projects[i];
    };

    factory.updateProject = function(i,p){
        $rootScope.projects[i] = p;
    };

    factory.getCurrentProject = function(){
        console.log("Current project id "+$rootScope.currentProjectId);
        return $rootScope.projects[$rootScope.currentProjectId];
    };

    factory.setCurrentProject = function(i){
        $rootScope.currentProjectId = i;
        console.log("Current changed");
    };
    return factory;
}]);

//Factory per la gestione dei path
app.factory('pathFactory',['$rootScope','projectFactory',function($rootScope,pFactory){
    var factory={};


    /*
    * Simula il metodo che chiede al server i percorsi per un determinato progetto
    * */
    factory.getPathsFromServer = function(p){

        var paths = [];
        paths["progetto1"] = ["Pippo","Pluto","Paperino"];
        paths["progetto2"] = ["Qui","Quo","Qua"];

        return paths[p];
    };

    factory.getPaths = function(){
        var current = pFactory.getCurrentProject();
        $rootScope.paths = this.getPathsFromServer(current); //Li scarica e li salva nel model

        return $rootScope.paths; //Ritorna un riferimento

    };

    return factory;
}]);


/*
* The $routeParams service allows you to retrieve the current set of route parameters.
* The $location service allows you to retrive information about the current path. You can also
* redirect to another path via $location.path('path/to/redirect')
*
* */

app.controller('Rosso1',['$scope','$routeParams','$location','navigationFactory','projectFactory',function($scope,$routeParams,$location,navFactory,pFactory){

    //Navigazione
    $scope.tabs = navFactory.tabs;
    $scope.selected = function(t){
        var path = navFactory.getPath(t);
        $location.path('/'+path);
    };

    //Project Data

    pFactory.setCurrentProject(0); //Apro un progetto.

    $scope.currentProject = pFactory.getCurrentProject(); //Recupero il riferimento al progetto corrente

    $scope.change = function(){
        pFactory.setCurrentProject(1);
        $scope.currentProject = pFactory.getCurrentProject();
    }

}]);

app.controller('Rosso2',['$scope','$routeParams','$location','navigationFactory','pathFactory',function($scope,$routeParams,$location,navFactory,pathFactory){

    //Navigazione
    $scope.tabs = navFactory.tabs;
    $scope.selected = function(t){
        var path = navFactory.getPath(t);
        $location.path('/'+path);
    };

    //Path list
    $scope.pathList = pathFactory.getPaths(); //Non c'è bisogno di specificare l'id del progetto


}]);


app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.
        when('/view1/', {
            templateUrl: 'view1.html',
            controller: 'Rosso1'
        }).
        when('/view2', {
            templateUrl: 'view2.html',
            controller: 'Rosso2'
        }).
        otherwise({
            redirectTo: '/view1'
        });
}]);