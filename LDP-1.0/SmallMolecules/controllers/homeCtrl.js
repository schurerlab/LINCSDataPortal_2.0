/**
 * Created by akoleti on 2/23/17.
 */
app.controller('HomeController', function ($scope, $window,$modal, DatasetService,$location,Page) {

    Page.setTitle('Small Molecules');
    Page.setKeywords('Small Molecules LDP, LINCS Data Portal, Small Molecules lincs, bd2k, dcic, bd2k-lincs dcic, data coordination and integration center,biomedical, systems biology, drug discovery, Clinical Phase, perturbations, Pharmacological Classification, Mechanism of Action, Bioassay Type, diseases, drugs');

    $scope.title="Small Molecules";
    $scope.labels=['Transcriptomics','Binding','Metabolomics','Proteomics','Imaging','Epigenomics'];
    $scope.values=[24716,157,95,119,29136,90]

    $scope.phaselabels=['Approved drug','Phase 3 trials','Phase 2 trials','Phase 1 trials'];
    $scope.phasevalues=[1186,176,146,57]

    $scope.source=['BroadT LINCS','HMS LINCS','PCCSE','DToxS','NeuroLINCS','MEP LINCS'];
    $scope.sourcevalues=[30455,13271,346,93,27,0,0];
    $scope.xlabels= ["0","50","100","500","1000","10000","20000","30000","40000"];
    $scope.op="options: {fill: false,datasetFill: false,lineTension : 0,pointRadius: 0}";

});