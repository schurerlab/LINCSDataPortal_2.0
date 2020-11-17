import React from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import axios from 'axios';



class Clinical extends React.Component {


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
            url:'http://dev3.ccs.miami.edu:8080/dcic/api/SigC-clinical?id='+this.props.sp.perturbagen_id
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
            let efo = dataset.efo_term;
            let efo_id = dataset.efo_id;
            let mesh = dataset.mesh_heading;
            let mesh_id = dataset.mesh_id;
            let fda = dataset.max_phase_for_ind;
            return (
                <tr key={index}>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}} >
                        <a style={{  color: "#337ab7"}} className="data-button"
                           href={`https://www.ebi.ac.uk/ols/ontologies/efo/terms?short_form=/${efo_id}`}> {efo} </a>
                    </td>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}}>
                        <a style={{  color: "#337ab7"}} className="data-button"
                           href={`https://meshb.nlm.nih.gov/record/ui?ui=${mesh_id}`}> {mesh} </a>
                    </td>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}}>
                        {fda}
                    </td>
                </tr>

            )
        });
        console.log(this.state.totaldocuments);
        return ( this.state.totaldocuments > 0 ?
                <div >
                    <h5 style={{color:"#CC3300"}}>Clinical Annotations</h5>
                    <hr style={{borderTop: "1px solid #CC3300"}} />
                    <Table  bordered >
                        <thead>
                        <tr>
                            <th style={{width:"50%",fontSize: "0.8rem",padding: ".3rem"}}>EFO Term</th>
                            <th style={{width:"40%",fontSize: "0.8rem",padding: ".3rem"}}>MESH Term</th>
                            <th style={{width:"10%",fontSize: "0.8rem",padding: ".3rem"}}>FDA Phase</th>


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

export default Clinical;

