import React from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import axios from 'axios';



class Pharma extends React.Component {


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
            url:'http://dev3.ccs.miami.edu:8080/dcic/api/SigC-pharma?id='+this.props.sp.perturbagen_id
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
            let moa = dataset.mechanism_of_action;
            let target_type = dataset.target_type;
            // let accession = dataset.accessionm;
            let ref = dataset.ref_type;
            let targets = [];
            for (var i = 0; i < dataset.accessionm.split(",").length; i++) {
                targets[i] = (<a style={{  color: "#337ab7"}} className="data-button"
                               href={`https://www.uniprot.org/uniprot/${dataset.accessionm.split(",")[i]}`}>{dataset.accessionm.split(",")[i]}</a>);
            }
            return (
                <tr key={index}>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}} >
                       {moa}
                    </td>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}}>
                        {target_type}
                    </td>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}}>
                        {targets}
                    </td>
                    <td style={{fontSize: "0.8rem",padding: ".3rem"}}>
                        {ref}
                    </td>
                </tr>

            )
        });
        return ( this.state.totaldocuments > 0 ?
                <div >
                    <h5 style={{color:"#CC3300"}}>Pharmacology</h5>
                    <hr style={{borderTop: "1px solid #CC3300"}} />
                    <Table  bordered >
                        <thead>
                        <tr>
                            <th style={{width:"50%",fontSize: "0.8rem",padding: ".3rem"}}>Mechanism of action</th>
                            <th style={{width:"40%",fontSize: "0.8rem",padding: ".3rem"}}>Target Type</th>
                            <th style={{width:"10%",fontSize: "0.8rem",padding: ".3rem"}}>Targets</th>
                            <th style={{width:"10%",fontSize: "0.8rem",padding: ".3rem"}}>References</th>


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

export default Pharma;


