import React,{useContext,useEffect,useState} from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import Item from './Item';
let csl = { 'fontSize': '0.7em' };

const SearchResultsPanel = (props) => {

    console.log(props.facets)
    return (

    <div>
   { Object.entries(props.facets).map(([key,value])=> ( 
            <Panel className="primary" key={props.label+key} >
            <div className="col-md-12 mx-auto" >
                <b>{props.label}</b>  

                    <span style={{fontWeight:"500"}}> | {key} </span> 
                    <Panel.Body  style={{  overflow: "scroll", maxHeight:"110px"}} >
                    <Item term={value} cls={props.label} type={key}></Item>
                    </Panel.Body>
                    
                
               <br/>
            </div>
            </Panel>
        ) ) }
    </div>

   
    )

}

export default SearchResultsPanel;