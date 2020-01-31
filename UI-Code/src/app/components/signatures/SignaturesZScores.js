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

class SignaturesZScores extends React.Component {

    constructor(props){
        super(props);

        // var lincsSigIDs = props.data.map(el =>{
        //     return el.lincsSigID
        // });
        // var zScores = props.data.map(el =>{
        //     return el.zScores
        // });

        let columns = [
            {
                Header: 'Category',
                accessor: 'assay_category',
            },
            {
                Header: 'Assay',
                accessor: 'assay',
            },
            {
            Header: 'Perturbagen',
            accessor: 'pertname',
            },
            {
                Header: 'Cell Line',
                accessor: 'cellName',
            },
        
            {
                Header: 'Organ',
                accessor: 'organ',
                // filterable:true// String-based value accessors!
            },
            {
                Header: 'Time Point',
                accessor: 'timepoint',
            }
            ,
            {
                Header: 'Concentration',
                accessor: 'concentration',                
            }
        ];

        // var lincsSigIDs = props.data.map(el =>{
        //     return el.lincsSigID
        // });
        
        if (props.mode == "geneList") {
            columns.push({
                    Header: 'zScore',
                    accessor: 'zScore',          
                })
        } else {
            columns.push({
                Header: 'P Value',
                accessor: 'pValue',      
            })
            columns.push({
                Header: 'Similarity',
                accessor: 'similarity',   
            })
        }

        this.state = {
            dowloadLoading: false,
            slicFrom:0,
            types:'',
            sids:[],
            totalPages: 0,//Math.ceil(props.sigCount/20) || '',
            id:'',
            page:'0',
            signatureIds:[],
            // signatureIds: props.data,
            // sessionId: props.sessionId,
            sigCount: 0,//props.sigCount,
            centerIds: [],//lincsSigIDs,
            // iLincsData: props.data,
            iLincsMode: props.mode,
            // zScores: zScores,
            // text:'MCF-10A',
            data:[],
            // data: props.data,
            signature: this.rename('Gene Expressions'),
            selected: 0,
            data_table_modelsystems:[],
            ms:{},
            selectedButton:'Details',
            selectedId :'',
            cells:{},
            columns: columns,
            active:0,
            pages:[],
            showModal: false,
            downloadUrl:''
        }

    }

    componentDidMount(){
        // console.log("componentWillMount");
        // this.getDatasets();
        this.getDataPage(1);
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
        if (event.selected < 0 || event.selected > this.state.totalPages) {
            this.setState({page:event.selected,active:event.selected,slicFrom:0}, () => {
                //TODO:check if this is needed
                // this.getDatasets(); 
                this.getDataPage(1);               
            });

        }else{
            this.setState({page:event.selected,active:event.selected,slicFrom:(event.selected+1)*20}, () => {
                // this.getDatasets();
                this.getDataPage(event.selected+1);
            });
        }
        
    }

    downloadIds(){  

        let ids = "'"+this.state.signatureIds.join("&").replace(/,/g,'').replace(/&/g,"','")+"'";
        var blob = new Blob(["SELECT * FROM `bigquery-public-data.umiami_lincs.readout` where signature_id in ("+ids+")"], {type: "text/plain;charset=utf-8"});
        if (this.state.signatureIds){
            FileSaver.saveAs(blob, "GCP_query.txt");
        }



    }


    download() { 
        // console.log(this.state.signatureIds);        
        
        // let idUrl ='id='+this.state.signatureIds.slice(0,100).join('&id=');
        // if(this.state.signature=='cell phenotype'){
        //     window.open("http://dev3.ccs.miami.edu:8080/sigc-api/signature/fetch-by-id-download?onlyLandmarkGenes=false&"+idUrl,"_self");
        // }
        // window.open("http://dev3.ccs.miami.edu:8080/sigc-api/signature/fetch-by-id-download?includeMetadata=true&onlyLandmarkGenes=false&"+idUrl,"_self");
        this.setState({dowloadLoading:true});
        // this.setState({dowloadLoading:false});

        // http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/downloadSignatures

        axios.request({
            method:'get',
            withCredentials: true,
            url:'http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/downloadSignatures',
            responseType: 'blob'
        }).then((response) => {
        //     console.log(response);            
        //     this.setState({dowloadLoading:false});
        //     // this.setState({"perturbagenCount":response.data.data.perturbation,"modelSystemCount":response.data.data.cellLine});
        // })
            let blob = new Blob([response.data], { type: mimeType });
            saveAs(blob, "downloadedSigs.json");
            this.setState({dowloadLoading:false});
        })
        .catch(function (error) {
            console.log("_downloadWeb", error);
            this.setState({dowloadLoading:false});
        });;
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
            else if (input == 'Cell Viability') {
                return input.replace('Cell Viability', 'cell viability');
            }
        }
    }

    getDataPage(page) {        
        console.log("retriving signatures for page: ",page); 
        // this.setState({dowloadLoading:true});
        // document.body.style.cursor='wait';
        // console.log("getting sessionID: ",this.state.sessionId); 

        // axios.post('http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/concordance?limit=20&page='+(page),
        axios.request({
            method:'get',
            withCredentials: true,
            url:'http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/retrieveSignatures?limit=20&page='+page
        // })
        // axios.post('http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/retrieveSignatures?limit=20&page='+(page),
        // // {
        // //     // "mode" : "geneList",
        // //     // "mode" : "UpDn",
        // //     "mode" : this.state.mode,
        // //     "signatureProfile" : {
        // //         "genesUp" : this.state.up, 
        // //         "genesDown" : this.state.dn
        // //     }
        // // },
        // {},
        // {
        //     withCredentials: true,
        //     headers: {
        //         'Accept' : 'application/json',
        //         'Content-Type' : 'application/x-www-form-urlencoded'
        //     }
        }).then((response) => {
            console.log(response);
            if (response.data.data.length) {
                this.setState({ 
                    signatureIds: response.data.data,
                    sigCount: response.data.totalCount,
                    totalPages: Math.ceil(response.data.totalCount/20)
                }, () => {
                    // this.getStats(this.state.signatureIds);
                    // console.log(this.state.signatureIds);                
                    this.formatMedata(this.state.signatureIds);
                    this.getSummary();
                    this.getSigMetadata(this.state.signatureIds[0]);
                    // this.setState({dowloadLoading:true});
                 });            
                    // this.state.signatureIds = response.data.data;
                    // this.getStats(this.state.signatureIds);
                    // this.getSigMedata(this.state.signatureIds);
                // window.onload=function(){document.body.style.cursor='default';}
                // document.body.style.cursor='default'
            } else {
                console.log("empty page");
                // this.setState({dowloadLoading:true});
                // window.onload=function(){document.body.style.cursor='default';}
                // document.body.style.cursor='default'
            }          

        })       
    }

    getSigMedata(sigIds){
        // this.setState({totalPages:sigIds.length/20})
        let idUrl ='id='+sigIds.slice(this.state.slicFrom,20+this.state.slicFrom).join('&id=');
        // let idUrl ='id='+sigIds.join('&id=');
        let zScores = this.state.zScores;

        const iLincsData = this.state.iLincsData
        const iLincsMode = this.state.iLincsMode

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
                    "data_level":type.data_level ? type.data_level : '_',
                    "sig_id" : type['gene expression assay'] ? type['gene expression assay'][0].dataset_sample_id : ''
                };                
               datatable.push(smet);
            });

            datatable.forEach(function (value, i) {
                let sig = iLincsData.find( ({ lincsSigID }) => lincsSigID === value.sig_id );
               
                if (iLincsMode == "geneList") {
                    value.zScore = sig.zScores.toPrecision(3)
                } else {
                    value.pValue = sig.pValue.toExponential(2)
                    value.similarity = sig.similarity.toPrecision(3)
                    if (sig.pValue < 0.0001) {
                        value.pValue = sig.pValue.toExponential(2)
                    } else {
                        value.pValue = sig.pValue.toPrecision(3)
                    }
                }
            });

            this.setState({data:datatable})
        })

    }

    getStats(sigIds){

        let idUrl ='id='+sigIds.join('&id=');
        axios.request({
            method:'get',
            url:'http://dev3.ccs.miami.edu:8080/sigc-api/search/summary?'+idUrl            
        }).then((response) => {
            this.setState({"perturbagenCount":response.data.data.perturbation,"modelSystemCount":response.data.data.cellLine});
        })
    }
    
    getSummary(){
        
        // axios.post('http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/concordanceSummary',{},
        // {
        //     withCredentials: true,
        //     headers: {
        //         'Accept' : 'application/json',
        //         'Content-Type' : 'application/x-www-form-urlencoded'
        //     }
        axios.request({
            method:'get',
            withCredentials: true,
            url:'http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/resultsSummary'
        }).then((response) => {
            // console.log(response.data);
            // response needs signatureCount
            this.setState({"perturbagenCount":response.data.perturbation,"modelSystemCount":response.data.cellLine});
        })
    }   

    formatMedata(datatable) {
        const iLincsData = this.state.iLincsData
        const iLincsMode = this.state.iLincsMode
        
        datatable.forEach(function (value, i) {
            
            if (iLincsMode == "geneList") {
                value.zScore = Number(value.zScores).toPrecision(3)
            } else {

                try {
                    value.pValue = Number(value.pValue).toExponential(2)
                    if (value.pValue > 0.0001) {                    
                        value.pValue = Number(value.pValue).toPrecision(3)
                    }
                } catch (error) {
                    console.log(error);
                }
                try {
                    value.similarity = Number(value.similarity).toPrecision(3)
                } catch(error) {
                    console.log(error);
                }
                
            }
            // value.pertname = value.metadata.perturbagen
            value.pertname = value.metadata["small molecule"][0].name
            // value.assay_category = value.metadata.category
            value.assay_category = value.metadata.assay_category
            // value.assay = value.metadata.assay
            value.assay = value.metadata["gene expression assay"][0].generating_activity_name
            // value.cellName = value.metadata.cell
            value.cellName = value.metadata["cell line"][0].name
            // value.organ = value.metadata.organ
            value.organ = value.metadata["cell line"][0].organ
            // value.timepoint = value.metadata.timepoint
            value.timepoint = value.metadata["small molecule"][0].timepoint
            // value.concentration = value.metadata.concentration
            value.concentration = value.metadata["small molecule"][0].concentration
        });

        this.setState({data:datatable})
    }

    getDatasets() {

        this.setState({text:""})
        // this.getSigIds(this.state.centerIds);

        this.formatMedata(this.state.signatureIds);
        this.getSigMetadata(this.state.signatureIds[0])
        this.getSummary();

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

    getSigMetadata = (signature) => {

        axios.request({
            method:'get',
            url:'http://dev3.ccs.miami.edu:8080/sigc-api/signature/fetch-metadata?id='+signature.signature_id
        }).then((response) => {           

            response.data.data.map(type => {

            let sig_metadata = {
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
                    "data_level":type.data_level ? type.data_level : '_',
                    "sig_id" : type['gene expression assay'] ? type['gene expression assay'][0].dataset_sample_id : ''
                };                

            this.setState({ currentSignature: sig_metadata });
            });
        });
    }

    render() {

        const overlayClassName = this.state.showModal
            ? "modal fade show"
            : "modal fade";

        // if(this.state.selected===0){

        //     // this.changeShowModelSystem(this.props.data[0].id);
        // }

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

                                    {/* <SignaturePanel data={this.state.data[this.state.selected]} ></SignaturePanel> */}
                                    <SignaturePanel data={this.state.currentSignature} ></SignaturePanel>

                                </div>
                                :"" }
                        </div>
                    </div> : ''}
                    </div>
                    <div className="col-9" style={ csl }>
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
                                        <div className="filtered-by" style={{marginLeft:"0.6em",color:"orange"}}>{this.state.sigCount} Signatures</div> <div className="filtered-by" style={{marginLeft:"0.6em",color:"darksalmon"}}>{this.state.perturbagenCount} Perturbagens</div> <div className="filtered-by" style={{marginLeft:"0.6em",color:"#4CC189"}}>{this.state.modelSystemCount}  Model Systems</div>
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

                                    {this.state.totalPages > 5 ? <div><p>Your request exceeds the current download limit. You can obtain all signatures via the Google Cloud Platform (see Help>Tutorials>Data Access via GCP for instructions) <button className="btn btn-success center" style={{marginLeft:"0.6em"}} onClick={() => {this.downloadIds()}} > Download GCP Query</button></p> </div>: '' }


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
                            columns={this.state.columns}
                            defaultPageSize={20}
                            showPageSizeOptions={false}
                            minRows={1}
                            // filterable={true}
                            sortable={false}
                            showPagination={false}
                            // PaginationComponent={Pagination}
                            getTdProps={(state, rowInfo, column, instance) => {
                      return {
                      onClick: (e) => {
                        this.changeShowModelSystem(rowInfo["original"]["id"])
                        this.setState({ selected: rowInfo.index})
                        this.getSigMetadata(this.state.data[rowInfo.index])
                      },
                        style: {
                          background: rowInfo && rowInfo.index == this.state.selected ? 'orange' : 'white',
                          color: rowInfo && rowInfo.index == this.state.selected ? 'white' : 'black'
                        }
                      }
                      }
                      }
                        /> : <LoadingGrid />
                        }
{ this.state.data.length > 0 ?   <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'.......'}
                            breakClassName={'break-me'}
                            pageCount={this.state.totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={7}
                            onPageChange={this.handlePageClick.bind(this)} 
                            containerClassName={'pagination '}
                            subContainerClassName={'pages pagination'} 
                             activeClassName={'active'}
                            // activeLinkClassName={'btn-page'}
                            forcePage={this.state.active}
                        />   : '' }
                    </div>
                </div>
            </div>
        )

    };
}



export default withRouter(SignaturesZScores);
