/**
 * Created by akoleti on 3/8/16.
 */
app.controller('DatasetListController', function ($scope, $window,$modal, DatasetService,$location) {

    $scope.actbtn="list";
    $scope.actviw="components/datasetSummayViews/listview.html";
    $scope.datasets = DatasetService;

    $scope.viewdata= function(type){
        $scope.actbtn=type;
        if(type=='table'){
            $scope.actbtn="table";
            $scope.actviw="components/datasetSummayViews/tableview.html";
        }else if(type=='tile'){
            $scope.actbtn="tile";
            $scope.actviw="components/datasetSummayViews/tileview.html";
        }else if(type=='list'){
            $scope.actbtn="list";
            $scope.actviw="components/datasetSummayViews/listview.html";
        }
    }
    if($location.search().query != undefined ){
        var query = $location.search();
        for (prop in query) {
            $scope.datasets.queryString.push(query[prop]);
        }
        // $scope.datasets.elements(query.query, '', $scope.datasets.selected, 'text');
    }
    // if($location.search() != null && $scope.datasets.searchTerm.toString()==="*" ){
    //     var query = $location.search();
    //     for (prop in query) {
    //         $scope.datasets.queryString.push(query[prop]);
    //
    //     }
    //
    // }
    for( z=0;z<$scope.datasets.queryString.length;z++) {
        console.log($scope.datasets.queryString);
        if ($scope.datasets.queryString[z].split(':')[1] == undefined) {
            $scope.datasets.elements($scope.datasets.queryString[z].split(':')[0], '', $scope.datasets.selected, '_text_');
        } else {
            $scope.datasets.elements($scope.datasets.queryString[z].split(':')[1], '', $scope.datasets.selected, $scope.datasets.queryString[z].split(':')[0]);
        }

    }

});