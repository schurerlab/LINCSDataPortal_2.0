/**
 * Created by akoleti on 6/28/16.
 */

app.controller('esCellCtrl',function($scope){

    $scope.$watch('searchString', function() {
        if($scope.searchString ==undefined){
            $scope.esclSearch("*");
        }else{
            $scope.esclSearch($scope.searchString);
        }

    });

    $scope.esclSearch = function(search){
        $scope.viewData.esclSearch = search;
        $scope.viewData.esclSkip=0;
        $scope.viewData.loadEscell();
    }

    $scope.esclPagination = function(id){
        if(id >0){
            $scope.viewData.esclSkip=(id-1)*5;
            $scope.viewData.loadEscell();
        }
    }
});