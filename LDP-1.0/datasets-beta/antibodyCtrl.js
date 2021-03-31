/**
 * Created by akoleti on 6/8/17.
 */
app.controller('antibodyCtrl',function($scope){

    $scope.$watch('searchString', function() {
        if($scope.searchString ==undefined){
            $scope.abSearch("*");
        }else{
            $scope.abSearch($scope.searchString);
        }

    });

    $scope.abSearch = function(search){
        $scope.viewData.abSearch = search;
        $scope.viewData.abSkip=0;
        $scope.viewData.loadAt();
    }

    $scope.abPagination = function(id){
        if(id >0){
            $scope.viewData.abSkip=(id-1)*5;
            $scope.viewData.loadAt();
        }
    }
});