import React, { Component,useContext,useEffect,useState,useRef } from 'react';
import {Grid, Row, Col, Panel, ListGroup, ListGroupItem, Button,ButtonGroup,Table} from 'react-bootstrap';
import { Link } from "react-router-dom";

import {Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton,AccordionItemPanel } from 'react-accessible-accordion';
import '../../../node_modules/react-accessible-accordion/dist/fancy-example.css';
export const BigQuery = (props) => {

   

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);
  
    function copyToClipboard(e) {
      textAreaRef.current.defaultValue;
      document.execCommand('copy');
      console.log(textAreaRef.current.defaultValue);
      // This is just personal preference.
      // I prefer to not show the whole text area selected.
      e.target.focus();
      setCopySuccess('Copied!');
    };

    return (

        <div className="container-fluid main-container" >
        <ButtonGroup className="d-flex justify-content-center">
        <a href="https://docs.google.com/document/d/1Bddq9cNGzrfEWSRlMy36JC3yD6c8-BH-6K-Qvs3__M0/" target="_blank">
            <Button  bsStyle="primary" style={{margin: "2em"}}>
                LINCS BigQuery Documentation
            </Button>
        </a>
        <a href="https://console.cloud.google.com/marketplace/product/umiami-lincs/umiami-lincs?filter=solution-type:dataset&q=lincs&id=2000bf1c-07e6-496e-896e-df1f4d47ee63" target="_blank">
            <Button  bsStyle="primary" style={{margin: "2em"}}>Google BigQuery Console</Button>
        </a>
        {/* <a href="https://docs.google.com/document/d/1z9oZS46Tn02yRZpm3SBnryN2b9_2oKkpoVVUjlZt06U" target="_blank">
            <Button  bsStyle="primary" style={{margin: "2em"}}>Integrate with LINCS BigQuery</Button>
         </a>    */}
        </ButtonGroup>
        <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Find signatures by assay eg: KINOMEscan, L1000, P100, GCP, KiNativ, ATAC-seq, Cell Phenotype
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                         select * from lincs-gbq-nov2020.bq_final.signature where assay_category  = 'KINOMEscan'
                     </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}} onClick={() => {navigator.clipboard.writeText("select * from lincs-gbq-nov2020.bq_final.signature where assay_category  = 'KINOMEscan'")}}>
                            Copy
                    </Button>
                    <Button href="https://console.cloud.google.com/bigquery?sq=798315654593:187cb2995f2340f4a41bc75302300759" target="_blank" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by dataset id eg: LDS-1481, LDS-1484, LDS-41235
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    select * from lincs-gbq-nov2020.bq_final.signature where dataset_id = 'LDS-1481'
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}} onClick={() => {navigator.clipboard.writeText(" select * from lincs-gbq-nov2020.bq_final.signature where dataset_id = 'LDS-1481'")}}>
                            Copy
                    </Button>
                    <Button href="https://console.cloud.google.com/bigquery?sq=798315654593:37048580d7874e48808a0d636bc9bae5" target="_blank" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by area of area of study eg: Binding, Imaging, Proteomics, Transcriptomics, Epigenomics
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    select s.* 
                    from lincs-gbq-nov2020.bq_final.signature s
                        join lincs-gbq-nov2020.bq_final.dataset d on (d.dataset_id = s.dataset_id)
                        join lincs-gbq-nov2020.bq_final.assay a on (a.assay_id = d.assay_id)
                    where a.area_of_study  = 'Imaging'
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}} onClick={() => {navigator.clipboard.writeText(" select s.*  from lincs-gbq-nov2020.bq_final.signature s join lincs-gbq-nov2020.bq_final.dataset d on (d.dataset_id = s.dataset_id)   join lincs-gbq-nov2020.bq_final.assay a on (a.assay_id = d.assay_id)  where a.area_of_study  = 'Imaging' ")}}>
                            Copy
                    </Button>
                    <Button href="https://console.cloud.google.com/bigquery?sq=798315654593:1c37b633cfd6414e96b4cc753ebb07b4" target="_blank" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by Model System (Name) eg: A-549, MCF-7, HT-29, A-375, PC-3, VCaP
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    select distinct * from lincs-gbq-nov2020.bq_final.signature s
  inner join lincs-gbq-nov2020.bq_final.model_system m on (m.signature_id = s.signature_id )
    inner join lincs-gbq-nov2020.bq_final.cell_line c on (c.model_system_id = m.model_system_id and c.model_system_class = m.model_system_type )
    where c.cl_name = 'A-549' 
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}} onClick={() => {navigator.clipboard.writeText("  select distinct * from lincs-gbq-nov2020.bq_final.signature s inner join lincs-gbq-nov2020.bq_final.model_system m on (m.signature_id = s.signature_id )   inner join lincs-gbq-nov2020.bq_final.cell_line c on (c.model_system_id = m.model_system_id and c.model_system_class = m.model_system_type )   where c.cl_name = 'A-549' ")}}>

                            Copy
                    </Button>
                    <Button href="https://console.cloud.google.com/bigquery?sq=798315654593:05b6f82749bd43d8b742ce5191b71ac2" target="_blank" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by Tissue eg: lung, breast,  skin, pancreas
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    select distinct * from lincs-gbq-nov2020.bq_final.signature s
  inner join lincs-gbq-nov2020.bq_final.model_system m on (m.signature_id = s.signature_id )
    inner join lincs-gbq-nov2020.bq_final.cell_line c on (c.model_system_id = m.model_system_id and c.model_system_class = m.model_system_type )
    where c.cl_organ = 'lung' 
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}} onClick={() => {navigator.clipboard.writeText("   select distinct * from lincs-gbq-nov2020.bq_final.signature s  inner join lincs-gbq-nov2020.bq_final.model_system m on (m.signature_id = s.signature_id )   inner join lincs-gbq-nov2020.bq_final.cell_line c on (c.model_system_id = m.model_system_id and c.model_system_class = m.model_system_type )   where c.cl_organ = 'lung' ")}}>

                            Copy
                    </Button>
                    <Button href="https://console.cloud.google.com/bigquery?sq=798315654593:5bf26a4e3d2f4e87873ac2c61eeaed2d" target="_blank" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by Disease eg: colon carcinoma melanoma, carcinoma, breast ductal carcinoma, lung adenocarcinoma
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    select *  from lincs-gbq-nov2020.bq_final.signature s
  inner join lincs-gbq-nov2020.bq_final.model_system m on (m.signature_id = s.signature_id )
    inner join lincs-gbq-nov2020.bq_final.cell_line c on (c.model_system_id = m.model_system_id and c.model_system_class = m.model_system_type )
     where c.cl_disease = 'lung adenocarcinoma' 
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}} onClick={() => {navigator.clipboard.writeText(" select *  from lincs-gbq-nov2020.bq_final.signature s  inner join lincs-gbq-nov2020.bq_final.model_system m on (m.signature_id = s.signature_id )    inner join lincs-gbq-nov2020.bq_final.cell_line c on (c.model_system_id = m.model_system_id and c.model_system_class = m.model_system_type )    where c.cl_disease = 'lung adenocarcinoma' ")}}>

                            Copy
                    </Button>
                    <Button href="https://console.cloud.google.com/bigquery?sq=798315654593:c4a366858abe46838acf186362b79f97" target="_blank" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by Perturbation Type eg: small_molecule, protein_perturbagen, nucleic_acid_reagent
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    select *   from lincs-gbq-nov2020.bq_final.signature s
  inner join lincs-gbq-nov2020.bq_final.perturbation p on (p.signature_id = s.signature_id)
  where perturbagen_class = 'small_molecule'
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}} onClick={() => {navigator.clipboard.writeText(" select *   from lincs-gbq-nov2020.bq_final.signature s  inner join lincs-gbq-nov2020.bq_final.perturbation p on (p.signature_id = s.signature_id)   where perturbagen_class = 'small_molecule' ")}}>

                            Copy
                    </Button>
                    <Button href="https://console.cloud.google.com/bigquery?sq=798315654593:2d4de7bcef5849f2a0221ba8abbfcbe2" target="_blank"  style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by Perturbation Name eg: Taxol, Vorinostat, Neratinib, Dasatinib
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    select *   from lincs-gbq-nov2020.bq_final.signature s
  inner join lincs-gbq-nov2020.bq_final.perturbation p on (p.signature_id = s.signature_id)
    inner join lincs-gbq-nov2020.bq_final.small_molecule sm on (sm.perturbagne_id = p.perturbagen_id and p.perturbagen_class = sm.perturbagne_class)
    where sm.sm_name = 'Taxol'
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}} onClick={() => {navigator.clipboard.writeText("  select *   from lincs-gbq-nov2020.bq_final.signature s   inner join lincs-gbq-nov2020.bq_final.perturbation p on (p.signature_id = s.signature_id)    inner join lincs-gbq-nov2020.bq_final.small_molecule sm on (sm.perturbagne_id = p.perturbagen_id and p.perturbagen_class = sm.perturbagne_class)   where sm.sm_name = 'Taxol'")}}>

                            Copy
                    </Button>
                    <Button href="https://console.cloud.google.com/bigquery?sq=798315654593:bd6755871b344488a14f5770488ce75d"  target="_blank"  style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by Gene symbol eg: EGFR, ETFA, JAK1
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    select *  from lincs-gbq-nov2020.bq_final.signature s
  inner join lincs-gbq-nov2020.bq_final.perturbation p on (p.signature_id = s.signature_id)
    inner join lincs-gbq-nov2020.bq_final.nucleic_acid_reagent nr on (nr.perturbagen_id = p.perturbagen_id and p.perturbagen_class = nr.perturbagen_class )
    where na_name = 'EGFR'
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}} onClick={() => {navigator.clipboard.writeText(" select *  from lincs-gbq-nov2020.bq_final.signature s   inner join lincs-gbq-nov2020.bq_final.perturbation p on (p.signature_id = s.signature_id)   inner join lincs-gbq-nov2020.bq_final.nucleic_acid_reagent nr on (nr.perturbagen_id = p.perturbagen_id and p.perturbagen_class = nr.perturbagen_class )    where na_name = 'EGFR'")}}>
                            Copy
                    </Button>
                    <Button href="https://console.cloud.google.com/bigquery?sq=798315654593:893a80f7df0a4a31ae3f185990cefee2" target="_blank" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find gene expression signatures by Measured entity (Gene Symbol) eg: EGFR, EGFP
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    select *  from lincs-gbq-nov2020.bq_final.signature s
  inner join lincs-gbq-nov2020.bq_final.readout r on (r.signature_id = s.signature_id )
  inner join lincs-gbq-nov2020.bq_final.gene g on (g.measured_entity_id = r.measured_entity_id and g.measured_entity_class = r.measured_entity_class )
  where gene_symbol  =  'EGFR'
                   </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}} onClick={() => {navigator.clipboard.writeText(" select *  from lincs-gbq-nov2020.bq_final.signature s   inner join lincs-gbq-nov2020.bq_final.readout r on (r.signature_id = s.signature_id )  inner join lincs-gbq-nov2020.bq_final.gene g on (g.measured_entity_id = r.measured_entity_id and g.measured_entity_class = r.measured_entity_class )  where gene_symbol  =  'EGFR'")}}>
                            Copy
                    </Button>
                    <Button href="https://console.cloud.google.com/bigquery?sq=798315654593:15f3c3097df9418fb0dcee32f323af27" target="_blank" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup>  
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find  Proteomics signatures by Measured entity (Protein symbol) eg:   PFKP, MAP3K2, BRAF
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    select * from lincs-gbq-nov2020.bq_final.signature s
  inner join lincs-gbq-nov2020.bq_final.readout r on (r.signature_id = s.signature_id )
  inner join lincs-gbq-nov2020.bq_final.probe_p100  g on (g.measured_entity_id = r.measured_entity_id and g.measured_entity_class = r.measured_entity_class )
   where pp_gene_symbol  =  'BRAF'
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}} onClick={() => {navigator.clipboard.writeText(" select * from lincs-gbq-nov2020.bq_final.signature s    inner join lincs-gbq-nov2020.bq_final.readout r on (r.signature_id = s.signature_id )     inner join lincs-gbq-nov2020.bq_final.probe_p100  g on (g.measured_entity_id = r.measured_entity_id and g.measured_entity_class = r.measured_entity_class )   where pp_gene_symbol  =  'BRAF'")}}>
                            Copy
                    </Button>
                    <Button href="https://console.cloud.google.com/bigquery?sq=798315654593:27dd9de77068440d83393c43a34f9d54" target="_blank" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup>   
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    </div>
    );
}
