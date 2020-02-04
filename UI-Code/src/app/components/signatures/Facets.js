import React, { Component } from 'react';
// import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
let csl = { 'fontSize': '0.8em' };
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import { Link } from "react-router-dom";
import qs from 'query-string';

let syn;
class Facets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            loading:true,
            url:"",
        }
        this.handleSerice = props.handleChange;
    }

    handleSearch(e,k,type,cat) {
        console.log(type, cat, k);
        let url = encodeURI('http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/addFacet?class='+type.toLowerCase()+'&term='+k+'&type='+cat);
        // const url = 'http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/addFacet?class=cell%20line&term=blood&type=organ%2Ftissue'
        console.log(url);
        axios.request({
                method:'get',
                withCredentials: true,
                url:url
            })
            .then((res) => {
                console.log(res.data);
                const query = { class: type.toLowerCase(), type: cat, term: k };
                const searchString = qs.stringify(query);

                this.props.history.push({
                    pathname: '/signatures/signature-search-results',
                    search: searchString,
                    state: { mode: "UpDn"//this.state.mode,
                                // sessionId: response.data.sessionID,
                                // sigCount: response.data.count,
                                // data: this.state.cids
                            }
                })                
            })
    }


    rename(input){
        if (input == 'Cell line') {
            return input.replace('Cell line', 'cell line');
        }else if (input == 'Small Molecules') {
            return input.replace('Small Molecules', 'small molecule');
        }
    }
    
  showText(e,type,k) {
      console.log("showText",e,type,k);
      
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
        console.log(this.props.facets);
        
        if (this.props.facets) {



            items = Object.entries(this.props.facets).map(([key,value])=> {

                return (

                    <div className="col-12" style={{marginLeft:0,fontSize:"0.8rem",padding:"0",textAlign: "left",fontWeight:"200",color:"gray"}} key={key}>
                        {value > 0 ?
                        <button className="d-flex w-100 btn-inde" onClick={(e) => {this.handleSearch(e,key,this.props.type,this.props.cat)}}    style={{ borderColor: 'white' }}>

                        {key}  {key.includes()}

                            { this.props.query ?
                            <a className="titip-bottom" >

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
export default withRouter(Facets);

