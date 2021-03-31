/**
 * Created by akoleti on 3/8/16.
 */




app.controller('DatasetListController', function ($scope, $window,$modal, DatasetService,$location,$http,$timeout) {

    $scope.actbtn="table";
    $scope.actviw="components/datasetSummayViews/tableview.html";
    $scope.keys =['datasetname','centername']
    $scope.order="datereleased desc";
    $scope.datasets = DatasetService;

    $scope.getSize = function(num) {
        return new Array(num);
    };

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

    $scope.change=function(type,search){
        $scope.datasets.doSearch(type,search);
    }
    $scope.orderDatasets=function(sort){
        $scope.datasets.doOrder(sort);
    }
    $scope.addToCart=function(id){
        $scope.datasets.addedDatasets(id);
    }


    $scope.showStatsModal = function (keys,values) {
        $scope.statskeys = keys;
        $scope.statsvalues = values;
        $scope.statssize=keys.length;

        $scope.getNumber = function(num) {
            return new Array(num);
        };
        $scope.statsModal = $modal({
            scope: $scope,
            template: 'templates/modal.stats.tpl.html',
            show: true
        })
    }
    
    if($location.search() != null && $scope.datasets.searchTerm.toString()==="*" ){
        var query = $location.search();
        // console.log(query);
        for (prop in query) {
            $scope.datasets.queryString.push(query[prop]);
            
        }

    }
    for( z=0;z<$scope.datasets.queryString.length;z++) {
        console.log($scope.datasets.queryString);
        if ($scope.datasets.queryString[z].split(':')[1] == undefined) {
            $scope.datasets.elements($scope.datasets.queryString[z].split(':')[0], '', $scope.datasets.selected, '_text_');
        } else {
            $scope.datasets.elements($scope.datasets.queryString[z].split(':')[1], '', $scope.datasets.selected, $scope.datasets.queryString[z].split(':')[0]);
        }

    }

});

