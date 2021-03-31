/**
 * Created by akoleti on 6/28/16.
 */
/**
 * Created by akoleti on 6/28/16.
 */
app.controller('SmallMoleculeCtrl',function($scope){

    $scope.$watch('searchString', function() {
        if($scope.searchString ==undefined){
            $scope.smSearch("*");
        }else{
            $scope.smSearch($scope.searchString);
        }

    });

    $scope.smSearch = function(search){
        $scope.viewData.smSearch = search;
        $scope.viewData.smSkip=0;
        $scope.viewData.loadSm();
        $scope.viewData.loadCA();

    }

    $scope.smPagination = function(id){
        if(id >0){
            $scope.viewData.smSkip=(id-1)*5;
            $scope.viewData.loadSm();
            $scope.viewData.loadCA();
        }
    }
});
