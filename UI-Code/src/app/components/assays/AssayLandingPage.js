import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'
import ReagentDatasets from "../../components/datasets/ReagentDatasets"
import BarChart from '../../components/assays/BarChart';
let csl = { 'fontSize': '0.7em' };
let perturbations = [];
let  modelsystems =[];

class AssayLandingPage extends React.Component {


    constructor(props){

        super(props);
        this.state = {
            temp: "datasetid:"+this.props.id+" OR datasetgroup:"+this.props.id+ " OR datasetlevels:"+this.props.id,
            assayinfo:[],
            datasetsId:"",
            datsets:"",
            notfound: false
        }
    }



    componentWillUnmount() {
        let newTitle = document.querySelector('title')
        newTitle.innerHTML = "Assay Landing Page"
    }

    componentWillMount(){
        this.getDatasetInfo();
    }


    getDatasetInfo(){
        axios.request({
            method:'get',
            url:'http://lincsportal.ccs.miami.edu/dcic/api/fetchassayinfo?searchTerm=entityId:'+this.props.id
        }).then((response) => {
            this.setState({datasetinfo: response.data.results.documents[0]}, () => {


            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        if (this.state.datasetinfo) {
            let sp = this.state.datasetinfo
            let title = document.querySelector('title')
            title.innerHTML = `${sp.Name}`


        }
        let listItems;
        let msItems;
        let allItems = [];
        if (this.state.datasetinfo) {
            for (var i = 0; i < this.state.datasetinfo.counts.length; i++) {
                var split = this.state.datasetinfo.counts[i].split(':');
                if (split[0] == 'Nucleic Acid Reagent' || split[0] == 'Small Molecule') {
                    perturbations.push({"label": split[0], "count": split[1]});
                    allItems.push({"label": split[0], "y": parseInt(split[1])})
                } else if (split[0] == 'Cell Line' || split[0] == 'Differentiated Cell' || split[0] == 'Embryonic Stem Cell' || split[0] == 'iPSC' || split[0] == 'Primary Cell') {
                    modelsystems.push({"label": split[0], "count": split[1]})
                    allItems.push({"label": split[0], "y": parseInt(split[1])})
                }

            }
             listItems = perturbations.map((d) =>
                <button className="btn d-flex w-100"
                        style={{  color:'gray'  }}>

                    <div className="col-md-10" style={{ textAlign: 'left' }}>
                        <div style={csl}> {d.label}</div>
                    </div>
                    <div className="col-md-2" style={{ textAlign: 'right' }}>
                        <div style={csl}><b> {d.count} </b></div>
                    </div>
                </button>

            );
            msItems = modelsystems.map((d) =>
                <button className="btn d-flex w-100"
                        style={{  color:'gray'  }}>

                    <div className="col-md-10" style={{ textAlign: 'left' }}>
                        <div style={csl}> {d.label}</div>
                    </div>
                    <div className="col-md-2" style={{ textAlign: 'right' }}>
                        <div style={csl}><b> {d.count} </b></div>
                    </div>
                </button>

            );
    }






// console.log(listItems);


        return (
            <div style={ csl } className="container-fluid">
            { this.state.datasetinfo ? <div  >
               <div>
                    <h3  className="text-center title-small"
                         style = {{marginBottom: "40px"}}>{this.state.datasetinfo.Name}
                    </h3>
                   <div className = "text-left details-header-font">Metadata</div>
                    <hr style={{borderTop: "1px solid gray"}} />
                   <div className="row">
                       <div className="col-9">
                           <div >
                           <span  className="col-2  pull-left  "><b>Assay Name: </b></span>
                              <span className="col-10 pull-right"> {this.state.datasetinfo.Name}
                           </span>
                               </div>
                           <div className="separator"></div>
                           <div>
                           <span  className="col-2 pull-left"><b>Center :</b> </span>
                           <span className="col-10 pull-right">{this.state.datasetinfo.center_name.toString()}</span>
                               </div>
                           <div className="separator"></div>
                           <div>
                          <span  className="col-2 pull-left"><b>Subject Area :</b> </span>
                           <span className="col-10 pull-right">{this.state.datasetinfo.area_of_study}</span>
                               </div>
                           <div className="separator"></div>
                           <div>
                          <span  className="col-2 pull-left"><b>Biological process :</b>
                          </span>
                           <span className="col-10 pull-right"> {this.state.datasetinfo.biological_process}</span>
                               </div>
                           <div className="separator"></div>
                           <div>
                          <span  className="col-2 pull-left"><b>Assay Description :</b>
                          </span>
                              <span className="col-10 pull-right"> {this.state.datasetinfo.description}
                           </span>
                        </div>

                           <div className="separator"></div>
                           <div>
                           <span  className="col-2 pull-left"><b>References :</b> </span>
                           <span className="col-10  pull-right"> <a href={this.state.datasetinfo.reference} target="_blank">{this.state.datasetinfo.reference}</a>
                            </span>
                               </div>
                           <div className="separator"></div>
                       </div>


                           <div className="col-3" style={{ border: "0.1px solid #bdc3c7",minHeight:"10em"}}>
                               <br/>
                               <div className = "text-center details-header-font">Summary</div>
                               <br/>
                               <div className="col-md-12 mx-auto" style={{ color: '#CC3300' }}>
                                   <img className="img-fluid" style={{ maxWidth: '15%' }} src="/media/icons/Perturbation.png" /> Perturbations
                               </div>
                               {listItems}
                               <br/>
                               <div className="col-md-12 mx-auto" style={{ color: '#4CC189' }}>
                                   <img className="img-fluid" style={{ maxWidth: '15%' }} src="/media/icons/Model_System.png" />  Model Systems
                               </div>
                               {msItems}
                               <br/>
                               <div className="col-md-12 mx-auto" style={{ color: '#FF9900' }}>
                                   <img className="img-fluid" style={{ maxWidth: '15%' }} src="/media/icons/Signatures.png" />  Datasets
                               </div>

                                   <button className="btn d-flex w-100"
                                           style={{  color:'gray'  }}>
                                       <div className="col-md-10" style={{ textAlign: 'left' }}>
                                           <div style={csl}> Datasets </div>
                                       </div>
                                       <div className="col-md-2" style={{ textAlign: 'right' }}>
                                           <div style={csl}><b>   {this.state.datasetinfo.dataset_count} </b></div>
                                       </div>

                                   </button>
                           </div>

                   </div>

                   <ReagentDatasets id={'assayname:"'+this.state.datasetinfo.Name} />
                </div>
                <div>{}</div>
                </div>

                : '' }
            </div>
        );
    }
}

export default AssayLandingPage;

