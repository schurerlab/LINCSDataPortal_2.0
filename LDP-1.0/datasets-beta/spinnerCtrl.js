/**
 * Created by akoleti on 3/8/16.
 */
app.controller('spinnerCtrl',function($scope,$timeout){
    //$scope.epMessage="it takes few seconds to update the chart";
    $scope.spinner = true;

    $timeout(function() {
        $scope.spinner = false;
    },1000);

});