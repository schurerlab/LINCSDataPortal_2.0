import React from "react";
import { connect } from "react-redux";
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal,OverlayTrigger,Popover,Tooltip} from 'react-bootstrap';
import ReactTable from "react-table";
import ReactModal from "react-modal";
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'react-table/react-table.css';
import axios from 'axios';
import queryString from 'query-string';
// import Pagination from "../functions/Pagination";
import LoadingGrid from '../common/LoadingGrid'
import SignaturePanel from './SignaturePanel'
import SignatureSearch from './SignatureSearch'
import SignatureFilter from './SignatureFilter'
import SignatureAppliedFilters from './SignatureAppliedFilters'
import { saveAs } from 'file-saver';


let FileSaver = require('file-saver');
let csl = { 'fontSize': '0.7em' };


const columns = [
    {
        Header: 'Category',
        accessor: 'assay_category',
        // filterable:true// String-based value accessors!
    },
    {
        Header: 'Assay',
        accessor: 'assay',
        // filterable:true
    },
    {
    Header: 'Perturbagen',
    accessor: 'pertname',
        // filterable:true
    },


    // {
    //     Header: 'MOA',
    //     accessor: 'mechanismOfAction'
    // },
    {
        Header: 'Cell Line',
        accessor: 'cellName',
        // filterable:true

    },

    {
        Header: 'Organ',
        accessor: 'organ',
        // filterable:true// String-based value accessors!
    },
    {
        Header: 'Time Point',
        accessor: 'timepoint',
        // filterable:true
    }
    ,
    {
        Header: 'concentration',
        accessor: 'concentration',
        // filterable:true
    }
];

class Signatures extends React.Component {

    constructor(props){
        super(props);
        if(props.location.search){
            let params = queryString.parse(props.location.search)
            this.state = {
                dowloadLoading: false,
                tags: [],
                types:params.class,
                sids:[],
                totalCount:'',
                id:'',
                page:'0',
                selected: 0,
                text: params.term ? params.term : 'MCF-10A',
                data:[],
                signature: this.rename(params.signature),
                data_table_modelsystems:[],
                ms:{},
                selectedButton:'Details',
                selectedId :'',
                cells:{},
                active:0,
                pages:[],
                showModal: false,
                downloadUrl:'',
                slicFrom:0
            }
        }else {
            this.state = {
                dowloadLoading: false,
                tags: [],
                slicFrom:0,
                types:'',
                sids:[],
                totalCount:'',
                id:'',
                page:'0',
                signatureIds:[],
                text:'MCF-10A',
                data:[],
                signature: this.rename('Gene Expressions'),
                selected: 0,
                data_table_modelsystems:[],
                ms:{},
                selectedButton:'Details',
                selectedId :'',
                cells:{},
                active:0,
                pages:[],
                showModal: false,
                downloadUrl:'',

            }
        }

    }





    componentDidMount(){
        
        this.getDatasets();
    }

    changeShowModelSystem(id) {
        this.buttonSelected('Details')
 


    }

    handleChange(text){

        if(text.length > 2){
            this.setState({text: text}, this.getDatasets());
        }



    }

    handlePageClick(event) {
        if (event.selected < 1 || event.selected > this.state.totalCount) {
            this.setState({page:event.selected,active:event.selected,slicFrom:0}, () => {
                this.getDatasets();
            });

        }else{
            this.setState({page:event.selected,active:event.selected,slicFrom:event.selected+1*20}, () => {
                this.getDatasets();
            });
        }
        
    }

    downloadIds(){
        let ids = "'"+this.state.signatureIds.toString().replace(/,/g,'').replace(/&/g,"','")+"'";
        var blob = new Blob(["SELECT * FROM `bigquery-public-data.umiami_lincs.readout` where signature_id in ("+ids+")"], {type: "text/plain;charset=utf-8"});
        if (this.state.signatureIds){
            FileSaver.saveAs(blob, "GCP_query.txt");
        }



    }


    download() {

        let idUrl ='id='+this.state.signatureIds.slice(0,100).join('id=');
        if(this.state.signature=='cell phenotype'){
            window.open("http://dev3.ccs.miami.edu:8080/sigc-api/signature/fetch-by-id-download?onlyLandmarkGenes=false&"+idUrl,"_self");
        }
        window.open("http://dev3.ccs.miami.edu:8080/sigc-api/signature/fetch-by-id-download?includeMetadata=true&onlyLandmarkGenes=false&"+idUrl,"_self");
        this.setState({dowloadLoading:true});
        this.setState({dowloadLoading:false});
    }



    rename(input){

        if (input!=null) {
            if (input == 'Gene Expressions') {
                return input.replace('Gene Expressions', 'gene expression');
            }
            else if (input == 'Gene Expression') {
                return input.replace('Gene Expression', 'gene expression');
            }
            else if (input == 'Proteomics') {
                return input.replace('Proteomics', 'proteomics');
            }
            else if (input == 'Protein Expression') {
                return input.replace('Protein Expression', 'proteomics');
            }
            else if (input == 'Protein binding') {
                return input.replace('Protein binding', 'binding');
            }
            else if (input == 'Protein Binding') {
                return input.replace('Protein Binding', 'binding');
            }
            else if (input == 'Epigenetic') {
                return input.replace('Epigenetic', 'epigenetic');
            }
            else if (input == 'Cell Phenotype') {
                return input.replace('Cell Phenotype', 'cell phenotype');
            }
            // else if (input == 'Cell Phenotype') {
            //     return input.replace('Cell Phenotype', 'cell viability');
            // }
            else if (input == 'Cell Viability') {
                return input.replace('Cell Viability', 'cell viability');
            }
        }
    }

    getSigMedata(sigIds){
        this.setState({totalCount:sigIds.length/20})
        let idUrl ='id='+sigIds.slice(this.state.slicFrom,20+this.state.slicFrom).join('id=');
        this.setState( {data:[]});
        axios.request({
            method:'get',
            url:'http://dev3.ccs.miami.edu:8080/sigc-api/signature/fetch-metadata?'+idUrl
        }).then((response) => {

            let datatable =[]

           response.data.data.map(type => {


                let smet = {
                    "id": type.signature_id,
                    "pertid":  type['small molecule'] ? type['small molecule'][0].perturbagenID :'',
                    "assay":  type['epigenetics assay'] ? type['epigenetics assay'][0].generating_activity_name : type['proteomics assay'] ? type['proteomics assay'][0].generating_activity_name : type['gene expression assay'] ? type['gene expression assay'][0].generating_activity_name : type['imaging'] ? type['imaging'][0].generating_activity_name : '-',
                    "pertname": type['small molecule'] ? type['small molecule'][0].name :  type['nucleic acid reagent'] ? type['nucleic acid reagent'][0].nucleic_acid_reagent_target_locus : type['protein perturbagen'][0].protein_perturbagen_name.toString() ? type['protein perturbagen'][0].protein_perturbagen_name.toString() : ''  ,
                    "pertClass": type['small molecule'] ? type['small molecule'][0].perturbationClass :  type['nucleic acid reagent'] ? type['nucleic acid reagent'][0].perturbationClass : '' ,
                     // "mechanismOfAction": type['small molecule'][0].mechanismOfAction ? type['small molecule'][0].mechanismOfAction.toString() :'',
                    "timepoint": type['small molecule'] ? type['small molecule'][0].timepoint: type['nucleic acid reagent'] ? type['nucleic acid reagent'][0].gettimepoint : type['protein perturbagen'][0].timepoint.toString() ? type['protein perturbagen'][0].timepoint.toString() : ''  ,
                    "timepointunit": type['small molecule'] ? type['small molecule'][0].timepointUnit: type['nucleic acid reagent'] ? type['nucleic acid reagent'][0].gettimepointUnit : '',
                    "concentration": type['small molecule']? type['small molecule'][0].concentration: type['nucleic acid reagent'] ? type['nucleic acid reagent'][0].getconcentration : type['protein perturbagen'][0].concentration.toString() ? type['protein perturbagen'][0].concentration.toString() : ''  ,
                    "concentrationunit": type['small molecule'] ? type['small molecule'][0].concentrationUnit: type['nucleic acid reagent'] ? type['nucleic acid reagent'][0].getconcentrationUnit : '',
                    "cellName": type['cell line'] ? type['cell line'][0].name :'-',
                    "organ": type['cell line'] ? type['cell line'][0].organ :'-',
                    "diseases": type['cell line']? type['cell line'][0].diseases :'-',
                    "cl_id": type['cell line']? type['cell line'][0].celllineID : '-',
                    "assay_category": type.assay_category ? type.assay_category : '_',
                    "dataset_id":type.dataset_id? type.dataset_id : '_',
                    "data_level":type.data_level ? type.data_level : '_'
                }
               datatable.push(smet);
                // this.state.data.push(smet)
            });
            // console.log(datatable.length)
            this.setState({data:datatable})
        })

    }

    getStats(sigIds){
        let idUrl ='id='+sigIds.join('id=');
        axios.request({
            method:'get',
            url:'http://dev3.ccs.miami.edu:8080/sigc-api/search/summary?'+idUrl
        }).then((response) => {
            this.setState({"perturbagenCount":response.data.data.perturbation,"modelSystemCount":response.data.data.cellLine});
        })
    }

    getDatasets() {


        if (this.state.text === "MCF-10A" && this.state.signature === "cell viability") {
            this.state.signatureIds = ["605673&","605674&","605675&","605676&","605677&","605678&","605679&","605680&","605681&","605682&","605683&","605684&","605685&","605686&","605687&","605688&","605689&","605690&","605691&","605692&","605693&","605694&","605695&","605696&","605697&","605698&","605699&","605700&","605701&","605702&"];
            // console.log(this.state.signatureIds.length);
            this.getStats(this.state.signatureIds);
            this.getSigMedata(this.state.signatureIds);

        }
        else if(this.state.text === "MCF-10A" && this.state.signature === "binding"){
            this.state.signatureIds = ["1&","2&","3&","4&","5&","6&","7&","8&","9&","10&","11&","12&","13&","14&","15&","16&","17&","18&","19&","20&","21&","22&","23&","24&","25&","26&","27&","28&","29&","30&","31&","32&","33&","34&","35&","36&","37&","38&","39&","40&","41&","42&","43&","44&","45&","46&","47&","48&","49&","50&","51&","52&","53&","54&","55&","56&","57&","58&","59&","60&","61&","62&","63&","64&","65&","66&","67&","68&","69&","70&","71&","72&","73&","74&","75&","76&","77&","78&","79&","80&","81&","82&","83&","84&","85&","86&","87&","88&","89&","90&","91&","92&","93&","94&","95&","96&","97&","98&","99&","100&","101&","102&","103&","104&","105&","106&","107&","108&","109&","110&","111&","112&","113&","114&","115&","116&","117&","118&","118169&","118170&","118171&","118172&","118173&","118174&","118175&","118176&","118177&","118178&","118179&","118180&","118181&","118182&","118183&","118184&","118185&","118186&","118187&","118188&","118189&","118190&","118191&","118192&","118193&","118194&","118195&","118196&","118197&","118198&","118199&","118200&","118201&","118202&","118203&","118204&","118205&","118206&","118207&","118208&","118209&","118210&","118211&","118212&","118213&","118214&","118215&","118216&","118217&","118218&","118219&","118220&","118221&","118222&","118223&","118224&","118225&","118226&","118227&","118228&","118229&","118230&","118231&","118232&","118233&","118234&","118235&","118236&","118237&","118238&","118239&","118240&","118241&","118242&","118243"];
            this.setState({text:""})
            // console.log(this.state.signatureIds.length);
            this.getStats(this.state.signatureIds);
            this.getSigMedata(this.state.signatureIds);
        }
        else {


            axios.request({
                method: 'get',
                url: 'http://dev3.ccs.miami.edu:8080/sigc-api/search/exact?term=' + this.state.text
            }).then((response) => {
                if (response.data.data.name) {
                    var ids = "";
                   let names = response.data.data.name;
                    let temp = names.find(obj => obj.preferred_term == this.state.text)
                    this.setState({
                        id: "id="+temp.hit_object_id,
                        types: temp.hit_object_class
                    });
                } else {
                    var ids = "";
                    for (var i = 0; i < response.data.data[this.state.types].length; i++) {

                        ids += "id=" + response.data.data[this.state.types][i].hit_object_id + "&"
                    }
                    this.setState({
                        id: ids,
                        types: response.data.data[this.state.types][0].hit_type
                    });

                }


                if (this.state.types === "small molecule" || this.state.types === "mechanism of action") {

                    axios.request({
                        method: 'get',
                        url: 'http://dev3.ccs.miami.edu:8080/sigc-api/small-molecule/fetch-by-id?' + this.state.id + '&returnSignatureIDs=true'
                    }).then((response) => {


                        this.setState(response.data.data.map(type => {
                            this.state.signatureIds = []

                            type.signature.map(sigids => {
                                if (sigids.assay_category === this.state.signature) {
                                    this.state.signatureIds.push(sigids.signature_id + "&")
                                }

                            })
                            // console.log(this.state.signatureIds.length);
                            this.getStats(this.state.signatureIds);
                            this.getSigMedata(this.state.signatureIds);
                        }));

                    })


                }
                // else if( this.state.signature === 'binding'){
                //     console.log("I am here")
                //     this.getSigMedata("id=1&id=2&id=3&id=4&id=5&id=6&id=7&id=8&id=9&id=10")
                // }
                else if (this.state.types === "cell line" || this.state.types === "disease") {


                    axios.request({
                        method: 'get',
                        url: 'http://dev3.ccs.miami.edu:8080/sigc-api/cell-line/fetch-by-id?' + this.state.id + '&returnSignatureIDs=true'
                    }).then((response) => {
                        this.setState(response.data.data.map(type => {
                            this.state.signatureIds = []


                            type.signature.map(sigids => {

                                if (sigids.assay_category === this.state.signature) {

                                    this.state.signatureIds.push(sigids.signature_id + "&")
                                }

                            })
                            // console.log(this.state.signatureIds.length);
                            this.getStats(this.state.signatureIds);
                            this.getSigMedata(this.state.signatureIds);
                        }));
                    });
                }


                else if (this.state.types == undefined) {


                    axios.request({
                        method: 'get',
                        url: 'http://dev3.ccs.miami.edu:8080/sigc-api/cell-line/fetch-by-id?' + this.state.id + '&returnSignatureIDs=true'
                    }).then((response) => {
                        this.setState(response.data.data.map(type => {
                            this.state.signatureIds = []


                            type.signature.map(sigids => {

                                if (sigids.assay_category === this.state.signature) {

                                    this.state.signatureIds.push(sigids.signature_id + "&")
                                }

                            })
                            // console.log(this.state.signatureIds.length);                            
                            this.getStats(this.state.signatureIds);
                            this.getSigMedata(this.state.signatureIds);
                        }));
                    });
                }


            }).catch((error) => {
                console.log(error);
            });

        }
    }






    findId = (name) => {

        let ms =  this.state.data_table_modelsystems.find(ms => {

            return ms.name == name
        })
        return ms.id

    }
    buttonSelected(key){
        if(key != 'Details'){
            this.setState({selected:''})
        }

        if(this.state.selectedButton!=key){
            this.setState({selectedButton: key })

        }


    }



    handleOpenModal = () => {

        this.setState({ showModal: true });
    };

    handleCloseModal = () => {

        this.setState({ showModal: false });
    };



    render() {



        const overlayClassName = this.state.showModal
            ? "modal fade show"
            : "modal fade";

        if(this.state.selected===0){

            // this.changeShowModelSystem(this.props.data[0].id);
        }



        return (

            <div  >
                <div>

                </div>

                <div className="row">
                <div className="col-3" >
                    <ButtonToolbar >
                        <ButtonGroup bsSize="medium" >
                            <Button className={this.state.selectedButton === 'Details' ? "ms_active" : "btn-default"}  onClick={() => {this.buttonSelected('Details')} }>
                                <i className="fa fa-info fa-2x" style={{    color:"gray" }}></i>

                                <br/>
                                <span style={{fontSize:"0.8em"}}>Details </span>
                            </Button>
                            <Button  className={this.state.selectedButton === 'Filter' ? "ms_active" : " btn-default"}  onClick={() => {this.buttonSelected('Filter')}}>
                                <i className="fa fa-filter fa-2x" style={{    color:"gray" }}></i>
                                <br/>
                                <span style={{fontSize:"0.8em"}}> Filter </span>
                            </Button>
                            <Button  className={this.state.selectedButton === 'Search' ? "ms_active" : " btn-default"}  onClick={() => {this.buttonSelected('Search')}}>
                                <i className="fa fa-search fa-2x" style={{    color:"gray" }}></i>
                                <br/>
                                <span style={{fontSize:"0.8em"}}> Search </span>
                            </Button>


                        </ButtonGroup>
                    </ButtonToolbar>
                     {this.state.data !='' ?   <div className="details-panel" style={{minHeight:"40em"}}>
                        <div>

                            {this.state.data !=''  && this.state.selectedButton === 'Search' ?
                                <div>


                                    <SignatureSearch></SignatureSearch>
                                </div>
                                :''
                            }
                            {this.state.data !=''   && this.state.selectedButton === 'Filter' ?

                                <div>


                                    <br/>
                                    <SignatureFilter></SignatureFilter>
                                </div>
                                :''
                            }
                            {this.state.data !=''  && this.state.selectedButton === 'Details' ?
                                <div >


                                    <SignaturePanel data={this.state.data[this.state.selected]} ></SignaturePanel>


                                </div>
                                :"" }
                        </div>
                    </div> : ''}
                    </div>
                    <div className="col-9" style={ csl }>
                        {/* <div className="row"> 
                            <div className="col-10" >
                                <SignatureAppliedFilters tags={[this.state.text,"MCF-7"]} type={this.state.signature} />
                            </div>                                                       
                        </div> */}
                        <div className="row">
                            <div className="col-10">
                                <div className="row">
                                    <div className="col-11" >
                                        {/* <div className="filtered-by"><b>Filtered by: </b></div> <div className="suggestion-chip" style={{marginLeft:"0.6em"}}>{this.state.text}</div> <div className="suggestion-chip" style={{marginLeft:"0.6em"}}>+</div> <div className="suggestion-chip" style={{marginLeft:"0.6em"}}>{this.state.signature}</div> */}
                                        <SignatureAppliedFilters tags={[this.state.text]} type={this.state.signature} />
                                    </div>
                                    <div className="col-11">
                                        { this.state.data !=''  > 0 ?
                                            <div>
                                        <div className="filtered-by"><b>Summary:</b> </div>
                                        <div className="filtered-by" style={{marginLeft:"0.6em",color:"orange"}}>{this.state.signatureIds.length} Signatures</div> <div className="filtered-by" style={{marginLeft:"0.6em",color:"darksalmon"}}>{this.state.perturbagenCount} Perturbagens</div> <div className="filtered-by" style={{marginLeft:"0.6em",color:"#4CC189"}}>{this.state.modelSystemCount}  Model Systems</div>
                                        </div>
                                                :''}
                                            </div>
                                </div>
                            </div>
                        <div className="col-1">
                            <Button
                                bsStyle="primary"
                                style={{fontSize:"0.8em"}}
                                onClick={this.handleOpenModal} >Download Signatures
                            </Button>
                            <ReactModal
                                className="modal-dialog modal-content"
                                bodyOpenClassName="modal-open"
                                overlayClassName={overlayClassName}
                                ariaHideApp={false}
                                isOpen={this.state.showModal}
                            >

                                <Modal.Body>
                                    <p>Depending on the number of records, the amount of time can vary to download.  Please check your local directory.</p>

                                    {this.state.totalCount > 5 ? <div><p>Your request exceeds the current download limit. You can obtain all signatures via the Google Cloud Platform (see Help>Tutorials>Data Access via GCP for instructions) <button className="btn btn-success center" style={{marginLeft:"0.6em"}} onClick={() => {this.downloadIds()}} > Download GCP Query</button></p> </div>: '' }


                                    {this.state.dowloadLoading === false ? <button className="btn btn-success center" style={{marginLeft:"0.6em"}} onClick={() => {this.download()}} > Download</button>
                                        :
                                        <Row>
                                        <Col xs={4} md={4} lg={4}>

                                        </Col>
                                        <Col xs={4} md={4} lg={4}>
                                            <div className="container-fluid center lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                        </Col>
                                        <Col xs={4} md={4} lg={4}>

                                        </Col>
                                    </Row>
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button bsStyle="danger" onClick={this.handleCloseModal}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </ReactModal>
                        </div>
                            </div>
                        { this.state.data !=''  > 0 ?
                            < ReactTable
                            data={this.state.data}
                            columns={columns}
                            defaultPageSize={20}
                            minRows={1}
                            // filterable={true}
                            showPagination={false}
                            // PaginationComponent={Pagination}
                            getTdProps={(state, rowInfo, column, instance) => {
                      return {
                      onClick: (e) => {
                      this.changeShowModelSystem(rowInfo["original"]["id"])
                          this.setState({ selected: rowInfo.index})
                      },
                        style: {
                          background: rowInfo.index === this.state.selected ? 'orange' : 'white',
                          color: rowInfo.index === this.state.selected ? 'white' : 'black'
                        }
                      }
                      }
                      }


                        />   : <LoadingGrid />
                        }
                        { this.state.data.length > 0 ?     <ReactPaginate 
                            previousLabel={'previous'} 
                            nextLabel={'next'} 
                            breakLabel={'.......'} 
                            breakClassName={'break-me'} 
                            pageCount={this.state.totalCount} 
                            marginPagesDisplayed={2} 
                            pageRangeDisplayed={7} 
                            onPageChange={this.handlePageClick.bind(this)} 
                            containerClassName={'pagination '} 
                            subContainerClassName={'pages pagination'} 
                             activeClassName={'active'} 
                            // activeLinkClassName={'btn-page'}
                            forcePage={this.state.active}
                        />     : '' }

                    </div>
                </div>
            </div>
        )

    };
}



export default withRouter(Signatures);
