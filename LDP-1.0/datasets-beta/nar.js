/**
 * Created by akoleti on 6/28/16.
 */

app.controller('NarCtrl',function($scope){

    $scope.$watch('searchString', function() {
        if($scope.searchString ==undefined){
            $scope.narSearch("*");
        }else{
            $scope.narSearch($scope.searchString);
        }

    });

    $scope.narSearch = function(search){
        $scope.viewData.narSearch = search;
        $scope.viewData.narSkip=0;
        $scope.viewData.loadNar();
    }

    $scope.narPagination = function(id){
        if(id >0){
            $scope.viewData.narSkip=(id-1)*5;
            $scope.viewData.loadNar();
        }
    }
});