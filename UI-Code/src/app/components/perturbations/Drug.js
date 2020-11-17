import React from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import axios from 'axios';



class Drug extends React.Component {


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
            url:'http://dev3.ccs.miami.edu:8080/dcic/api/SigC-drug?id='+this.props.sp.perturbagen_id
        }).then((response) => {

            this.setState({datasets: response.data, totaldocuments:  response.data.length}, () => {

            });
        }).catch((error) => {
            console.log(error);
        });
    }


    render() {
        let datasetItems;
        datasetItems = this.state.datasets.map(function(dataset, index)  {
            let name = dataset.classification_name;
            let organization = dataset.organization;
            let classification = dataset.classification;
            return (
                <tr key={index}>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}} >
                       {classification}
                    </td>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}}>
                         {name}
                    </td>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}}>
                        {organization}
                    </td>
                </tr>

            )
        });
        console.log(this.state.totaldocuments);
        return ( this.state.totaldocuments > 0 ?
                <div >
                    <h5 style={{color:"#CC3300"}}>Drug Classification</h5>
                    <hr style={{borderTop: "1px solid #CC3300"}} />
                    <Table  bordered >
                        <thead>
                        <tr>
                            <th style={{width:"50%",fontSize: "0.8rem",padding: ".3rem"}}>Classification</th>
                            <th style={{width:"40%",fontSize: "0.8rem",padding: ".3rem"}}>Classification Name</th>
                            <th style={{width:"10%",fontSize: "0.8rem",padding: ".3rem"}}>Organization</th>


                        </tr>
                        </thead>
                        <tbody>

                        {datasetItems}
                        </tbody>

                    </Table>
                </div> :''
        );
    }
}

export default Drug;


