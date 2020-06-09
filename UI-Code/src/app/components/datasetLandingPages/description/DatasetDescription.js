import React from 'react';
import {Grid, Col, Row, Well} from 'react-bootstrap';
import DatasetDownload from '../../../components/datasetLandingPages/DatasetDownload';
let csl = { 'fontSize': '0.8em' };
let perturbations = [];
let  modelsystems =[];

class DatasetDescription extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {



       let showCitation = function (ldsid,type) {
          // console.log("I am here")
        };
        let bibtext = function (ldsid,type) {
            // console.log("I am here")
        };
        let endnote = function (ldsid,type) {
            // console.log("I am here")
        };
        let ris = function (ldsid,type) {
            // console.log("I am here")
        };

        let otherInversitigator = "-";
        if(this.props.datasetinfo) {
            otherInversitigator = this.props.datasetinfo.screeninglabinvestigator;
        }

        let listItems;
        let msItems;
        let allItems = [];
        if (this.props.datasetinfo) {
            for (var i = 0; i < this.props.datasetinfo.counts.length; i++) {
                var split = this.props.datasetinfo.counts[i].split(':');
                if (split[0] == 'nar' || split[0] == 'smallmolecule') {
                    perturbations.push({"label": split[0], "count": split[1]});
                    allItems.push({"label": split[0], "y": parseInt(split[1])})
                } else if (split[0] == 'cellline' || split[0] == 'differentiatediPSC' || split[0] == 'primarycell' || split[0] == 'iPSC' ) {
                    modelsystems.push({"label": split[0], "count": split[1]})
                    allItems.push({"label": split[0], "y": parseInt(split[1])})
                }

            }

            listItems = perturbations.map((d) =>
                <button className="btn d-flex w-100" key={d.label}
                        style={{  color:'gray'  }}>
                    <div className="col-md-4" style={{ textAlign: 'right' }}>
                        <div style={csl}><b> {d.count} </b></div>
                    </div>
                    <div className="col-md-8" style={{ textAlign: 'left' }}>
                        <div style={csl}> {d.label}</div>
                    </div>
                </button>
            );
            msItems = modelsystems.map((d) =>
                <button className="btn d-flex w-100" key={d.label}
                        style={{  color:'gray'  }}>
                    <div className="col-md-4" style={{ textAlign: 'right' }}>
                        <div style={csl}><b> {d.count} </b></div>
                    </div>
                    <div className="col-md-8" style={{ textAlign: 'left' }}>
                        <div style={csl}> {d.label}</div>
                    </div>
                </button>
            );
        }

        return (
            <div>
                {this.props.datasetinfo ?


        <div className="row" style={csl}>

            <div className="col-9">
                     <div className="row">
                            <Col xs={2} md={2} lg={2} className="pull-right"> 
                                <b>LINCS ID</b>   
                            </Col> 
                            <Col xs={10} md={10} lg={10} className="pull-left"> 
                                {this.props.datasetinfo.datasetgroup}:  {String(this.props.datasetinfo.datasetlevels)}
                            </Col>
                            <div className="separator "></div>
                            <Col xs={2} md={2} lg={2}>
                                <b>Dataset Name</b>
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                                {this.props.datasetinfo.datasetname}
                            </Col>
                            <div className="separator"></div>
                            <Col xs={2} md={2} lg={2}>
                            <b>Center</b>
                        </Col>
                            <Col xs={10} md={10} lg={10}>
                                <a href={`${this.props.datasetinfo.centerurl}`} target="_blank">{this.props.datasetinfo.centerfullname}</a>
                            </Col>
                            <div className="separator"></div>

                            <Col xs={2} md={2} lg={2}>
                                <b>Principal Investigator</b>
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                                {this.props.datasetinfo.principalinvestigator}
                            </Col>
                            <div className="separator"></div>


                            <Col xs={2} md={2} lg={2}>
                                <b>Other Investigator</b>
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                                {otherInversitigator}
                            </Col>
                            <div className="separator"></div>

                            <Col xs={2} md={2} lg={2}>
                                <b>Funding</b>
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                                {String(this.props.datasetinfo.funding)}
                            </Col>
                            <div className="separator"></div>

                            <Col xs={2} md={2} lg={2}>
                            <b>Description</b>
                        </Col>
                            <Col xs={8} md={8} lg={8}>
                                <p>
                                    {this.props.datasetinfo.description}
                                </p>
                            </Col>
                            <div className="separator"></div>

                            <Col xs={2} md={2} lg={2}>
                                <b>Data Source</b>
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                                <a href={`${this.props.datasetinfo.centerdatasetid}`}>
                                    {String(this.props.datasetinfo.centerdatasetid)}
                                    <span ><i className="fa fa-external-link "   aria-hidden="true"></i></span>
                                </a>
                            </Col>
                            <div className="separator"></div>

                            <Col xs={2} md={2} lg={2}>
                                <b>Release Date</b>
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                                {String(this.props.datasetinfo.datereleased)}
                            </Col>
                            <div className="separator"></div>


                            <Col xs={2} md={2} lg={2}>
                                <b>Processing Pipeline</b>
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                                <a href={`${this.props.datasetinfo.pipeline}`} target="_blank"> {this.props.datasetinfo.pipeline} </a>
                            </Col>
                            <div className="separator"></div>



                            <Col xs={2} md={2} lg={2}>
                                <b>Citation</b>
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                                <a href={`${this.props.datasetinfo.dockerized_container}`} target="_blank"> {this.props.datasetinfo.dockerized_container} </a>
                            </Col>
                            <div className="separator"></div>


                            <Col xs={2} md={2} lg={2}>
                                <b>Dockerized Containers</b>
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                                <div >
                                    <button className="btn btn-default btn-sm" onClick={showCitation(this.props.datasetinfo.datasetgroup,'collection')} >Cite</button>
                                    <i>To cite a specific dataset / level go to the </i>
                                </div>
                                <div> Export:
                                    <button className=" btn btn-danger btn-sm label label-default  label-margin"   onClick={bibtext(this.props.datasetinfo.datasetgroup,'bibtex')}>BibTeX (.bib) </button>
                                    <button className=" btn btn-success btn-sm label label-default label-margin"   onClick={ris(this.props.datasetinfo.datasetgroup,'ris','collection')}>RIS (.ris) </button>
                                    <button className=" btn btn-primary btn-sm  label label-default label-margin"   onClick={endnote(this.props.datasetinfo.datasetgroup,'enw','collection')}>EndNote (.enw) </button>
                                </div>
                            </Col>
                            <div className="separator"></div>

                            <Col xs={2} md={2} lg={2}>
                                <b>Publications</b>
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                                PMID:<a href={`http://www.ncbi.nlm.nih.gov/pubmed/${this.props.datasetinfo.publication}`}> </a>{String(this.props.datasetinfo.publication)}
                            </Col>
                            <div className="separator"></div>

                            <Col xs={2} md={2} lg={2}>
                                <b>Assay Name</b>
                            </Col>
                            <Col xs={10} md={10} lg={10}>
                               {String(this.props.datasetinfo.assayname)}
                            </Col>
                            <div className="separator"></div>


                            <Col xs={2} md={2} lg={2}>
                                <b>Assay Description</b>
                            </Col>
                            <Col  xs={8} md={8} lg={8}>
                                <p>
                                    {String(this.props.datasetinfo.assayoverview)}
                                </p>
                            </Col>
                            <div className="separator"></div>


                            <Col xs={2} md={2} lg={2}>
                                <b>Assay Protocol</b>
                            </Col>
                            <Col  xs={10} md={10} lg={10}>
                               <span >
                       <a href={`http://lincsportal.ccs.miami.edu/dcic/api/download?path=Protocols&file=${String(this.props.datasetinfo.datasetid)}_Protocol.pdf`}>
                     <i className="fa fa-file-pdf-o fa-3x" aria-hidden="true"></i>
                       </a>
                    </span>
                            </Col>
                            <div className="separator"></div>

                            <Col xs={2} md={2} lg={2}>
                                <b>Keywords</b>
                            </Col>
                            <Col  xs={10} md={10} lg={10}>
                                <div className="col-md-10 pull-left">
                                    <a href={`/datasets/#?query=biologicalbucket:${this.props.datasetinfo.biologicalbucket }`} target="_blank" className="link-white"> <span className="label label-danger"> {String(this.props.datasetinfo.biologicalbucket )}</span></a>
                                    <a href={`datasets/#?query=assaydesignmethod:${this.props.datasetinfo.assaydesignmethod }`}  target="_blank" className="link-white"> <span className="label label-danger">{String(this.props.datasetinfo.assaydesignmethod )}</span></a>
                                    <a href={`/datasets/#?query=biologicalprocess:${this.props.datasetinfo.biologicalprocess }`}   target="_blank" className="link-white"> <span className="label label-danger">{String(this.props.datasetinfo.biologicalprocess)}</span></a>
                                    <a href={`/datasets/#?query=endpointcategorization:${this.props.datasetinfo.endpointcategorization }`} target="_blank" className="link-white"><span className="label label-danger">{String(this.props.datasetinfo.endpointcategorization)}</span></a>
                                    <span ><i className="fa fa-external-link "   aria-hidden="true"></i></span>

                                </div>
                            </Col>
                            <div className="separator"></div>

                         <Col xs={2} md={2} lg={2}>
                             <b>Download</b>
                         </Col>
                         <Col  xs={10} md={10} lg={10}>
                            <DatasetDownload datasetinfo={this.props.datasetinfo}/>

                         </Col>
                         <div className="separator"></div>

                      </div>


        </div>
            <div className="col-3" style={{ border: "0.1px solid #bdc3c7",minHeight:"10em"}}>
                <br/>
                <div className="col-md-9 mx-auto" style={{ color: '#CC3300' }}>
                    <img className="img-fluid" style={{ maxWidth: '20%' }} src="/media/icons/Perturbation.png" /> Perturbations
                </div>
                {listItems}
                <div className="col-md-9 mx-auto" style={{ color: '#4CC189' }}>
                    <img className="img-fluid" style={{ maxWidth: '20%' }} src="/media/icons/Model_System.png" />  Model Systems
                </div>
                {msItems}

            </div>

                </div> : '' }
        </div>


                );
    }
}

export default DatasetDescription;
