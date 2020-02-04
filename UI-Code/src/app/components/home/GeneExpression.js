import React, { Component } from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import FacetItem from '../../components/datasets/FacetItem';
import FacetShowHide from '../../components/datasets/FacetShowHide';
import Element from  '../../components/home/Element';
import Facets from  '../../components/signatures/Facets';
import { Link } from 'react-router-dom';



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
            // console.log(this.props.facets);
            console.log(this.props.mode);
            assaydesignmethod = Object.entries(this.props.facets).map(([key,value])=>{
                return (

                    <Panel className="primary" key={key}>
                        <div className="col-md-12 mx-auto" >
                           <b> {this.props.label } </b> <span>{this.props.label ? '|' : ''}</span><span style={{fontWeight:"500"}}> {jsUcfirst(key)} </span>
                        </div>
                        <Panel.Body  style={{  overflow:"scroll", maxHeight:"110px"}} >
                            {this.props.mode=="concordance" ? <Facets facets={value} type={this.props.label} cat={key} mode={this.props.com} ></Facets> :
                            <Element facets={value} type={this.props.label} cat={key} mode="signature" ></Element>
                            }
                            
                        </Panel.Body>
                        <br/>
                    </Panel>

                );
            })
        }
        return (
            <div  className="facet_border">
                {assaydesignmethod}


            </div>
        );
    }


}

export default GeneExpression;