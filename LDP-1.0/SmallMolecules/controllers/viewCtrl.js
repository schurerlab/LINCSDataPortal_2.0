/**
 * Created by akoleti on 3/8/16.
 */
app.controller('ViewCtrl',function($modal,$scope,$routeParams, $filter,$window,$timeout,$location,$http,
                                   $anchorScroll,$compile,ViewService,$interval,$resource,Dataset,StructurePost,DatasetService, Page){
    $scope.did = $routeParams.id;
    var term = $routeParams.id;

    $scope.viewData= ViewService;
    $scope.str= DatasetService;
     downlaodGroups= Dataset;
    $scope.viewData.viewDatasetDetails(term);

    $scope.acttab ="description";
    $scope.tabs = function(id){
        if(id=='description'){
            $scope.acttab ="description";
            $scope.template="components/datasetLandingPages/description/description.html";

        }else if(id=='datasets'){
            $scope.acttab ="datasets";
            $scope.template="components/datasetLandingPages/datasets/datasets.html";
        }else if(id=='curated'){
            $scope.acttab ="curated";
            $scope.template="components/datasetLandingPages/curated/curated.html";
        }

    }

    if($location.$$hash != ''){

        if($location.$$hash =='description'){
            $scope.acttab ="description";
            $scope.template="components/datasetLandingPages/description/description.html";
            $anchorScroll();
        }else if($location.$$hash =='datasets'){
            $scope.acttab ="datasets";
            $scope.template="components/datasetLandingPages/datasets/datasets.html";
            $anchorScroll();
        }else if($location.$$hash =='curated'){
            $scope.acttab ="curated";
            $scope.template="components/datasetLandingPages/curated/curated.html";
            $anchorScroll();
        }
        else if($location.$$hash =='cells'){
            $scope.acttab ="datasets";
            $scope.template="components/datasetLandingPages/datasets/datasets.html";
            $anchorScroll('cells');
        } else if($location.$$hash =='moa'){
            $scope.acttab ="curated";
            $scope.template="components/datasetLandingPages/curated/curated.html";
            $anchorScroll('moa');
        }



    }

    $timeout(function() {
    Page.setTitle(  $scope.viewData.datasetinfo.SM_Name.toString() +'  (' +  $scope.viewData.datasetinfo.lincsidentifier.toString()+')');

    Page.setKeywords($scope.viewData.datasetinfo.SM_Name.toString()+ '  (' +  $scope.viewData.datasetinfo.lincsidentifier.toString()+') ' +' '  + $scope.viewData.datasetinfo.source  + ' '+ $scope.viewData.datasetinfo.area  + ' ' + $scope.viewData.datasetinfo.Target  + ' ' + $scope.viewData.datasetinfo.SM_Alternative_Name  + ' ' + $scope.viewData.datasetinfo.MECH_OF_ACTION + ' ' + $scope.viewData.datasetinfo.FDA_PHASE + ' ' +  $scope.viewData.datasetinfo.Bioassay_Targets.toString() +' Small Molecules Catalogue LDP, LINCS Data Portal, Small Molecules lincs, bd2k, dcic, bd2k-lincs dcic, data coordination and integration center,biomedical, systems biology, drug discovery, Clinical Phase, perturbations, Pharmacological Classification, Mechanism of Action, Bioassay Type, diseases, drugs');

    },60);

    $scope.submitSmiles = function(smiles,type,ps){
        $scope.str.emptyAll();
        StructurePost.get({molecule: smiles, type:type, limit:1000, similarity:ps}, function (response) {
            $scope.str.searchTerm = 'lincsidentifier:(\"' +response.ids.toString().replace(/,/g, '" OR "') +'")'
            console.log($scope.str.searchTerm);
            $scope.str.elements(response.ids.toString().replace(/,/g, '" OR "'), '', $scope.str.selected , 'lincsidentifier');
                $location.path('/catalog');
            },500);


    }

        $timeout(function () {
            $scope.displaysorry = "true";
        }, 500);



    if($location.$$hash == '') {
        $scope.template = "components/datasetLandingPages/description/description.html";
    }




});