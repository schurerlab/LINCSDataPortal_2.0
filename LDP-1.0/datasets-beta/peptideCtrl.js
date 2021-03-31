/**
 * Created by akoleti on 6/28/16.
 */
app.controller('PpCtrl',function($scope){


    $scope.$watch('searchString', function() {
        if($scope.searchString ==undefined){
            $scope.ppSearch("*");
        }else{
            $scope.ppSearch($scope.searchString);
        }

    });


    $scope.ppSearch = function(search){
        $scope.viewData.ppSearch = search;
        $scope.viewData.ppSkip=0;
        $scope.viewData.loadPp();
    }

    $scope.ppPagination = function(id){
        if(id >0){
            $scope.viewData.ppSkip=(id-1)*5;
            $scope.viewData.loadPp();
        }
    }
});