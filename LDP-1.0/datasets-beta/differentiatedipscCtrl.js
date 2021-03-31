/**
 * Created by akoleti on 6/28/16.
 */

app.controller('DcCtrl',function($scope){

    $scope.$watch('searchString', function() {
        if($scope.searchString ==undefined){
            $scope.dcSearch("*");
        }else{
            $scope.dcSearch($scope.searchString);
        }

    });

    $scope.dcSearch = function(search){
        $scope.viewData.dcSearch = search;
        $scope.viewData.dcSkip=0;
        $scope.viewData.loadDc();
    }

    $scope.dcPagination = function(id){
        if(id >0){
            $scope.viewData.dcSkip=(id-1)*5;
            $scope.viewData.loadDc();
        }
    }
});