/**
 * Created by akoleti on 2/23/17.
 */
app.controller('HomeController', function ($scope, $window,$modal, DatasetService,$location) {

    $scope.labels=['Transcriptomics','Binding','Metabolomics','Proteomics','Imaging','Epigenomics'];
    $scope.values=[24716,157,95,119,29136,90]

    $scope.phaselabels=['Approved drug','Phase 3 trials','Phase 2 trials','Phase 1 trials'];
    $scope.phasevalues=[847,163,62,42]

    $scope.source=['BroadT LINCS','HMS LINCS','PCCSE','DToxS','NeuroLINCS','MEP LINCS'];
    $scope.sourcevalues=[30455,13271,346,93,27,0,0]

});