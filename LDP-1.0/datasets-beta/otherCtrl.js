/**
 * Created by akoleti on 8/3/16.
 */
app.controller('OtherCtrl',function($scope){

    $scope.$watch('searchString', function() {
        if($scope.searchString ==undefined){
            $scope.orSearch("*");
        }else{
            $scope.orSearch($scope.searchString);
        }

    });

    $scope.orSearch = function(search){
        $scope.viewData.orSearch = search;
        $scope.viewData.orSkip=0;
        $scope.viewData.loadOr();

    }

    $scope.prPagination = function(id){
        if(id >0){
            $scope.viewData.prSkip=(id-1)*5;
            $scope.viewData.loadOr();
        }
    }
});