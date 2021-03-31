/**
 * Created by akoleti on 3/8/16.
 */
app.controller('ViewCtrl',function($modal,$scope,$routeParams, $filter,$window,$timeout,$location,$http,
                                   $anchorScroll,$compile,ViewService,$interval,$resource,Dataset){
    $scope.did = $routeParams.id;
    var term = $routeParams.id;

    $scope.viewData= ViewService;
     downlaodGroups= Dataset;
    $scope.viewData.viewDatasetDetails(term);



    $scope.acttab ="description";
    $scope.tabs = function(id){
        if(id=='description'){
            $scope.acttab ="description";
                $scope.template="components/datasetLandingPages/description/description.html";

                 $scope.cell_provo = viewData.datasetinfo.cell_provenance_location[0].replace('/projects/ccs/bd2klincs/LINCS_Data/AdditionalData/DToxS/PrimaryCells/Fibroblast-STR-Tables/','') ;

                 $scope.clinical = viewData.datasetinfo.cell_provenance_location[0].replace('/projects/ccs/bd2klincs/LINCS_Data/AdditionalData/DToxS/PrimaryCells/Lincs_clinical_data/','') ;


        }else if(id=='datasets'){
            $scope.acttab ="datasets";
            $scope.template="components/datasetLandingPages/datasets/datasets.html";
        }
        
    }

    $scope.template = "components/datasetLandingPages/description/description.html";

    if($location.$$hash != ''){

        if($location.$$hash =='description'){
            $scope.acttab ="description";
            $scope.template="components/datasetLandingPages/description/description.html";
            $anchorScroll();
        }else if($location.$$hash =='datasets'){
            $scope.acttab ="datasets";
            $scope.template="components/datasetLandingPages/datasets/datasets.html";
            $anchorScroll();
        }
        else if($location.$$hash =='peturbagens'){
            $scope.acttab ="datasets";
            $scope.template="components/datasetLandingPages/datasets/datasets.html";
            $anchorScroll('peturbagens');
        }
    }

    if($location.$$hash == '') {
        $scope.template = "components/datasetLandingPages/description/description.html";
    }


    $timeout( function() {
        if ($scope.viewData.datasetinfo != null) {
            $scope.cell_provo = $scope.viewData.datasetinfo.cell_provenance_location[0].replace('/projects/ccs/bd2klincs/LINCS_Data/AdditionalData/DToxS/PrimaryCells/Fibroblast-STR-Tables/', '');

            console.log($scope.cell_provo);
            $scope.clinical = $scope.viewData.datasetinfo.clinical_data_location[0].replace('/projects/ccs/bd2klincs/LINCS_Data/AdditionalData/DToxS/PrimaryCells/Lincs_clinical_data/', '');

            console.log($scope.clinical);
        }
    }, 100 );

    // console.log($scope.)

});