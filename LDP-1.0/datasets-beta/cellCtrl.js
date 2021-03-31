/**
 * Created by akoleti on 6/28/16.
 */

app.controller('CellCtrl',function($scope){

    $scope.$watch('searchString', function() {
        if($scope.searchString ==undefined){
            $scope.clSearch("*");
        }else{
            $scope.clSearch($scope.searchString);
        }

    });

    $scope.clSearch = function(search){
        $scope.viewData.clSearch = search;
        $scope.viewData.clSkip=0;
        $scope.viewData.loadCell();
    }

    $scope.clPagination = function(id){
        if(id >0){
            $scope.viewData.clSkip=(id-1)*5;
            $scope.viewData.loadCell();
        }
    }
});