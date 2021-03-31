/**
 * Created by akoleti on 3/8/16.
 */
app.service('ViewService', function (DatasetDetails,$location,$window,StructurePost) {
    var self = {
        'limit':10,
        'skip':0,
        'gototop': function () {
            $window.scrollTo(0, 0)
        },
        'viewDatasetDetails': function (term) {
            self.gototop();
            temp= "lincsidentifier:"+term;
            // self.datasetid=term;
            DatasetDetails.get({verb: 'fetchmolecules', searchTerm: temp,limit: self.limit,skip:self.skip}, function (data) {
                    self.datasetinfo=data.results.documents[0];
                    self.name=data.results.documents[0].SM_Name;
                    self.lsm=data.results.documents[0].lincsidentifier;
                    self.cl=data.results.documents[0].cells;
                    self.smiles=data.results.documents[0].SM_SMILES_Parent;
                    self.loadSamples();
                    self.loadDatasets();
                    self.loadBioactivity();
                    self.loadMoa();
                    self.loadDrug();
                    self.loadCells();
                    self.loadRelated();
                    self.loadDrugClass();
                
                }
            )
        },
        'loadDatasets':function(){
            clSearch="smlincsidentifier:"+"\""+self.lsm+"\"" ;
            DatasetDetails.get({verb: 'fetchdata', searchTerm:clSearch ,limit:200,skip:self.skip,fields:'datasetname,datasetid,assayname,centerletter,centerurl,assaydesignmethod,biologicalbucket'}, function (data) {
                self.totalDatasets = data.results.totalDocuments;
                self.clDatasets = data.results.documents;
            })
        },
        'loadCells':function(){
            clSearch='Name:(\"' +self.cl.toString().replace(/,/g, '" OR "') +'")' ;
            DatasetDetails.get({verb: 'fetchcells', searchTerm:clSearch ,limit:200,skip:self.skip,fields:'Name,LINCS_ID,category,source,Organ,Disease,assays'}, function (data) {
                self.totalCells = data.results.totalDocuments;
                self.cells = data.results.documents;
            })
        },
        'loadMoa':function(){
            clSearch=self.lsm ;
            DatasetDetails.get({verb: 'moa', id:clSearch }, function (data) {
                self.moa = data.documents;
            })
        },
        'loadDrugClass':function(){
            clSearch=self.lsm ;
            DatasetDetails.get({verb: 'drugClassification', id:clSearch }, function (data) {
                self.drug_class = data.documents;
            })
        },
        'loadDrug':function(){
            clSearch=self.lsm ;
            DatasetDetails.get({verb: 'drugindication', id:clSearch }, function (data) {
                self.drug = data.documents;
            })
        },
        'loadSamples':function(){
            clSearch="lincsidentifier:"+"\""+self.lsm+"\"" ;
            DatasetDetails.get({verb: 'fetchbatch', searchTerm:clSearch ,limit:200,skip:self.skip,fields:'SM_Center_Sample_ID,SM_Center_Compound_ID,SM_Provider,SM_Provider_Catalog_ID,SM_SMILES_Batch,datasets,source'}, function (data) {
                self.samples = data.results.documents;
            })
        },
        'loadRelated':function(){
            StructurePost.get({molecule: self.smiles, type:'similarity', limit:10, similarity:0.8}, function (data) {
                self.similarids = data.ids;
            })
        },
        'loadBioactivity':function(){
            clSearch=self.lsm ;
            DatasetDetails.get({verb: 'bioactivity', id:clSearch }, function (data) {
                self.bioactivity = data.documents;
            })
        }
    }


    return self;
});
