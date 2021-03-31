/**
 * Created by akoleti on 6/28/16.
 */
app.controller('GeneCtrl',function($scope){

    $scope.$watch('searchString', function() {
        if($scope.searchString ==undefined){
            $scope.geSearch("*");
        }else{
            $scope.geSearch($scope.searchString);
        }

    });

    $scope.geSearch = function(search){
        $scope.viewData.geSearch = search;
        $scope.viewData.geSkip=0;
        console.log("i am here");
        $scope.viewData.loadGe();
    }

    $scope.gePagination = function(id){
        if(id >0){
            $scope.viewData.geSkip=(id-1)*5;
            $scope.viewData.loadGe();
        }
    }
});
