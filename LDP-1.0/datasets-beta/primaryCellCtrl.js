/**
 * Created by akoleti on 6/28/16.
 */
app.controller('PcCtrl',function($scope){

    $scope.$watch('searchString', function() {
        if($scope.searchString ==undefined){
            $scope.pcSearch("*");
        }else{
            $scope.pcSearch($scope.searchString);
        }

    });

    $scope.pcSearch = function(search){
        $scope.viewData.pcSearch = search;
        $scope.viewData.pcSkip=0;
        $scope.viewData.loadPc();
    }

    $scope.pcPagination = function(id){
        if(id >0){
            $scope.viewData.pcSkip=(id-1)*5;
            $scope.viewData.loadPc();
        }
    }
});
