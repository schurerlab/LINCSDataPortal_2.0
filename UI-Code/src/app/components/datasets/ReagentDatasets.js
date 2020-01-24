import React from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import axios from 'axios';



class ReagentDatasets extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            datasets:[],
            totaldocuments:""
        }
        this.handleSerice = props.handleChange;
    }

    componentWillMount(){
        this.getDatasets();
    }

    getDatasets(){
        axios.request({
            method:'get',
            url:'http://lincsportal.ccs.miami.edu/dcic/api/fetchdata?fields=datasetname,datasetgroup,assayname,centerletter,centerurl,assaydesignmethod,biologicalbucket&limit=200&searchTerm='+this.props.id+'"&skip=0'
        }).then((response) => {

            this.setState({datasets: response.data.results.documents,totaldocuments: response.data.results.totalDocuments}, () => {

            });
        }).catch((error) => {
            console.log(error);
        });
    }
    

    render() {
        let datasetItems;
            datasetItems = this.state.datasets.map(dataset => {
                let id = dataset.datasetgroup;
                let title = dataset.datasetname;
                let assay = dataset.assayname;
                let center = "/media/icons/" + dataset.centerletter + ".png";
                let area = dataset.biologicalbucket;
                let sourcelink = dataset.centerdatasetid;
                return (
                    <tr key={id}>
                        <td style={{fontSize: "0.8rem",padding: ".3rem"}}>
                            <a style={{  color: "#337ab7"}} className="data-button"
                               href={`/signatures/datasets/${dataset.datasetgroup}`}>{id}</a>
                        </td>
                        <td style={{fontSize: "0.8rem",padding: ".3rem"}}>
                            {title}
                        </td>
                        <td style={{fontSize: "0.8rem",padding: ".3rem"}} >
                            <img className="listcenterimage" src={center} role="presentation"/>
                        </td>
                        <td style={{fontSize: "0.8rem",padding: ".3rem"}}>{assay}</td>
                        <td style={{fontSize: "0.8rem",padding: ".3rem"}}>{area}</td>
                    </tr>

                )
            });
        return (
            <div >
                <h5 style={{color:"#CC3300"}}>Datasets : {this.state.totaldocuments}</h5>
                <hr style={{borderTop: "1px solid #CC3300"}} />
                <Table  bordered >
                    <thead>
                    <tr>
                        <th style={{width:"10%",fontSize: "0.8rem",padding: ".3rem"}}>ID</th>
                        <th style={{width:"40%",fontSize: "0.8rem",padding: ".3rem"}}>Dataset</th>
                        <th style={{width:"10%",fontSize: "0.8rem",padding: ".3rem"}}>Center</th>
                        <th style={{width:"20%",fontSize: "0.8rem",padding: ".3rem"}}>Assay</th>
                        <th style={{width:"10%",fontSize: "0.8rem",padding: ".3rem"}}>Subject Area</th>
                    </tr>
                    </thead>
                    <tbody>

                     {datasetItems}
                    </tbody>

                </Table>
            </div>
        );
    }
}

export default ReagentDatasets;

