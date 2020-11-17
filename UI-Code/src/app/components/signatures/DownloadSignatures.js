import React,{useContext,useEffect,useState} from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal,OverlayTrigger,Popover,Tooltip} from 'react-bootstrap';
import { Context } from '../../Context';
import axios from 'axios';
let csl = { 'fontSize': '0.7em' };

const DownloadSignatures =() => {
    const provider = useContext(Context);
    const resultsSummary = 'resultsSummary';
    const [filters,setFilters] = useState([]);
    let prefiltered =[];
    // let summary = []; 
    


    const download =()=>{
        fetch(
            'http://lincsportal.ccs.miami.edu/sigc-api/frontend/downloadSignatures',
            { method: 'GET',headers: {
               'Content-Type': 'application/json'
            },
            credentials: 'include'} ) .then(res => res.json())
          .then(response => {
            window.open("http://lincsportal.ccs.miami.edu/sigc-api/frontend/downloadSignatures","_self");
          })
    }  




    return (
        <Button className="pull-right" bsStyle="primary"
                                style={{fontSize:"0.8em"}}
                                onClick={() => download()} >Download Signatures
        </Button>
    )
}

export default DownloadSignatures;