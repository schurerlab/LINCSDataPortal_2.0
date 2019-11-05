import React from 'react'
import { connect } from 'react-redux'
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';
import BarChart from '../../components/assays/BarChart';
import { saveAs } from 'file-saver';


let FileSaver = require('file-saver');

class SignaturePanel extends React.Component {

    download() {
        if(!this.props.data){

        }else{

            let url="http://dev3.ccs.miami.edu:8080/sigc-api/signature/fetch-metadata?id="+this.props.data.id

            FileSaver.saveAs(url, "Signature_meatadata.json");
        }
    }

    downloadData() {
        if(!this.props.data){

        }else{
            let url="http://dev3.ccs.miami.edu:8080/sigc-api/signature/fetch-by-id?includeMetadata=false&onlyLandmarkGenes=false&id="+this.props.data.id

            FileSaver.saveAs(url, "Signature_data.json");
        }
    }

    render() {
        if (!this.props.data) {
            return null
        } else {

            let ms = this.props.data



            return (
                <div>
                    {ms ? <div>

                        <div className = "text-center details-header-font">Signature Details</div>

                        <div className = "properties-header"
                             style={{color: "#CC3300"}}>
                            Perturbation
                        </div>
                        <hr style={{borderTop: "1px solid #CC3300"}}/>
                        <div className="body-text">
                            <span><b>Category: </b>{this.props.data.pertClass}</span><br/>
                            <span><b>Name: </b> <a href={`/beta/perturbations/${this.props.data.pertid}`}>{this.props.data.pertname} </a></span><br/>
                            <span><b>MOA: </b> {this.props.data.mechanismOfAction}</span><br/>

                            <span><b>Timepoint: </b>{this.props.data.timepoint} ({this.props.data.timepointunit})</span><br/>
                            <span><b>Concentration: </b>{this.props.data.concentration}  ({this.props.data.concentrationunit})</span><br/>

                            <div className="properties-header" style= {{color: "green"}}>Model Systems</div>
                            <hr style={{borderTop: "1px solid green"}}/>

                            <span><b>Category: </b>Cell Line</span><br/>
                            <span><b>Name: </b> <a href={`/beta/models/${this.props.data.cl_id}`}>{this.props.data.cellName} </a></span><br/>
                            <span><b>Organ: </b> {this.props.data.organ}</span><br/>

                            <span><b>Diseases: </b> </span><br/>

                            <div className="properties-header" style= {{color: "orange"}}>Signature</div>
                            <hr style={{borderTop: "1px solid orange"}}/>

                            <span ><b>Category: </b></span><span style={{marginLeft:"1em"}} >{this.props.data.assay_category}</span><br/>
                            <span ><b>Assay: </b></span><span  style={{marginLeft:"2.5em"}}><a href={`/beta/assays/${this.props.data.assay ==="P100 Assay" ? "13" : this.props.data.assay ==="L1000 Assay" ? "2" : this.props.data.assay ==="GCP Assay" ? "18" :this.props.data.assay ==="Fluorescence imaging cell viability" ? "27": this.props.data.assay ==="MEP Processing" ? "19":""}`}>{this.props.data.assay}</a></span><br/>
                            <span  ><b>Dataset: </b></span><span  style={{marginLeft:"1.6em"}}><a href={`/beta/datasets/${this.props.data.dataset_id }`}>{this.props.data.dataset_id}</a></span><br/>
                            <span ><b>Data Level: </b></span><span style={{marginLeft:"0.6em"}} >{this.props.data.data_level}</span><br/>

                            <span><b>Download :  </b></span><span><button className="btn btn-primary  btn-sm" style={{marginLeft:"0.6em"}} onClick={() => {this.download()}} > Metadata</button></span><span><button className="btn btn-primary btn-sm " style={{marginLeft:"0.6em"}} onClick={() => {this.downloadData()}}> Data</button></span><br/>

                        </div>

                    </div>
                        : ''}
                </div>


            )
        }
    }
}


export default SignaturePanel
