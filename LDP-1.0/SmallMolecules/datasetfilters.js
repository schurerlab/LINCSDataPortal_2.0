/**
 * Created by akoleti on 2/23/16.
 */
app.filter('capitalize', function() {
    return function(input, scope) {
        if (input!=null)
            input = input.toLowerCase();
        return input.substring(0,1).toUpperCase()+input.substring(1);
    }
})
app.filter('firstcapitalize', function() {
    return function(input, scope) {
        if (input!=null)
            return input.substring(0,1).toUpperCase()+input.substring(1);
    }
})
app.filter('facetRename', function() {
    return function (input, scope) {
        if (input != null)
            if (input == 'source') {
                return input.replace('source', 'LINCS Center');
            } else if (input == 'assays') {
                return input.replace('assays', 'Bioassay Type');
            } else if (input == 'FDA_PHASE') {
                return input.replace('FDA_PHASE', 'Clinical Phase');
            } else if (input == 'Drug_Class') {
                return input.replace('Drug_Class', 'Pharmacological Classification');
            } else if (input == 'MECH_OF_ACTION') {
                return input.replace('MECH_OF_ACTION', 'Mechanism of Action');
            }
    }
})

app.filter('replaceunderscore', function(){
        return function(input, scope) {
            if (input!=null)
                return input.replace('_',':');
        }
    })
app.filter('removeunderscore', function(){
        return function(input, scope) {
            if (input!=null)
                return input.replace('_',' ');
        }
    })
app.filter('removehms', function(){
        return function(input, scope) {
            if (input!=null)
                return input.replace('HMSL','');
        }
    })
app.filter('removeefo', function(){
    return function(input, scope) {
        if (input!=null)
            return input.replace('EFO:','EFO_');
    }
})
app.filter('removenih', function(){
    return function(input, scope) {
        if (input!=null)
            return input.replace('NIH ','');
    }
})
app.filter('removename', function(){
        return function(input, scope) {
            if (input!=null)
                return input.replace('name','');
        }
    })
app.filter('ftppath', function(){
        return function(input, scope) {
            if (input!=null)
                if(input =='/projects/ccs/bd2klincs/LINCS_Data/HMS_LINCS'){
                    return input.replace('/projects/ccs/bd2klincs/LINCS_Data/HMS_LINCS','LINCS_Data/HMS_LINCS');
                }else if(input =='/projects/ccs/bd2klincs/External_Data/CMT-MGH') {
                    return input.replace('/projects/ccs/bd2klincs/External_Data/CMT-MGH','External_Data/CMT-MGH');
                }else if(input =='/projects/ccs/bd2klincs/LINCS_Data/BroadT_LINCS'){
                    return input.replace('/projects/ccs/bd2klincs/LINCS_Data/BroadT_LINCS','LINCS_Data/BroadT_LINCS');
                }else if(input =='/projects/ccs/bd2klincs/LINCS_Data/Broad_Therapeutics'){
                    return input.replace('/projects/ccs/bd2klincs/LINCS_Data/Broad_Therapeutics','LINCS_Data/Broad_Therapeutics');
                }else if(input =='/projects/ccs/bd2klincs/LINCS_Data/CU_LINCS'){
                    return input.replace('/projects/ccs/bd2klincs/LINCS_Data/CU_LINCS','LINCS_Data/CU_LINCS');
                }else if(input =='/projects/ccs/bd2klincs/LINCS_Data/DToxS'){
                    return input.replace('/projects/ccs/bd2klincs/LINCS_Data/DToxS','LINCS_Data/DToxS');
                }else if(input =='/projects/ccs/bd2klincs/LINCS_Data/PCCSE_LINCS'){
                    return input.replace('/projects/ccs/bd2klincs/LINCS_Data/PCCSE_LINCS','LINCS_Data/PCCSE_LINCS');
                }else if(input =='/projects/ccs/bd2klincs/LINCS_Data/ASU_LINCS'){
                    return input.replace('/projects/ccs/bd2klincs/LINCS_Data/ASU_LINCS','LINCS_Data/ASU_LINCS');
                }else if(input =='/projects/ccs/bd2klincs/LINCS_Data/MEP_LINCS'){
                    return input.replace('/projects/ccs/bd2klincs/LINCS_Data/MEP_LINCS','LINCS_Data/MEP_LINCS');
                }else if(input =='/projects/ccs/bd2klincs/LINCS_Data/NeuroLINCS'){
                    return input.replace('/projects/ccs/bd2klincs/LINCS_Data/NeuroLINCS','LINCS_Data/NeuroLINCS');
                }else if(input =='/projects/ccs/bd2klincs/External_Data/ChEMBL'){
                    return input.replace('/projects/ccs/bd2klincs/External_Data/ChEMBL','External_Data/ChEMBL');
                }
        }
    })
app.filter('downladRename', function() {
    return function (input, scope) {
        if (input != null)
            if (input == 'smallmolecule') {
                return input.replace('smallmolecule', 'Small Molecule');
            } else if (input == 'cellline') {
                return input.replace('cellline', 'cellline');
            } else if (input == 'protein') {
                return input.replace('protein', 'Protein');
            } else if (input == 'gene') {
                return input.replace('gene', 'Gene');
            } else if (input == 'shRNA') {
                return input.replace('shRNA', 'shRNA');
            } else if (input == 'cDNA') {
                return input.replace('cDNA', 'cDNA');
            } else if (input == 'phosphoprotein') {
                return input.replace('phosphoprotein', 'Phosphoproteins');
            } else if (input == 'antibody') {
                return input.replace('antibody', 'Antibody');
            }
            else if (input == 'iPSC') {
                return input.replace('iPSC', 'IPSCs');
            }
            else if (input == 'primarycell') {
                return input.replace('primarycell', 'Primary Cells');
            }
    }
})
app.filter('rename', function(){
        return function(input, scope) {
            if (input!=null)
                if(input=='assays'){
                    return input.replace('assays','Assays');
                }
                else if(input=='source'){
                    return input.replace('source','Centers');
                }else if(input=='SM_Category'){
                    return input.replace('SM_Category','Category');
                }else if(input=='SM_Provider'){
                    return input.replace('SM_Provider','Provider');
                }else if(input=='Drug_Class'){
                    return input.replace('Drug_Class','Drug');
                }else if(input=='MESH_Term'){
                    return input.replace('MESH_Term','Mesh');
                }else if(input=='EFO_INFORMATION'){
                    return input.replace('EFO_INFORMATION','Efo');
                }else if(input=='MECH_OF_ACTION'){
                    return input.replace('MECH_OF_ACTION','Moa');
                }else if(input=='Target_Genes'){
                    return input.replace('Target_Genes','Target');
                }

        }
    })
app.filter('replacefirstunderscore', function(){
        return function(input, scope) {
            if (input!=null)
                return input.replace(/^.+_/,'');
        }
    })
app.filter('trustAsResourceUrl', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    }])