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
app.filter('renamepath', function(){
    return function(input, scope) {
        if (input!=null)
            return input.replace('/projects/ccs/bd2klincs/','');
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
            else if (input == 'differentiatediPSC') {
                return input.replace('differentiatediPSC', 'Differentiated Cells');
            }
            else if (input == 'other') {
                return input.replace('other', 'Other');
            }
            else if(input=='escell'){
                return input.replace('escell','Embryonic Stem Cell');
            }
            else if(input=='dp'){
                return input.replace('dp','Differentiated Progenitor');
            }
            else if(input=='nar'){
                return input.replace('nar','Nucleic Acid Reagent');
            }
            else if(input=='unclassper'){
                return input.replace('unclassper','Unclassified Perturbagen');
            }

    }
})
app.filter('rename', function(){
        return function(input, scope) {
            if (input!=null)
                if(input=='smallmolecule'){
                    return input.replace('smallmolecule','Small molecules');
                }else if(input=='cellline'){
                    return input.replace('cellline','Cell lines');
                }else if(input=='protein'){
                    return input.replace('protein','Proteins');
                }else if(input=='gene'){
                    return input.replace('gene','Genes');
                }else if(input=='shRNA'){
                    return input.replace('shRNA','shRNAs');
                }else if(input=='cDNA'){
                    return input.replace('cDNA','cDNAs');
                }else if(input=='phosphoprotein'){
                    return input.replace('phosphoprotein','Peptide probes');
                }else if(input=='antibody'){
                    return input.replace('antibody','Antibodies');
                }
                else if(input=='iPSC'){
                    return input.replace('iPSC','iPSCs');
                }
                else if(input=='primarycell'){
                    return input.replace('primarycell','Primary cells');
                }
                else if(input=='differentiatediPSC'){
                    return input.replace('differentiatediPSC','Differentiated Cells');
                }
                else if(input=='other'){
                    return input.replace('other','Other Reagents');
                }
                else if(input=='escell'){
                    return input.replace('escell','Embryonic Stem Cells');
                }
                else if(input=='dp'){
                    return input.replace('dp','Differentiated Progenitors');
                }
                else if(input=='nar'){
                    return input.replace('nar','Nucleic Acid Reagents');
                }
                else if(input=='unclassper'){
                    return input.replace('unclassper','Unclassified Perturbagens');
                }
                else if(input=='assayname'){
                    return input.replace('assayname','Assay');
                }else if(input=='datasetname'){
                    return input.replace('datasetname','Dataset');
                }else if(input=='projectname'){
                    return input.replace('projectname','Project');
                }else if(input=='principalinvestigator'){
                    return input.replace('principalinvestigator','Principal investigator');
                }else if(input=='screeninglabinvestigator'){
                    return input.replace('screeninglabinvestigator','Screening lab investigator');
                }else if(input=='assaydesignmethod'){
                    return input.replace('assaydesignmethod','Method');
                }else if(input=='assayformat'){
                    return input.replace('assayformat','Format');
                }else if(input=='biologicalprocess'){
                    return input.replace('biologicalprocess','Process');
                }else if(input=='biologicalbucket'){
                    return input.replace('biologicalbucket','Subject Area');
                }else if(input=='physicaldetection'){
                    return input.replace('physicaldetection','Physical detection');
                }else if(input=='endpointcategorization'){
                    return input.replace('endpointcategorization','Endpoint categorization');
                }else if(input=='centername'){
                    return input.replace('centername','Center');
                }else if(input=='datasetstage'){
                    return input.replace('datasetstage','Status');
                }else if(input='datereleased'){
                    return input.replace('datereleased','Released');
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