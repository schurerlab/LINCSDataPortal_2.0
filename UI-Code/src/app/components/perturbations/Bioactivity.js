import React from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import axios from 'axios';



class Bioactivity extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            datasets:[],
            totaldocuments:""
        }
        this.handleSerice = props.handleChange;
    }

    componentDidMount(){
        this.getDatasets();
    }

    getDatasets(){
        axios.request({
            method:'get',
            url:'http://dev3.ccs.miami.edu:8080/sigc-api/small-molecule/fetch-bioactivity?id='+this.props.sp.perturbagen_id
        }).then((response) => {


            this.setState({datasets: response.data.data[0].bioactivity, totaldocuments:  response.data.data[0].count}, () => {

            });
        }).catch((error) => {
            console.log(error);
        });
    }


    render() {
        let datasetItems;
        datasetItems = this.state.datasets.map(function(dataset, index)  {
            let endpoint = dataset.endpointType;
            let uniprotAcession = dataset.uniprotAcession;
            let geneSymbol = dataset.geneSymbol;
            let value = dataset.value;
            return (
                <tr key={index}>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}} >
                        {geneSymbol}
                    </td>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}}>
                        <a style={{  color: "#337ab7"}} className="data-button"
                           href={`https://www.uniprot.org/uniprot/${uniprotAcession}`}> {uniprotAcession} </a>
                    </td>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}}>
                     {endpoint}
                    </td>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}}>{value}</td>
                </tr>

            )
        });
        return (
            <div >
                <h5 style={{color:"#CC3300"}}>Aggregated Bioactivity Data : {this.state.totaldocuments}</h5>
                <hr style={{borderTop: "1px solid #CC3300"}} />
                <Table  bordered >
                    <thead>
                    <tr>
                        <th style={{width:"10%",fontSize: "0.8rem",padding: ".3rem"}}>Target</th>
                        <th style={{width:"40%",fontSize: "0.8rem",padding: ".3rem"}}>UniProt Accession</th>
                        <th style={{width:"10%",fontSize: "0.8rem",padding: ".3rem"}}>Endpoint Type</th>
                        <th style={{width:"20%",fontSize: "0.8rem",padding: ".3rem"}}>Value</th>

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

export default Bioactivity;

