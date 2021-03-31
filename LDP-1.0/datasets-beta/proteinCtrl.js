/**
 * Created by akoleti on 6/28/16.
 */
app.controller('ProteinCtrl',function($scope){

    $scope.$watch('searchString', function() {
        if($scope.searchString ==undefined) {
            $scope.proteinSearch("*");
        }else{
            $scope.proteinSearch($scope.searchString);
        }

    });

    $scope.proteinSearch = function(search){
        $scope.viewData.prSearch = search;
        $scope.viewData.prSkip=0;
        $scope.viewData.loadProtein();
    }

    $scope.proteinPagination = function(id){
        if(id >0){
            $scope.viewData.prSkip=(id-1)*5;
            $scope.viewData.loadProtein();
        }
    }
});
