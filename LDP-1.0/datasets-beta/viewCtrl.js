/**
 * Created by akoleti on 3/8/16.
 */
app.controller('ViewCtrl',function($modal,$scope,$routeParams, $filter,$window,$timeout,$location,$http,
                                   $anchorScroll,$compile,ViewService,$interval,$resource,FileSaver, Blob,Dataset){
    $scope.did = $routeParams.id;
    var term = $routeParams.id;
    $scope.viewData= ViewService;
     downlaodGroups= Dataset;
    $scope.viewData.viewDatasetDetails(term);



    $timeout( function() {
        document.title = $scope.viewData.datasetinfo.datasetname;

    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "json-ld";
    $("head").append(s);


    var schemaOrg = angular.toJson({
        '@context': 'http://schema.org',
        '@type': 'Dataset',
        'name': $scope.viewData.datasetinfo.datasetname,
        'description': $scope.viewData.datasetinfo.description,
        'identifier': $scope.viewData.datasetinfo.datasetgroup,
        'keywords': $scope.viewData.datasetinfo.biologicalbucket.toString()+ ',' + $scope.viewData.datasetinfo.assaydesignmethod.toString() + ',' + $scope.viewData.datasetinfo.biologicalprocess.toString() + ',' + $scope.viewData.datasetinfo.endpointcategorization,
        'url': 'http://identifiers.org/lincs.data/'+$scope.viewData.datasetinfo.datasetgroup,
        'includedInDataCatalog': 'LINCS',
        'citation': $scope.viewData.datasetinfo.publication,
        'distribution': [
            {
                '@type': 'DataDownload',
                'name': $scope.viewData.datasetinfo.datasetid+'tar.gz',
                'fileFormat': 'tar.gz',
                "contentURL": 'http://lincsportal.ccs.miami.edu/dcic/api/download?path='+$filter('ftppath')($scope.viewData.datasetinfo.path)+'&file='+$scope.viewData.datasetinfo.datasetlevels[0]+'.tar.gz'
            }
        ],
        'measurementTechnique': $scope.viewData.datasetinfo.assayname.toString(),
        'creator': {
            '@type': 'Organization',
            'name': $scope.viewData.datasetinfo.centerfullname.toString()
        },
        'version': '1.0'


    });
        angular.element(document).ready(function() {
            var jsonLd = angular.element(document.getElementById('json-ld'))[0];
            jsonLd.innerHTML = schemaOrg;
        });

}, 100 );



    $scope.tabs = function(id){
        if(id=='description'){
            $scope.acttab ="description";
            $scope.template="components/datasetLandingPages/description/description.html";
        }else if(id=='metadata'){
            $scope.acttab ="metadata";
            $scope.template="metadata.html";
        }else if(id=='downloaddataset'){
            $scope.acttab ="downloaddataset";
            $scope.template="downloaddataset.html";
        }else if(id=='tools'){
            $scope.acttab ="tools";
            $scope.template="tools.html";
        }
        else if(id=='visualize'){
            $scope.acttab ="visualize";
            if($scope.viewData.datasetinfo.endpoints==undefined){
                $scope.template="placeholder.html";
            }
            if($scope.viewData.datasetinfo.endpoints!=undefined) {
                if ($scope.viewData.datasetinfo.endpoints.toString() == 'percentControl') {
                    $scope.template = "visualize.html";
                }
            }

        }
        else if(id=='wiki'){
            $scope.acttab ="wiki";
            $scope.template="placeholder.html";

        }
    }

    if($location.$$hash != ''){
        $scope.tabs($location.$$hash);
        $scope.acttab ='downloaddataset';
    }

    var Citaionservive = $resource('http://life.ccs.miami.edu/SwengCommonsWeb/citation/:verb',
        {
            verb: '@verb',
            title: '@title',
            src: '@src',
            authors: '@authors',
            style: '@style',
            url: '@url',
            publisher: '@publisher',
            issued: '@issued',
            accessed: '@accessed',
            doi: '@doi',
            abstract: '@abstract',
            shortTitle: '@shortTitle',
            output: '@output',
            isbn: '@isbn',
            output: '@output'
        });
     $scope.bibtext= function (filename,type) {
         firtstnames = $scope.viewData.datasetinfo.principalinvestigator.toString().split(",");
         Authors = "";
         for (auti= 0; auti< firtstnames.length;auti++){
             Authors+='{"function": "author","first": ' + firtstnames[auti]+',"last":" "' + '}';
             if(auti<firtstnames.length-1){
                 Authors+=',';
             }
         }
         citation = Citaionservive.save({
                     verb: 'style',
                     title: $scope.viewData.datasetinfo.datasetname.toString(),
                     src: 'website',
                     authors: '['+Authors+']',
                     style: type
                     , url: 'http://identifiers.org/lincs.data/'+filename,
                     publisher: $scope.viewData.datasetinfo.centerfullname.toString(),
                     issued: $scope.viewData.datasetinfo.datereleased.toString().substring(0,4),
                     abstract: $scope.viewData.datasetinfo.assayoverview,
                     shortTitle: $scope.viewData.datasetinfo.assayname.toString(),
                     output: 'text'
                 }
                 , function (data) {
                     var data = new Blob([data.bibliography], {type: 'text/plain;charset=utf-8'});
                     if (type === 'bibtex') {
                         FileSaver.saveAs(data, filename + '.bib');
                     } else {
                         FileSaver.saveAs(data, filename + '.txt');
                     }

                 }
         );



     }
    $scope.ris= function (filename,type,ty) {

        var risFormat ="";
        risFormat+="TY  - "+ty+"\n";
        risFormat+="AU  - "+$scope.viewData.datasetinfo.principalinvestigator.toString()+"\n";
        risFormat+="TI  - "+ $scope.viewData.datasetinfo.datasetname.toString()+"\n";
        risFormat+="DA  - "+$scope.viewData.datasetinfo.datereleased.toString().substring(0,4)+"\n";
        risFormat+="DP  - LINCS"+"\n";
        risFormat+="AB  - "+ $scope.viewData.datasetinfo.assayoverview+"\n";
        risFormat+="KW  - "+$scope.viewData.datasetinfo.assayname.toString()+"\n";
        risFormat+="DO  - "+"PURL"+"\n";
        risFormat+="UR  - "+"http://identifiers.org/lincs.data/"+filename+"\n";

        var data = new Blob([ risFormat], { type: 'text/plain;charset=utf-8' });
            FileSaver.saveAs(data, filename+'.ris');

    }
    $scope.endnote= function (filename,type,ty) {
        var endFormat ="";
        endFormat+="%0  - "+ty+"\n";
        endFormat+="%A  - "+$scope.viewData.datasetinfo.principalinvestigator.toString()+"\n";
        endFormat+="%T  - "+ $scope.viewData.datasetinfo.datasetname.toString()+"\n";
        endFormat+="%D  - "+$scope.viewData.datasetinfo.datereleased.toString().substring(0,4)+"\n";
        endFormat+="%W  - LINCS"+"\n";
        endFormat+="%X  - "+ $scope.viewData.datasetinfo.assayoverview+"\n";
        endFormat+="%U  - "+ "http://identifiers.org/lincs.data/"+filename+"\n";



        var data = new Blob([ endFormat], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(data, filename+'.enw');

    }

    $scope.showCitation = function (ldsid,type,version) {
        $scope.createModal = $modal({
            scope: $scope,
            template: 'templates/citation.html',
            show: true
        })
        $scope.date = new Date();
        $scope.citeldsid=ldsid;
        $scope.rtype=type;
        $scope.version=version;
    };

    $scope.groupDownload= function(){

        tempdatasets = "\""+$scope.viewData.datasetinfo.datasetlevels.toString().replace(/,/g,"\",\"")+"\"";
        downlaodGroups.get({ verb:'bulk-download', datasets: tempdatasets }, function(data) {

            console.log(data)

            downloadoutput=data.data.filename;
            console.log( tempdatasets);
            window.location.href = "/dcic/api/download?path=Bulk_Download&file="+downloadoutput;
          
        })
    }
    if($location.$$hash == '') {
        $scope.template = "components/datasetLandingPages/description/description.html";
    }


});