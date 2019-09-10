<?php
    header("Access-Control-Allow-Origin: *");

    sleep(0.1);

    $json = '{ "data": 
            { "perturbations": 
                { "totalCount":"52015", "nucleicAcidReagent":"31176" , "smallMolecule":"20839" } , 
              "modelSystems": 
                { "totalCount":"87", "cellTypes":"'.rand(1,123).'", "disease":"50", "tissues":"20" } , 
              "signatures": 
                { "totalCount":"565668", "binding":"193" , "geneExpression":"565475" } 
            } 
        }';

    echo $json;
?>
