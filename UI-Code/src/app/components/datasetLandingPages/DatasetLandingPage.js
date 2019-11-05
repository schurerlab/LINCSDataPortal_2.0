import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Header from './header/Header';
import DatasetDescription from './description/DatasetDescription';

class DatasetLandingPage extends React.Component {

    constructor(props){

        super(props);
        this.state = {
            temp: "datasetid:"+this.props.id+" OR datasetgroup:"+this.props.id+ " OR datasetlevels:"+this.props.id,
            datasetinfo:[],
            datasetsId:"",
            notfound: false
        }
    }

    componentWillMount(){
        this.getDatasetInfo();
    }


    getDatasetInfo(){
        axios.request({
            method:'get',
            url:'http://lincsportal.ccs.miami.edu/dcic/api/fetchdata?limit=10&searchTerm='+this.state.temp
        }).then((response) => {
            this.setState({datasetinfo: response.data.results.documents}, () => {
                if(this.state.datasetinfo[0]==undefined){
                    this.setState( {notfound: true},()=> {

                    });
                }
            });
        }).catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        
        return (
            <div >
                {this.state.datasetinfo.length > 0 ? <Header datasetinfo={this.state.datasetinfo[0]} /> : '' }
            </div>
        );
    }
}

export default DatasetLandingPage;

