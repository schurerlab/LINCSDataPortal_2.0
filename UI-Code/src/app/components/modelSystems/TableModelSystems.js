import React from "react";
import { connect } from "react-redux";
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';
import ReactTable from "react-table";
import { withRouter } from 'react-router-dom';
import 'react-table/react-table.css'
import axios from 'axios'
import queryString from 'query-string';
import ModelSystemSearch from './ModelSystemSearch'
import ModelSystemFilter from './ModelSystemFilter'
import ModelSystemDetail from './ModelSystemDetail'
import ReactPaginate from 'react-paginate'
import SignatureSearch from '../../components/signatures/SignatureSearch';


let csl = { 'fontSize': '0.7em' };

var columns = [
    { Header: "Name", accessor: 'name' },
    { Header: "Organ", accessor: 'organ' },
    { Header: "Model Class System", accessor: 'model_system_class' },
    { Header: "Tissue", accessor: 'tissue' },

    { Header: <img
        style={{maxHeight: "20px"}}
        src="/media/icons/Gene_Expression_Icon.png"/>,
        accessor: 'g',
        Cell: (row) => {
            return <div><img height={15} src={row.original.g}/></div>
        },
        width: 30},
    {Header: <img
        style={{maxHeight: "20px"}}
        src="/media/icons/Protein_Expression_Icon.png"/>,
         accessor: 'p',
        Cell: (row) => {
            return <div><img height={15} src={row.original.p}/></div>
        }, width: 30},
    {Header: <img
        style={{maxHeight: "20px"}}
        src="/media/icons/Protein_Binding_Icon.png"/>, accessor: 'b',
        Cell: (row) => {
            return <div><img height={15} src={row.original.b}/></div>
        }, width: 30},
    { Header: <img
        style={{maxHeight: "20px"}}
        src="/media/icons/Epigenomic_Icon.png"/>, accessor: 'e',Cell: (row) => {
        return <div><img height={15} src={row.original.e}/></div>
    }, width: 30},
    { Header: <img
        style={{maxHeight: "20px"}}
        src="/media/icons/Cell_Phenotype_Icon.png"/>,
         accessor: 'i',Cell: (row) => {
        return <div><img height={15} src={row.original.i}/></div>
    }, width: 30}
];

class TableModelSystems extends React.Component {

    constructor(props){
        super(props);
        if(props.location.search){
            let params = queryString.parse(props.location.search)
            this.state = {
                types:params.class,
                sids:[],
                totalCount:5,
                id:'',
                page:0,
                selected: 0,
                text: params.term,
                signature: params.signature,
                data_table_modelsystems:[],
                ms:{},
                selectedButton:'Details',
                selectedId :'',
                cells:{},
                active:0,
                slicFrom:0,


            }
        }else {
            this.state = {
                slicFrom:0,
                types:'',
                sids:[],
                totalCount:5,
                id:'',
                page:0,
                signatureIds:[],
                text:'MCF-10A',
                data:[],
                signature:'',
                selected: 0,
                data_table_modelsystems:[],
                ms:{},
                selectedButton:'Details',
                selectedId :'',
                cells:{},
                active:0,

            }
        }

    }

    componentDidMount(){
        this.getData();
    }

    changeShowModelSystem(id) {
        // this.setState ({selectedId:id})


    }

    handlePageClick = (event) => {

        if (event.selected < 1 || event.selected > this.state.totalCount) {
            console.log("******"+event.selected)
            this.setState({page:event.selected,sids:[],active:event.selected,slicFrom:0}, () => {
                this.getData();
            });

        }else{
            this.setState({page:event.selected+1,sids:[],active:event.selected,slicFrom:event.selected+1*20}, () => {
                this.getData();
            });
        }

    }
    // handlePageClick = (event) => {
    //
    //     let pg =  event.selected;
    //     this.setState({page: pg,sids:[]}, () => {
    //         this.getData();
    //     });
    // }


    getData() {
        if(this.state.types!=''){
            axios.request({
                method:'get',
                url:'http://dev3.ccs.miami.edu:8080/sigc-api/search/exact?term='+this.state.text
            }).then((response) => {
                if (response.data.data[this.state.types]) {

                    response.data.data[this.state.types].map(type => {

                        this.state.sids.push (type.hit_object_id+"&");
                    })
                }
                // console.log(this.state.sids);
                this.setState({totalCount:this.state.sids.length/20})
                // let slicFrom = this.state.page*20;
                let idUrl ='id='+this.state.sids.slice(this.state.slicFrom,20+this.state.slicFrom).join('id=');

                axios.request({
                    method: 'get',
                    url: 'http://dev3.ccs.miami.edu:8080/sigc-api/cell-line/fetch-by-id?'+idUrl+'&returnSignatureIDs=false'
                }).then((response) => {

                    let json_d = response.data.data;
                    var gcol = "";
                    var pcol = "";
                    var bcol = "";
                    var ecol = "";
                    var icol = "";
                    let json_m = Object.keys(json_d).map(function (key) {


                        if (json_d[key].signature_category_count['gene expression'] != undefined) {
                            gcol = "/media/icons/Circle_model_System.png";
                        } else {
                            gcol = "/media/icons/Circle_Unselected.png"
                        }
                        if (json_d[key].signature_category_count['proteomics'] != undefined) {
                            pcol = "/media/icons/Circle_model_System.png";
                        } else {
                            pcol = "/media/icons/Circle_Unselected.png"
                        }
                        if (json_d[key].signature_category_count['binding'] != undefined) {
                            bcol = "/media/icons/Circle_model_System.png";
                        } else {
                            bcol = "/media/icons/Circle_Unselected.png"
                        }
                        if (json_d[key].signature_category_count['epigenetic'] != undefined) {
                            ecol = "/media/icons/Circle_model_System.png";
                        } else {
                            ecol = "/media/icons/Circle_Unselected.png"
                        }
                        if (json_d[key].signature_category_count['cell phenotype'] != undefined) {
                            icol = "/media/icons/Circle_model_System.png";
                        } else {
                            icol = "/media/icons/Circle_Unselected.png"
                        }

                        return {
                            "id": json_d[key].cell_line_id,
                            "name": json_d[key].cell_line_name,
                            "organ": json_d[key].organ,
                            "disease": json_d[key].disease.join(',').replace(/^(.{20}).+/, "$1…"),
                            "tissue": json_d[key].tissue ? json_d[key].tissue.join(',').replace(/^(.{20}).+/, "$1…") : null,
                            "signature_category_count" : json_d[key].signature_category_count,
                            "model_system_class": "cell line",
                            "g": gcol,
                            "p": pcol,
                            "b": bcol,
                            "e": ecol,
                            "i": icol
                        }
                    });

                    this.setState({data_table_modelsystems: json_m});


                    if (this.state.data_table_modelsystems.length > 0) {
                        this.changeShowModelSystem(this.state.data_table_modelsystems[0].id);

                    }
                });

            })
            
        }else {
            axios.request({
                method: 'get',
                url: 'http://dev3.ccs.miami.edu:8080/sigc-api/cell-line/fetch?limit=20&page='+this.state.page+'&returnSignatureIDs=false'
            }).then((response) => {

                let json_d = response.data.data;
                var gcol = "";
                var pcol = "";
                var bcol = "";
                var ecol = "";
                var icol = "";
                let json_m = Object.keys(json_d).map(function (key) {


                    if (json_d[key].signature_category_count['gene expression'] != undefined) {
                        gcol = "/media/icons/Circle_model_System.png";
                    } else {
                        gcol = "/media/icons/Circle_Unselected.png"
                    }
                    if (json_d[key].signature_category_count['proteomics'] != undefined) {
                        pcol = "/media/icons/Circle_model_System.png";
                    } else {
                        pcol = "/media/icons/Circle_Unselected.png"
                    }
                    if (json_d[key].signature_category_count['binding'] != undefined) {
                        bcol = "/media/icons/Circle_model_System.png";
                    } else {
                        bcol = "/media/icons/Circle_Unselected.png"
                    }
                    if (json_d[key].signature_category_count['epigenetic'] != undefined) {
                        ecol = "/media/icons/Circle_model_System.png";
                    } else {
                        ecol = "/media/icons/Circle_Unselected.png"
                    }
                    if (json_d[key].signature_category_count['cell phenotype'] != undefined) {
                        icol = "/media/icons/Circle_model_System.png";
                    } else {
                        icol = "/media/icons/Circle_Unselected.png"
                    }

                    return {
                        "id": json_d[key].cell_line_id,
                        "name": json_d[key].cell_line_name,
                        "organ": json_d[key].organ,
                        "disease": json_d[key].disease.join(',').replace(/^(.{20}).+/, "$1…"),
                        "tissue": json_d[key].tissue ? json_d[key].tissue.join(',').replace(/^(.{20}).+/, "$1…") : null,
                        "model_system_class": "cell line",
                        "signature_category_count" : json_d[key].signature_category_count,
                        "g": gcol,
                        "p": pcol,
                        "b": bcol,
                        "e": ecol,
                        "i": icol
                    }
                });

                this.setState({data_table_modelsystems: json_m});

                if (this.state.data_table_modelsystems.length > 0) {

                    this.changeShowModelSystem(this.state.data_table_modelsystems[0].id);
                }
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
        if(this.state.selectedButton!=key){
            this.setState({selectedButton: key })

        }


    }



    render() {

        if(this.state.selected===0){
            // console.log(this.state.selected)
            // this.changeShowModelSystem(this.props.data[0].id);
        }



        return (

            <div  >

<div className="row">
    {this.state.data_table_modelsystems.length > 0  ?
    <div className="col-3">
            <div className = "details-panel"  style={{minHeight:"30em"}}>
                {this.state.data_table_modelsystems.length > 0   ?
                    <div >
                <ButtonToolbar >
                    <ButtonGroup bsSize="large" >
                        <Button className={this.state.selectedButton === 'Details' ? "ms_active" : "btn-default"}  onClick={() => {this.buttonSelected('Details')} }>
                            <i className="fa fa-info fa-1x" style={{    color:"gray" }}></i>

                            <br/>
                            <span style={{fontSize:"0.8em"}}>Details </span>
                        </Button>
                        <Button  className={this.state.selectedButton === 'Filter' ? "ms_active" : " btn-default"}  onClick={() => {this.buttonSelected('Filter')}}>
                            <i className="fa fa-filter fa-1x" style={{    color:"gray" }}></i>
                            <br/>
                            <span style={{fontSize:"0.8em"}}> Filter </span>
                        </Button>
                        <Button  className={this.state.selectedButton === 'Search' ? "ms_active" : " btn-default"}  onClick={() => {this.buttonSelected('Search')}}>
                            <i className="fa fa-search fa-1x" style={{    color:"gray" }}></i>
                            <br/>
                            <span style={{fontSize:"0.8em"}}> Search </span>
                        </Button>

                    </ButtonGroup>
                </ButtonToolbar>
                        <br/>
            </div> : '' }
                {this.state.data_table_modelsystems.length > 0  && this.state.selectedButton === 'Search' ?
                    <div  >

                   

                        <ModelSystemSearch></ModelSystemSearch>
                        </div>
                    :''
                }
                {this.state.data_table_modelsystems.length > 0  && this.state.selectedButton === 'Filter' ?
                    <div >

                      

                        <ModelSystemFilter></ModelSystemFilter>
                    </div>
                    :''
                }
                {this.state.data_table_modelsystems !=''  && this.state.selectedButton === 'Details' ?
                    <div >

                        <ModelSystemDetail data={this.state.data_table_modelsystems[this.state.selected]} ></ModelSystemDetail>



                    </div>
                    :"" }
        </div>
     </div>
        : ''}
    <div className="col-9" style={ csl }>
                {this.state.data_table_modelsystems.length > 0 ?   < ReactTable
                    data={this.state.data_table_modelsystems}
                    columns={columns}
                    showPagination={false}
                    defaultPageSize={20}
                    minRows={1}
                    getTdProps={(state, rowInfo, column, instance) => {
                      return {
                      onClick: (e) => {
                      this.changeShowModelSystem(rowInfo["original"]["id"])
                          this.setState({ selected: rowInfo.index})
                      },
                        style: {
                          background: rowInfo.index === this.state.selected ? '#4CC189' : 'white',
                          color: rowInfo.index === this.state.selected ? 'white' : 'black'
                        }
                      }
                      }
                      }


                />   :
                    <Row xs={12} md={12} lg={12}>
                        <Col xs={4} md={4} lg={4}>

                        </Col>
                        <Col xs={4} md={4} lg={4}>
                            <div className="container-fluid center lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </Col>
                        <Col xs={4} md={4} lg={4}>

                        </Col>
                    </Row>
                }
        { this.state.data_table_modelsystems.length > 0 ?     <ReactPaginate
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



export default withRouter(TableModelSystems);
