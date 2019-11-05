import React, { Component } from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';




class DatasetsTable extends Component {
    render() {

        let datasetItems;
        if(this.props.datasets){
            datasetItems = this.props.datasets.map(dataset => {
                let id = dataset.id;
                let title = dataset.datasetname;
                let assay = dataset.assayname;
                let center = "/media/icons/"+dataset.centerletter+".png";
                let area = dataset.technologies;
                let method = dataset.biologicalbucket;
                let datalevel = dataset.datalevels;
                let sourcelink = dataset.centerdatasetid;
                return (
                    <tr key={id}>

                        <td><a  style={{  color: "#337ab7"}} className="data-button" href={`/beta/datasets/${dataset.datasetid}`}>{title}</a></td>
                        <td ><img className="listcenterimage" src={center} role="presentation" />
                        </td>
                        <td>{assay}</td>
                        <td>{method}</td>
                        <td>{area}</td>
                        <td>{datalevel}</td>
                        <td>
                            <a className = "text-center name-header"
                               href={sourcelink}
                               style={{color:  "#337ab7"}}>
                                <i className="fa fa-external-link tile_icon"></i>
                            </a>
                            <a className = "text-center name-header"
                               href={sourcelink}
                               style={{color: "orange", marginLeft:".3em"}}>
                            <i className="fa fa-download tile_icon"></i>
                                </a>
                        </td>
                    </tr>

                )
            });
        }
        return (
            <div style={{marginTop:"2em"}}>
                <Table  bordered >
                    <thead>
                    <tr>
                        <th>Dataset</th>
                        <th>Center</th>
                        <th>Assay</th>
                        <th>Method</th>
                        <th>Subject Area</th>
                        <th>Data level</th>
                        <th>Actions</th>
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

export default DatasetsTable;