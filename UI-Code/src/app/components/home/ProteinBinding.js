import React, { Component } from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import FacetItem from '../../components/datasets/FacetItem';
import FacetShowHide from '../../components/datasets/FacetShowHide';
import Element from  '../../components/home/Element';



class GeneExpression extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        function jsUcfirst(string)
        {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        let assaydesignmethod;
        let facetItems;
        if(this.props.facets ){
            assaydesignmethod = Object.entries(this.props.facets).map(([key,value])=>{
                return (

                    <Panel className="primary" key={key}>
                        <Panel.Heading className="panel-heading facet_heading">
                            <Panel.Title   componentClass="h4" className="text-center ">Protein Binding | {jsUcfirst(key)}</Panel.Title>
                        </Panel.Heading>

                        <Panel.Body  style={{  overflow:"scroll", maxHeight:"200px"}} >
                            <Element facets={value}></Element>
                        </Panel.Body>

                    </Panel>

                );
            })
        }
        return (
            <div style={{marginTop:"2em"}} className="facet_border">
                {assaydesignmethod}


            </div>
        );
    }


}

export default GeneExpression;