/**
 * Created by akoleti on 3/8/16.
 */
app.service('ViewService', function (DatasetDetails, toaster,$location,$window,CannedAnalysis) {
    var self = {
        'limit':10,
        'skip':0,
        'smSkip' : 0,
        'smLimit':5,
        'smSearch':"",
        'prSkip' : 0,
        'prLimit':5,
        'prSearch':"",
        'ppSkip' : 0,
        'ppLimit':5,
        'ppSearch':"",
        'narSearch':"",
        'narSkip':0,
        'narLimit':5,
        'unSearch':"",
        'unSkip':0,
        'unLimit':5,
        'clSkip' : 0,
        'clLimit':5,
        'clSearch':"",
        'esclSkip' : 0,
        'esclLimit':5,
        'esclSearch':"",
        'geSkip' : 0,
        'geLimit':5,
        'geSearch':"",
        'ipSkip' : 0,
        'ipLimit':5,
        'ipSearch':"",
        'dcSkip' : 0,
        'dcLimit':5,
        'dcSearch':"",
        'pcSkip' : 0,
        'pcLimit':5,
        'pcSearch':"",
        'datasetid':"",
        'abSkip' : 0,
        'abLimit':5,
        'gototop': function () {
            $window.scrollTo(0, 0)
        },
        'viewDatasetDetails': function (term) {
            self.gototop();
            temp= "datasetid:"+term+" OR datasetgroup:"+term+ " OR datasetlevels:"+term;
            // self.datasetid=term;
            DatasetDetails.get({verb: 'fetchdata', searchTerm: temp,limit: self.limit,skip:self.skip}, function (data) {
                    self.datasetinfo=data.results.documents[0];
                if(data.results.documents[0]!=undefined) {
                    self.tabs = data.results.documents[0].statsfields;
                    self.levels = data.results.documents[0].datalevels;
                    self.tools = data.results.documents[0].tool;
                    self.links = data.results.documents[0].toollink;
                    self.datasetid=data.results.documents[0].datasetid;
                    self.conc = data.results.documents[0].concentrations;
                    self.notfound = "false";
                    if(data.results.documents[0].funding!=undefined){
                        self.funds = data.results.documents[0].funding.toString().split("; ");
                    }
                }

                    if(data.results.documents[0]==undefined){
                        self.notfound = "true"
                        console.log(self.notfound);
                    }


                }
            )
        },
        'loadSm':function(){
            entitytype = "";
            // self.smFieldkeys =["entityName","SM_PubChem_CID","SM_LINCS_ID","Center_Sample_ID","Provider"];
            DatasetDetails.get({verb: 'fetchbatch', searchTerm: "datasets:"+self.datasetid +"  "+entitytype+"  "+self.smSearch+"*"  ,limit:self.smLimit,skip:self.smSkip}, function (data) {
                self.sm = data.results.documents;
                self.smTotal = data.results.totalDocuments;

            })

        },
        'loadOr':function(){
            entitytype = "category: \"Other Reagents\"";
            self.orFieldkeys =["entityName","lincsidentifier"];
            DatasetDetails.get({verb: 'fetchentities', searchTerm: "datasets:"+self.datasetid +"  "+entitytype+"  "+self.orSearch+"*"  ,limit:self.orLimit,skip:self.orSkip}, function (data) {
                self.or = data.results.documents;
                self.orTotal = data.results.totalDocuments;

            })

        },
        'loadProtein':function(){
            entitytype = "category: \"Protein\"";
            self.prFieldkeys =["entityName","PR_UniProt_ID","lincsidentifier","PR_Gene_ID","PR_Gene_Symbol"];
            DatasetDetails.get({verb: 'fetchentities', searchTerm: "datasets:"+self.datasetid +"  "+entitytype+"  "+self.prSearch+"*" ,limit:self.prLimit,skip:self.prSkip}, function (data) {
                self.pr = data.results.documents;
                self.prTotal = data.results.totalDocuments;

            })

        },
        'loadCell':function(){
            entitytype = "category: \"Cell Line\"";
            self.clFieldkeys =["entityName","CL_LINCS_ID","CL_Disease","CL_Organ","CL_Provider_Name","CL_Provider_Catalog_ID"];
            DatasetDetails.get({verb: 'fetchcells', searchTerm: "datasets:"+self.datasetid +"  "+entitytype +"  "+self.clSearch+"*" ,limit:self.clLimit,skip:self.clSkip}, function (data) {
                self.cl = data.results.documents;
                self.clTotal = data.results.totalDocuments;

            })

        },
        'loadEscell':function(){
            entitytype = "category: \"Embryonic Stem Cell\"";
            self.esclFieldkeys =["entityName","lincsidentifier"];
            DatasetDetails.get({verb: 'fetchcells', searchTerm: "datasets:"+self.datasetid +"  "+entitytype +"  "+self.esclSearch+"*" ,limit:self.esclLimit,skip:self.esclSkip}, function (data) {
                self.escl = data.results.documents;
                self.esclTotal = data.results.totalDocuments;

            })

        },
        'loadUnp':function(){
            entitytype = "category: \"Unclassified Perturbagen\"";
            self.unpFieldkeys =["entityName","lincsidentifier","up_center_canonical_id","up_provider_name","up_center_batch_id","up_provider_catalog_id","up_provider_batch_id"];
            DatasetDetails.get({verb: 'fetchentities', searchTerm: "datasets:"+self.datasetid +"  "+entitytype +"  "+self.unSearch+"*" ,limit:self.unLimit,skip:self.unSkip}, function (data) {
                self.un = data.results.documents;
                self.unTotal = data.results.totalDocuments;

            })

        },
        'loadNar':function(){
            entitytype = "category: \"Nucleic Acid Reagent\"";
            self.narFieldkeys =["entityName","entityId","na_target_locus_species","na_type","na_mode","na_transcript_id","na_target_gene_id","na_subtype"];
            DatasetDetails.get({verb: 'fetchentities', searchTerm: "datasets:"+self.datasetid +"  "+entitytype +"  "+self.narSearch+"*" ,limit:self.narLimit,skip:self.narSkip}, function (data) {
                self.nar = data.results.documents;
                self.narTotal = data.results.totalDocuments;

            })

        },
        'loadiPSC':function(){
                entitytype = "category: \"iPSC\"";
                self.ipfieldkeys =["entityName","IP_LINCS_ID","IP_Reprogramming_Method","IP_Passage_Last_Karyotyping"];
            DatasetDetails.get({verb: 'fetchentities', searchTerm: "datasets:"+self.datasetid +"  "+entitytype +"  "+self.ipSearch+"*" ,limit:self.ipLimit,skip:self.ipSkip}, function (data) {
                self.ip = data.results.documents;
                self.ipTotal = data.results.totalDocuments;

            })
        },
        'loadDc':function(){
            entitytype = "category: \"Differentiated Cell\"";
            self.dcfieldkeys =["entityName","DC_LINCS_ID"];
            DatasetDetails.get({verb: 'fetchentities', searchTerm: "datasets:"+self.datasetid +"  "+entitytype +"  "+self.dcSearch+"*"  ,limit:self.dcLimit,skip:self.dcSkip}, function (data) {
                self.dc = data.results.documents;
                self.dcTotal = data.results.totalDocuments;

            })
        },
        'loadPc':function(){
            entitytype = "category: \"Primary Cell\"";
            self.pcfieldkeys =["entityName","PC_LINCS_ID","PC_Donor_Age","PC_Donor_Ethnicity","PC_Provider_Name","PC_Provider_Catalog_ID"];
            DatasetDetails.get({verb: 'fetchentities', searchTerm: "datasets:"+self.datasetid +"  "+entitytype+"  "+self.pcSearch+"*"  ,limit:self.pcLimit,skip:self.pcSkip}, function (data) {
                self.pc = data.results.documents;
                self.pcTotal = data.results.totalDocuments;

            })
        },
        'loadGe':function(){
            entitytype = "category: \"Transcribed Gene\"";
            self.gefieldkeys =["entityName","GENE_EntresID","GENE_Description","GENE_Symbol","GENE_Synonyms","GENE_Organism"];
            DatasetDetails.get({verb: 'fetchentities', searchTerm: "datasets:"+self.datasetid +"  "+entitytype+"  "+self.geSearch+"*" ,limit:self.geLimit,skip:self.geSkip}, function (data) {
                self.ge = data.results.documents;
                self.geTotal = data.results.totalDocuments;

            })
        },
        'loadPp':function(){
            entitytype = "category: \"Peptide Probe\"";
            self.ppFieldkeys =["PP_Cluster","PP_ClusterCode","PP_Phosphosite"];
            DatasetDetails.get({verb: 'fetchentities', searchTerm: "datasets:"+self.datasetid +"  "+entitytype +"  "+self.ppSearch+"*" ,limit:self.ppLimit,skip:self.ppSkip}, function (data) {
                self.pp = data.results.documents;
                self.ppTotal = data.results.totalDocuments;

            })
        },
        'loadAt':function(){
            entitytype = "category: \"Antibody\"";
            self.ppFieldkeys =["entityName","lincsidentifier"];
            DatasetDetails.get({verb: 'fetchentities', searchTerm: "datasets:"+self.datasetid +"  "+entitytype ,limit:self.abLimit,skip:self.abSkip}, function (data) {
                self.anti = data.results.documents;
                self.antiTotal = data.results.totalDocuments;

            })
        },
        'loadCA':function(){
            CannedAnalysis.get({verb: 'search', object_type: "canned_analysis"  ,dataset_accession:"LDS-1126"}, function (data) {
                self.ca = data;
                console.log( self.ca);

            })
        }
    }


    return self;
});
