import React from "react";
import { connect } from "react-redux";
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal,Tabs,Tab} from 'react-bootstrap';
import ReactTable from "react-table";
import { withRouter } from 'react-router-dom';
import 'react-table/react-table.css'
import axios from 'axios'
import queryString from 'query-string';
import ModelSystemSearch from '../../components/modelSystems/ModelSystemSearch'
import KnockdownDetail from './KnockdownDetail'
import PerturbationFilter from './PerturbationFilter'
import PerturbationsSearch from './PerturbationsSearch'
import ReactPaginate from 'react-paginate'



let csl = { 'fontSize': '0.7em' };

var columns = [
    { Header: "Name", accessor: 'name'},
    { Header: "Perturbagen class", accessor: 'class' },
    { Header: "Reagent type", accessor: 'type' },
    { Header: "Subtype", accessor: 'subtype' },
    { Header: "Entrez id", accessor: 'entrez' },
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
    { Header: <img
        style={{maxHeight: "20px"}}
        src="/media/icons/Epigenomic_Icon.png"/>, accessor: 'e',Cell: (row) => {
        return <div><img height={15} src={row.original.e}/></div>
    }, width: 30}

];

let ids = [];
let idUrl ="";

class Knockdown extends React.Component {



    constructor(props){
        super(props);
        if(props.location.search){
            let params = queryString.parse(props.location.search)
            this.state = {
                key: 'SM',
                slicFrom:0,
                types:params.class,
                smiles:params.smiles,
                totalCount:1062,
                sids:[],
                id:'',
                page:0,
                selected: 0,
                text: params.term,
                signature: params.signature,
                data_table_perturbagens:[],
                ms:{},
                selectedButton:'Details',
                selectedId :'',
                cells:{},
                active:0,


            }
        }else {
            this.state = {
                slicFrom:0,
                types:'',
                smiles:'',
                sids:[],
                totalCount:1062,
                id:'',
                page:0,
                signatureIds:[],
                text:'MCF-10A',
                data:[],
                signature:'',
                selected: 0,
                data_table_perturbagens:[],
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


        axios.request({
            method: 'get',
            url: 'http://dev3.ccs.miami.edu:8080/sigc-api/nucleic-acid/fetch?limit=100&page=1&returnSignatures=false'
        }).then((response) => {
            let json_d = response.data.data;
        var gcol = "";
        var pcol = "";
        var bcol = "";
        var ecol = "";
        var icol = "";
        let json_m = Object.keys(json_d).map(function (key) {


            if (json_d[key].signature_category_count['gene expression'] != undefined) {
                gcol = "/media/icons/Circle_Perturbation.png";
            } else {
                gcol = "/media/icons/Circle_Unselected.png"
            }
            if (json_d[key].signature_category_count['proteomics'] != undefined) {
                pcol = "/media/icons/Circle_Perturbation.png";
            } else {
                pcol = "/media/icons/Circle_Unselected.png"
            }

            if (json_d[key].signature_category_count['epigenetic'] != undefined) {
                ecol = "/media/icons/Circle_Perturbation.png";
            } else {
                ecol = "/media/icons/Circle_Unselected.png"
            }




            return {
                "id": json_d[key].perturbagen_id ,
                "name": json_d[key].nucleic_acid_reagent_target_locus ? json_d[key].nucleic_acid_reagent_target_locus : json_d[key].name,
                "class": 'nucleic acid reagent',
                "subtype": json_d[key].nucleic_acid_reagent_subtype,
                "type": 'knockdown',
                "entrez": json_d[key].nucleic_acid_reagent_entrez_gene_id,
                "signature_category_count": json_d[key].signature_category_count,
                "g": gcol,
                "p": pcol,
                "e": ecol
            }
        });

        this.setState({data_table_perturbagens: json_m});

        if (this.state.data_table_perturbagens.length > 0) {
            console.log("passing this",this.state.data_table_perturbagens)

            this.changeShowModelSystem(this.state.data_table_perturbagens[0].id);
        }
    });

}



findId = (name) => {
    let ms =  this.state.data_table_perturbagens.find(ms => {

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

        // this.changeShowModelSystem(this.props.data[0].id);
    }




    return (

        <div >

        <div className="row">
    {this.state.data_table_perturbagens.length > 0 ?
<div className="col-3 details-panel" style={{minHeight:"30em"}}>
<div>
    {this.state.data_table_perturbagens.length > 0   ? <div>
    <ButtonToolbar>
    <ButtonGroup bsSize="large" >
        <Button className={this.state.selectedButton === 'Details' ? "ms_active" : "btn-default"}  onClick={() => {this.buttonSelected('Details')} }>
<i className="fa fa-info fa-1x" style={{    color:"gray" }}></i>

    <br/>
    <span style={{fontSize:"0.8em"}}>Details </span>
    </Button>
    {/* <Button  className={this.state.selectedButton === 'Filter' ? "ms_active" : " btn-default"}  onClick={() => {this.buttonSelected('Filter')}}>
<i className="fa fa-filter fa-1x" style={{    color:"gray" }}></i>
    <br/>
    <span style={{fontSize:"0.8em"}}> Filter </span>
    </Button>
    <Button  className={this.state.selectedButton === 'Search' ? "ms_active" : " btn-default"}  onClick={() => {this.buttonSelected('Search')}}>
<i className="fa fa-search fa-1x" style={{    color:"gray" }}></i>
    <br/>
    <span style={{fontSize:"0.8em"}}> Search </span>
    </Button> */}

    </ButtonGroup>
    </ButtonToolbar>
    </div> : '' }
    {this.state.data_table_perturbagens.length > 0  && this.state.selectedButton === 'Search' ?
    <div >

    <PerturbationsSearch></PerturbationsSearch>
    </div>
    :''
    }
    {this.state.data_table_perturbagens.length > 0  && this.state.selectedButton === 'Filter' ?
    <div >


    <PerturbationFilter></PerturbationFilter>
    </div>
    :''
    }
    {this.state.data_table_perturbagens !=''  && this.state.selectedButton === 'Details' ?
    <div >
        <KnockdownDetail showPerturbation={this.state.data_table_perturbagens[this.state.selected]}></KnockdownDetail>



    </div>
    :"" }
</div>
    </div>    :"" }
<div className="col-9" style={ csl }>
    {this.state.data_table_perturbagens.length > 0 ?   < ReactTable
    data={this.state.data_table_perturbagens}
    showPagination={true}
    columns={columns}
    minRows={1}
    getTdProps={(state, rowInfo, column, instance) => {
        return {
                onClick: (e) => {
                this.changeShowModelSystem(rowInfo["original"]["id"])
        this.setState({ selected: rowInfo.index})
    },
        style: {
            background: rowInfo.index === this.state.selected ? 'darksalmon' : 'white',
                color: rowInfo.index === this.state.selected ? 'white' : 'black'
        }
    }
    }
}


/> :
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

</div>
    </div>
    </div>
)

};
}



export default withRouter(Knockdown);
