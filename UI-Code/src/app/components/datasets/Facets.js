import React, { Component } from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import FacetItem from '../../components/datasets/FacetItem';
import FacetShowHide from '../../components/datasets/FacetShowHide';




class Facets extends Component {

    state = {
        assaydesignmethodslice:2,
        assaynameslice:2,
        biologicalbucketslice:2,
        biologicalprocessslice:2,
        centernameslice:2,
        projectnameslice:2,
    }


    updateMethod = () =>{
        this.setState({
            assaydesignmethodslice:100,
        })
    }

    // updateAssay = () =>{
    //     this.setState({
    //         assaynameslice:100,
    //     })
    // }
    //
    // updateBuckets = () =>{
    //     this.setState({
    //         biologicalbucketslice:100,
    //     })
    // }
    //
    // updateProcess = () =>{
    //     this.setState({
    //         biologicalprocessslice:100,
    //     })
    // }
    //
    // updateCenters = () =>{
    //     this.setState({
    //         centernameslice:100,
    //     })
    // }
    //
    // updateProjects = () =>{
    //     this.setState({
    //         projectnameslice:100,
    //     })
    // }

    render() {

        function rename(input){
            if (input!=null){
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
        }

        let facetItems;
        let assaydesignmethod;
        let assayname;
        let biologicalbucket;
        let biologicalprocess;
        let centername;
        let projectname;
        if(this.props.facets.length >0 ){
            facetItems = this.props.facets.map(key => {
                 assaydesignmethod = Object.entries(key).map(([key,value])=>{
                    return (

                    <Panel className="primary" key={key}>
                        <Panel.Heading >
                            <Panel.Title   componentClass="h4" className="text-center">{rename(key)}</Panel.Title>
                        </Panel.Heading>

                        <Panel.Body>
                            <FacetItem facets={value}></FacetItem>
                        </Panel.Body>
                        <div>
                        <FacetShowHide show="more"></FacetShowHide>
                        </div>
                    </Panel>
                        
                    );
                })

            });
        }
        return (
            <div style={{marginTop:"2em"}} className="facet_border">
                {assaydesignmethod}


            </div>
        );
    }
}

export default Facets;