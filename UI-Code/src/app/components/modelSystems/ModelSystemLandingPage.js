import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'
import ReagentDatasets from "../../components/datasets/ReagentDatasets"
import BarChart from '../../components/assays/BarChart';
import ModelSystemPage from './ModelSystemPage'
let csl = { 'fontSize': '0.7em' };
let perturbations = [];
let  modelsystems =[];


class ModelSystemLandingPage extends React.Component {


    constructor(props){

        super(props);
        console.log(this.props.id);
        this.state = {
            data:[],
            lincsid:"",
            id: this.props.id,

        }
    }



    componentDidMount(){
        this.getDatasetInfo();
        let newTitle = document.querySelector('title')
        newTitle.innerHTML = "SignatureCommonsUI"
    }



    getDatasetInfo(){
        axios.request({
            method:'get',
            url:'http://lincsportal.ccs.miami.edu/sigc-api/cell-line/fetch-by-id?id='+this.props.id
        }).then((response) => {

             this.setState({ms2: {
            "id": this.props.id,
            "name": response.data.data[0].cell_line_name,
            "category": "Cell line",
            "disease": response.data.data[0].disease[0],
            "tissue": response.data.data[0].tissue ? response.data.data[0].tissue[0] : null,
            "organ": response.data.data[0].organ,
            "signatures": response.data.data[0].signature_category_count
        }}

    )




        }).catch((error) => {
            console.log(error);
        });


    }


    render() {

        return (
            <div style={ csl } className="container-fluid">

                { this.state.ms2  ?  <ModelSystemPage showModelSystem={this.state.ms2} /> :  '' }


            </div>
        );
    }
}

export default ModelSystemLandingPage;

