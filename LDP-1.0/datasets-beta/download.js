/**
 * Created by akoleti on 2/25/16.
 */
app.controller('DownloadController', function ($scope,$routeParams,$modal,DatasetService,Dataset) {

    $scope.filename = $routeParams.id;
    $scope.showflag = true;
    $scope.downloadservice = DatasetService;
    $scope.laddaloading=false;
    $scope.downloadloading=false;


    $scope.laddaactive="false";
    $scope.currentDownloadPage=1;



    $scope.downloadSpinner =function(){
        setTimeout(function ()
        {
            $scope.downloadloading=true;
        }, 15000);

    }
    setTimeout(function ()
    {
        $scope.$apply(function()
        {
            $scope.showflag = false;
        });
    }, 15000);

    $scope.addAllTocCart =function(searchTerms){
        Dataset.get({ verb:'fetchdata', searchTerm: searchTerms,fields:"datasetid",limit:"1000" }, function(data) {
            for (i = 0; i < data.results.documents.length; i++) {
                if ($scope.downloadservice.cart.indexOf('"'+data.results.documents[i]['datasetid']+'"') == -1) {
                    $scope.downloadservice.cart.push('"'+data.results.documents[i]['datasetid']+'"');
                }
            }
        });
    }

    $scope.downloadall =function(searchTerms){
        $scope.laddaloading=true;
        $scope.laddaactive="true";
        Dataset.get({ verb:'fetchdata', searchTerm: searchTerms,fields:"datasetid",limit:"1000" }, function(data) {
            for (i=0;i<data.results.documents.length;i++){
                if ($scope.downloadservice.cart.indexOf(data.results.documents[i]['datasetid']) == -1) {
                    $scope.downloadservice.cart.push(data.results.documents[i]['datasetid']);
                }
            }

            setTimeout(function ()
            {
                $scope.showCreateModal();
                $scope.laddaloading=false;
                $scope.laddaactive="false";
            }, 3000);
        });


    }


    $scope.showCreateModal = function () {
        $scope.createModal = $modal({
            scope: $scope,
            template: 'templates/modal.create.tpl.html',
            show: true
        })
        var dowloadlist = $scope.downloadservice.cart.toString();
        $scope.finallist =dowloadlist.replace(new RegExp(',', 'g'), ' || ');
        $scope.downloadservice.selectedDatasets($scope.finallist);
        $scope.dlength = $scope.downloadservice.selectedDatasets.length;
        console.log( $scope.downloadservice.selecteddocuments);
    };
    $scope.removeme=function(id){
        var didr = '"'+id+'"';
        $scope.downloadservice.removeDatasets(didr);
        if($scope.downloadservice.selecteddocuments.length==1){
            $scope.downloadCurrentPage(1);
        }
    }

    $scope.downloadCurrentPage= function(id){
        var temp = $scope.finallist;
        if(id >0){
            console.log(id);
            $scope.pageNum=id;
            $scope.downloadservice.downloadNextPage(id-1,temp);
            $scope.downloadservice.gototop();
        }
    }




});

