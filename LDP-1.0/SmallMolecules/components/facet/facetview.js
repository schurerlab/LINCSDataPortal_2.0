/**
 * Created by akoleti on 2/23/16.
 */
app.controller('FacetController', function ($scope,$location, $window, DatasetService){
    $scope.show = false;
    $scope.showless=false;
    $scope.moreshow = true;
    $scope.showcount=2;

    $scope.facetService = DatasetService;
    $scope.toggle = function () {

        if (this.show === false) {
            $scope.show = true;
        } else {
            $scope.show = false;
        }

    }
    $scope.datasetfetcher = function (item, text, list, tk) {
        $scope.facetService.elements(item, text, list, tk);
    };

    $scope.findvalue = function(item, list){
        $scope.facetService.exists(item, list);
    }

    $scope.sideopen = function(temp){
        $scope.facetService.loadmoretrue.push(temp);
    }
    $scope.sideclose = function(temp){
        var idx = $scope.facetService.loadmoretrue.indexOf(temp);
        if (idx > -1) {
            $scope.facetService.loadmoretrue.splice(idx, 1);
        }

    }

    $scope.toggleswitch = function(){
        if ( $scope.facetService.switch === "OR") {

            $scope.facetService.switch = "AND";
        } else {
            $scope.facetService.switch = "OR";
        }
    }


    $scope.changeStatus = function(){
        $scope.status = !$scope.status;
    }



});
