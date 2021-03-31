/**
 * Created by akoleti on 6/28/16.
 */

app.controller('unCtrl',function($scope){

    $scope.$watch('searchString', function() {
        if($scope.searchString ==undefined){
            $scope.unSearch("*");
        }else{
            $scope.unSearch($scope.searchString);
        }

    });

    $scope.unSearch = function(search){
        $scope.viewData.unSearch = search;
        $scope.viewData.unSkip=0;
        $scope.viewData.loadUnp();
    }

    $scope.unPagination = function(id){
        if(id >0){
            $scope.viewData.unSkip=(id-1)*5;
            $scope.viewData.loadUnp();
        }
    }
});