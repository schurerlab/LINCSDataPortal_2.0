import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import DatasetSearch from '../../components/datasets/DatasetSearch';
import DatasetsTable from '../../components/datasets/DatasetsTable';
import Facets from '../../components/datasets/Facets';


class Datasets extends React.Component {
    constructor(){
        super();
        this.state = {
            datasets:[],
            facets:[],
            text:'*'
        }
    }

    componentDidMount(){
        this.getDatasets();
    }

    getDatasets(){
        axios.request({
            method:'get',
            url:'http://lincsportal.ccs.miami.edu/dcic/api/fetchdata?facet=assaydesignmethod,biologicalbucket,centername,assayname,biologicalprocess,projectname&limit=10&searchTerm='+this.state.text
        }).then((response) => {

            this.setState({datasets: response.data.results.documents}, () => {

            });
            this.setState({facets: response.data.results.facets}, () => {

            });
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChange(text){
        
        this.setState({text: text}, this.getDatasets());

        console.log(text);
    }

    render() {
        return (
            <div className="col-12">

                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <DatasetSearch onChange={this.handleChange.bind(this)} value={this.state.text} />

                        </Col>
                    </Row>


                    <Row>
                        <Col xs={3} md={3} lg={3}>
                            <Facets facets={this.state.facets} />
                        </Col>
                        <Col xs={9} md={9} lg={9}>
                        <DatasetsTable datasets={this.state.datasets} />
                        </Col>
                    </Row>

            </div>
        );
    }
}

export default Datasets;

