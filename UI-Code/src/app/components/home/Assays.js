import React, { Component } from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import FacetItem from '../../components/datasets/FacetItem';
import FacetShowHide from '../../components/datasets/FacetShowHide';
import Element from  '../../components/home/Element';



class Assays extends Component {

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

                    <Panel key={key} >
                        <br/>
                        <div  style={{  overflow:"scroll"}} >

                                <b><span className="properties-header" style={{fontWeight:"500",color:"orange"}}> {jsUcfirst(key)} </span> </b>
                            <hr style={{borderTop: "1px solid orange"}}/>

                        </div>


                        <Panel.Body  style={{  overflow:"scroll", maxHeight:"110px"}} >
                            <Element  facets={value} type="Assay" cat={key}></Element>
                        </Panel.Body>
                        <br/>
                    </Panel>

                );
            })
        }
        return (
            <div  className="col-12" >
                {assaydesignmethod}


            </div>
        );
    }


}

export default Assays;