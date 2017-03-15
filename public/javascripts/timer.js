/**
 * Created by arifen on 3/15/17.
 */
var app = angular.module('timer',['ngResource', 'ngRoute']);
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
        })
        .when('/add-time', {
            templateUrl: 'partials/timeinsert.html',
            controller: 'AddtimeCtrl'
        })
        .when('/show-time', {
            templateUrl: 'partials/showtimelist.html',
            controller: 'ShowTimeCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
app.controller('ShowTimeCtrl', ['$scope', '$resource','$location',
    function($scope, $resource,$location){
        var Timeevents = $resource('/api/timers');
        Timeevents.query(function(timeevents){
            $scope.timeevents = timeevents;
            for(var i=0;i<$scope.timeevents.length;i++){
                console.log('event ',$scope.timeevents[i].event);
                if($scope.timeevents[i].event === 's'){
                    $scope.timeevents[i].event = 'Start';
                }else if ($scope.timeevents[i].event === 'e'){
                    $scope.timeevents[i].event = 'End';
                }
            }
        });

        $scope.delete = function(id){
            var Timeevents = $resource('/api/timers/'+id);
            Timeevents.delete({ id:id }, function(timeevent){
                console.log('success delete');
                $location.path('/');
            });
        }
    }]);

app.controller('AddtimeCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.statevent = function(){
            var Timeevents = $resource('/api/timers');
            var timeevent = {};
            timeevent['event'] = 's';
            Timeevents.save(timeevent, function(){
                $location.path('/');
            });
        };
        $scope.endevent = function(){
            var Timeevents = $resource('/api/timers');
            var timeevent = {};
            timeevent['event'] = 'e';
            Timeevents.save(timeevent, function(){
                $location.path('/');
            });
        };
    }]);
