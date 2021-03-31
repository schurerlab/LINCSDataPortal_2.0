/**
 * Created by akoleti on 3/28/17.
 */
app.controller('StructureController', function ($scope, $window,$modal, DatasetService,$location) {

    $scope.structure = DatasetService;
    $scope.structure.clearAll();
    // $scope.inputSmiles = "";

    $scope.SubmittedSmiles = function(inputSmiles){
        $.ajax({
            url: 'http://dev3.ccs.miami.edu:8080/SMDB-app/smdb?molecule=' + inputSmiles +'&limit=1000', success: function (response) {

                $scope.structure.searchTerm = 'lincsidentifier:(\"' +response.ids.toString().replace(/,/g, '" OR "') +'")'

                $scope.structure.elements(response.ids.toString().replace(/,/g, '" OR "'), '', $scope.structure.selected , 'lincsidentifier');
                $location.path('/catalog');


            }
        })
    }
    
    
    function submitSimilar() {
        var tempsmileString = JSON.stringify(smileString).split('"').join('');
        var searchString = tempsmileString.split('\\').join('');

        $.ajax({
            url: 'http://dev3.ccs.miami.edu:8080/SMDB-app/smdb?molecule=' + searchString+'&limit=1000&type=similarity', success: function (response) {


                $scope.structure.searchTerm = 'lincsidentifier:(\"' +response.ids.toString().replace(/,/g, '" OR "') +'")'
                $scope.structure.elements(response.ids.toString().replace(/,/g, '" OR "'), '', $scope.structure.selected , 'lincsidentifier');
                $location.path('/catalog');

            }
        })
    }

    function submitSmile() {
        var tempsmileString = JSON.stringify(smileString).split('"').join('');
        var searchString = tempsmileString.split('\\').join('');

        $.ajax({
            url: 'http://dev3.ccs.miami.edu:8080/SMDB-app/smdb?molecule=' + searchString+'&limit=1000', success: function (response) {

                $scope.structure.searchTerm = 'lincsidentifier:(\"' +response.ids.toString().replace(/,/g, '" OR "') +'")'
                
                $scope.structure.elements(response.ids.toString().replace(/,/g, '" OR "'), '', $scope.structure.selected , 'lincsidentifier');
                $location.path('/catalog');


            }
        })
    }

    var marvinSketcherInstance;

    $(document).ready(function handleDocumentReady(e) {
        getMarvinPromise("#sketch").done(function (sketcherInstance) {
            marvinSketcherInstance = sketcherInstance;

            $("#getSmilesButton").on("click", function handleGetSmilesButton() {
                smilesControl.getSmiles();
            });
            $("#getSimarButton").on("click", function handleGetSmilesButton() {
                smilesControl.getSimilar();
            });

        }).fail(function () {
            alert("Cannot retrieve sketcher instance from iframe");
        });
    });

    var errorConsole = (function () {
        var controlObject = {
            "reset": function () {
                $("#error").children("p").html("");
            }
            , "print": function (txt) {
                $("#error").children("p").html(txt);
            }
            , "isEmpty": function () {
                return ($("#error").children("p").html() === "");
            }
        };

        return controlObject;

    }());

    var smilesControl = (function () {

        function getMolConvertURL() {
            var ws = getDefaultServices();
            return ws['molconvertws'];
        };

        function handleRequestError(qXHR, textStatus, errorThrown) {
            if (qXHR.status == 0) { // UNSENT request
                var errMsg = "ERROR: MolConvert failed.\nThe request has not been sent.\nThe request may violate the cross domain policy.";
                errorConsole.print(errMsg);
            } else {
                errorConsole.print("ERROR: MolConvert failed (status code " + qXHR.status + ")\n" + qXHR.responseText);
            }
        };

        var controlObject = {

            "getSmiles": function getSmiles() {
                errorConsole.reset();
                var s = marvinSketcherInstance.exportAsMrv();
                var data = JSON.stringify({
                    "structure": s,
                    "inputFormat": "mrv",
                    "parameters": "smiles"
                });

                $.ajax({
                    "url": getMolConvertURL()
                    , "type": "POST"
                    , "dataType": "json"
                    , "contentType": "application/json"
                    , "data": data
                }).done(function (data, textStatus, jqXHR) {
                    $("#smiles").val(data['structure']);
                    smileString = JSON.stringify($("#smiles").val());
                    submitSmile();
                }).fail(handleRequestError);
            },
            "getSimilar": function getSmiles() {
                errorConsole.reset();
                var s = marvinSketcherInstance.exportAsMrv();
                var data = JSON.stringify({
                    "structure": s,
                    "inputFormat": "mrv",
                    "parameters": "smiles"
                });

                $.ajax({
                    "url": getMolConvertURL()
                    , "type": "POST"
                    , "dataType": "json"
                    , "contentType": "application/json"
                    , "data": data
                }).done(function (data, textStatus, jqXHR) {
                    $("#smiles").val(data['structure']);
                    smileString = JSON.stringify($("#smiles").val());
                    submitSimilar();
                }).fail(handleRequestError);
            }

        }

        return controlObject;

        console.log(inputSmiles);

    }());
})