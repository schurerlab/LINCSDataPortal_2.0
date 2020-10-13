import React, { Component } from 'react';
import {Grid, Row, Col, Panel, ListGroup, ListGroupItem, Button,ButtonGroup,Table} from 'react-bootstrap';
import { Link } from "react-router-dom";

import {Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton,AccordionItemPanel } from 'react-accessible-accordion';
import '../../../node_modules/react-accessible-accordion/dist/fancy-example.css';
export const BigQuery = (props) => {
    return (

        <div className="container-fluid main-container" >
        <ButtonGroup className="d-flex justify-content-center">
        <a href="https://docs.google.com/document/d/1z9oZS46Tn02yRZpm3SBnryN2b9_2oKkpoVVUjlZt06U" target="_blank">
            <Button  bsStyle="primary" style={{margin: "2em"}}>
                LINCS BigQuery Documentation
            </Button>
        </a>
        <a href="https://console.cloud.google.com/bigquery?project=lincsdatasets&page=queries" target="_blank">
            <Button  bsStyle="primary" style={{margin: "2em"}}>Google BigQuery Console</Button>
        </a>
        <a href="https://docs.google.com/document/d/1z9oZS46Tn02yRZpm3SBnryN2b9_2oKkpoVVUjlZt06U" target="_blank">
            <Button  bsStyle="primary" style={{margin: "2em"}}>Integrate with LINCS BigQuery</Button>
         </a>   
        </ButtonGroup>
        <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Find signatures by assay eg: KINOMEscan, L1000, P100, GCP, KiNativ, ATAC-seq, RNA-seq
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                        Select * from bigquery-public-data.umiami_lincs.signature where assay_category = 'Kinomescan' 
                     </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Copy
                    </Button>
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by dataset id eg: LDS-4212, LDS-1005
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    Select * from bigquery-public-data.umiami_lincs.signature where dataset_id = 'LDS-4212' 
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Copy
                    </Button>
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by area of area of study eg: binding, imaging, proteomics, transcriptomics, epigenomics
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    Select * from bigquery-public-data.umiami_lincs.signature where subject_area = 'binding'  
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Copy
                    </Button>
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by Model System (Name) eg: A375, PC-3, MCF-7
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    Select * from bigquery-public-data.umiami_lincs.signature where subject_area = 'binding'  
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Copy
                    </Button>
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by Tissue eg: Lung, Breast,  Skin
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    Select * from bigquery-public-data.umiami_lincs.signature where subject_area = 'binding'  
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Copy
                    </Button>
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by Disease eg: malignant melanoma, carcinoma
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    Select * from bigquery-public-data.umiami_lincs.signature where subject_area = 'binding'  
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Copy
                    </Button>
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by Perturbation Type eg: Small Molecule, Gene knockdown
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    Select * from bigquery-public-data.umiami_lincs.signature where subject_area = 'binding'  
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Copy
                    </Button>
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by Perturbation Name eg: Seliciclib, EGFR
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    Select * from bigquery-public-data.umiami_lincs.signature where subject_area = 'binding'  
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Copy
                    </Button>
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by MOA eg: Cyclin-dependent kinase, ALK tyrosine kinase receptor inhibitor
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    Select * from bigquery-public-data.umiami_lincs.signature where subject_area = 'binding'  
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Copy
                    </Button>
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by Target eg: Hepatocyte growth factor receptor, ALK tyrosine kinase receptor inhibitor
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    Select * from bigquery-public-data.umiami_lincs.signature where subject_area = 'binding'  
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Copy
                    </Button>
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup> 
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find signatures by Gene symbol eg: EGFR, EGFP
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    Select * from bigquery-public-data.umiami_lincs.signature where subject_area = 'binding'  
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Copy
                    </Button>
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
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
                    Select * from bigquery-public-data.umiami_lincs.signature where subject_area = 'binding'  
                   </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Copy
                    </Button>
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup>  
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Find gene Proteomics signatures by Measured entity (Protein symbol) 
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><code>
                    Select * from bigquery-public-data.umiami_lincs.signature where subject_area = 'binding'  
                    </code></p>
                    {/* <hr></hr> */}
                    <ButtonGroup className="d-flex justify-content-center" >
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Copy
                    </Button>
                    <Button href="#" style={{ border: "1px solid #6c757d"}}>
                            Execute in console
                    </Button>
                     </ButtonGroup>   
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    </div>
    );
}
