/**
 * Created by akoleti on 2/25/16.
 */
app.controller("PagenationController", function($scope,DatasetService) {
    $scope.pagenationservice = DatasetService;
    $scope.maxSize = 10;
    $scope.pageOn =  $scope.pagenationservice.currentPage;

    $scope.currentpagenum = function(id){
        if(id >=0){
            $scope.pagenationservice.loadNext(id);
            $scope.pageOn =  $scope.pagenationservice.currentPage;
            // $scope.pagenationservice.gototop();
        }

    }
});
