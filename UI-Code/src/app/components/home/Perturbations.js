import React, { Component } from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import FacetItem from '../../components/datasets/FacetItem';
import FacetShowHide from '../../components/datasets/FacetShowHide';
import Element from  '../../components/home/Element';



class Perturbations extends Component {

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
                            <div className="col-md-12 mx-auto" >
                                <b>{this.props.label}</b>  <span>{this.props.label ? '|' : ''}</span> <span style={{fontWeight:"500"}}>{jsUcfirst(key)} </span>
                            </div>
                            <Panel.Body  style={{  overflow: "scroll", maxHeight:"110px"}} >
                                <Element style={{ fontSize:"0.8rem",lineHeight:"1" }} facets={value} type={this.props.label} cat={key} query={this.props.query}></Element>
                            </Panel.Body>

                            <br/>
                        </Panel>

                    );
                })
        }
        return (
            <div className="facet_border">
                {assaydesignmethod}


            </div>
        );
    }


}

export default Perturbations;