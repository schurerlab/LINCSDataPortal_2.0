/**
 * Created by akoleti on 6/28/16.
 */
app.controller('IpscCtrl',function($scope){

    $scope.$watch('searchString', function() {
        if($scope.searchString ==undefined){
            $scope.ipSearch("*");
        }else{
            $scope.ipSearch($scope.searchString);
        }

    });

    $scope.ipSearch = function(search){
        $scope.viewData.ipSearch = search;
        $scope.viewData.ipSkip=0;
        $scope.viewData.loadiPSC();
    }

    $scope.ipPagination = function(id){
        if(id >0){
            $scope.viewData.ipSkip=(id-1)*5;
            $scope.viewData.loadiPSC();
        }
    }
});