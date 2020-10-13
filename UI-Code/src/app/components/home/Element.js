import React,{Component} from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
let csl = { 'fontSize': '0.8em' };
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Router, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import {Item} from '../signatures/Item';


let syn;
class Element extends Component {


    constructor(props) {

        // const provider = Context;

        super(props);
        this.state = {
            id:"",
            loading:true,
            url:"",
            
        }
        this.handleSerice = props.handleChange;
        console.log(props)
    }

   
    // const provider = useContext(Context);



    getLincsID (k,type,cat){

        let findID = `http://dev3.ccs.miami.edu:8080/sigc-api/search/exact?term=${k}`;
        let id;
        let objectid;
        let objectType;
        let url;
        axios
            .get(findID)
            .then((res) => {
                objectid =res.data.data.name[0].hit_object_id;
                objectType = res.data.data.name[0].hit_object_class;
               let linsId = `http://dev3.ccs.miami.edu:8080/sigc-api/search/identifiers?id=${objectid}&object_class=${objectType}`;
                    axios
                        .get(linsId)
                        .then((r) => {

                         id = r.data.data[0]['LINCS Data Portal'].toString();
                        })


            })
        if(type==='Small Molecules' && cat === 'name' && id.length > 1){
            url = 'http://lincsportal.ccs.miami.edu/SmallMolecules/view/'+id;
            return 'http://lincsportal.ccs.miami.edu/SmallMolecules/view/'+id;

        }
    }



    handleSearch(e,k,type,cat) {

        let url;
        if(type==="Cell line" && cat==="organ/tissue"){

            url= "/signatures/models?type="+type+"&class="+cat+"&term="+ k
            window.open(url,'_self');
        }
        if(type==="Cell line" && cat==="name"){
            let findID = `http://dev3.ccs.miami.edu:8080/sigc-api/search/exact?term=${k}`;
            let objectid;
            let objectType;
            var id;
            axios
                .get(findID)
                .then((res) => {
                    objectid =res.data.data.name[0].hit_object_id;
                    url= "/signatures/models/"+objectid;
                    window.open(url,'_self');

                })
        }
        if(type==="Cell line" && cat==="disease"){
            url= "/signatures/models?type="+type+"&class="+cat+"&term="+ k
            window.open(url,'_self');
        }
        if(type==="Small Molecules" && cat==="mechanism of action"){
            url= "/signatures/perturbations?type="+type+"&class="+cat+"&term="+ k
            window.open(url,'_self');
        }
        if(type==="Small Molecules" && cat==="small molecule target"){
                url= "/signatures/perturbations?type="+type+"&class="+cat+"&term="+ k
                window.open(url,'_self');
        }
        if(type==="Small Molecules" && cat==="name"){
        
            let findID = `http://dev3.ccs.miami.edu:8080/sigc-api/search/exact?term=${k}`;
            let objectid;
            let objectType;
            var id;
            axios
                .get(findID)
                .then((res) => {
                    var data= res.data.data.name;
                    function findIndex(jsonData, findThis){
                        var indexNum = data.findIndex(obj => obj.preferred_term == findThis);
                        objectid =res.data.data.name[indexNum].hit_object_id;
                        url= "/signatures/perturbations/"+objectid;
                        window.open(url,'_self');
                    }
                    findIndex(data, k);
                })
        }
        if(type==="Gene Expression" ){

            <Item term={k} cls={cat} type={type}></Item>

            url= "/signatures/signatures"
            window.open(url,'_self');
        }
        if(type==="Protein Expression" ){

            url= "/signatures/signatures?signature="+type+"&class="+cat+"&term="+ k
            window.open(url,'_self');
        }
        if(type==="Assay" ){

            url= "/signatures/assays?class="+cat+"&term="+ k
            window.open(url,'_self');
        }
        if(type==="Epigenetic" ){

            url= "/signatures/signatures?signature="+type+"&class="+cat+"&term="+ k
            window.open(url,'_self');
        }
        if(type==="Protein binding" ){

            url= "/signatures/signatures?signature="+"Protein Binding"+"&class="+cat+"&term="+ k
            window.open(url,'_self');
        }
        if(type===undefined){
            url= "/signatures/signatures?signature="+'Gene Expression'+"&class="+cat+"&term="+ k
            window.open(url,'_self');
        }
        e.preventDefault();
        if(this.state.url.length > 1){
            // window.open(this.state.url,'_blank');
        }

    }


    rename(input){
        if (input == 'Cell line') {
            return input.replace('Cell line', 'cell line');
        }else if (input == 'Small Molecules') {
            return input.replace('Small Molecules', 'small molecule');
        }
    }
  showText(e,type,k) {



      axios.request({
          method:'get',
          url:'http://dev3.ccs.miami.edu:8080/sigc-api/search/synonyms?class='+this.rename(this.props.type)+'&preferred_term='+k
      }).then((response) => {
          let synonyms_temp =response.data.synonyms[k];
          let q = e
          this.setState({syn:synonyms_temp.find(a =>a.toLowerCase().includes(e.toLowerCase()))})
      })
}
    hideText(e,type,k) {
        this.setState({syn:''})


}

    render() {


        let url;



        let items;
        if (this.props.facets) {



            items = Object.entries(this.props.facets).map(([key,value])=> {

                return (

                    <div className="col-12" style={{marginLeft:0,fontSize:"0.8rem",padding:"0",textAlign: "left",fontWeight:"200",color:"gray"}} key={key}>
                        {value > 0 ?
                        <button className="d-flex w-100 btn-inde" onClick={(e) => {this.handleSearch(e,key,this.props.type,this.props.cat)}}    style={{ borderColor: 'white' }}>

                        {key}  {key.includes()}

                            { this.props.query ?
                            <a className="titip-right" >

                    <span className="titip-content thick-border" style={{fontSize:"0.8em"}}>
                        {this.state.syn ? "  synonyms: "+ this.state.syn : '' }
                    </span>
                      <i className="fa fa-question-circle" style={{color:"#D3D3D3"}} onMouseEnter={(e) => {this.showText(this.props.query,this.props.type,key)}} onMouseLeave={(e) => {this.hideText(this.props.query,this.props.type,key)}}></i>
                            </a> : ''}


                    </button>
                            : ''}
                    </div>


                );
            });
        }
        return (
            <div>
                {items}
            </div>
        )
    }

}
export default Element;

