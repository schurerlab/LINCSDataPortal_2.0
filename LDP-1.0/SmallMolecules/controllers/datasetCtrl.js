/**
 * Created by akoleti on 3/8/16.
 */
app.controller('DatasetListController', function ($scope, $window,$modal, DatasetService,$location, Page) {


    Page.setTitle('Small Molecules Catalogue');
    Page.setKeywords('Small Molecules Catalogue LDP, LINCS Data Portal, Small Molecules lincs, bd2k, dcic, bd2k-lincs dcic, data coordination and integration center,biomedical, systems biology, drug discovery, Clinical Phase, perturbations, Pharmacological Classification, Mechanism of Action, Bioassay Type, diseases, drugs');

    $scope.actbtn="list";
    $scope.actviw="components/datasetSummayViews/listview.html";
    $scope.datasets = DatasetService;
    $scope.options={
    scales: {
        xAxes: [{barThickness:10,
            ticks: {
                beginAtZero:true,
                min: 0,
                max: 20
            }
        }],
            yAxes:[{barThickness:20}]
    } };
    $scope.options2={
        scales: {
            xAxes: [{barThickness:10
            }],
            yAxes:[{barThickness:20}]
        } };

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
    if($location.search().query != null ){
        var query = $location.search();
        // $scope.datasets.searchTerm = query.query;
        //
        $scope.datasets.elements(query.query, '', $scope.datasets.selected, 'text');
    }
    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

    
});