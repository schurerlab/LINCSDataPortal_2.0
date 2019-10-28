import React, { Component } from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import axios from 'axios'
import Signatures from '../../components/signatures/Signatures';




class SignatureSearch extends Component {

    constructor( props ) {
        super( props );


        this.state = {
            selectedButton:'Signature',
            cids:[],
            query: '',
            up:[],
            dn:[],
            len:0,
            results:{},
            ge:{},
            pb:{},
            pe:{},
            ep:{},
            me:{},
            sh:{},
            sg:{},
            cells:{},
            loading: false,
            message: '',
        };
        this.cancel = '';

        this.handleUpGenes = this.handleUpGenes.bind(this)
        this.handleDownGenes = this.handleDownGenes.bind(this)
    }
    handleUpGenes(event) {
        let upGenes =[];
        if(event.target.value.includes("\n")){
             upGenes =event.target.value.split("\n");
        }else if(event.target.value.includes(",")){
            upGenes =event.target.value.split(",");
        }
        if(upGenes.length > 0) {
            this.setState({up: upGenes})
        }
    }
    handleDownGenes(event) {
        let dnGenes =[];
        if(event.target.value.includes("\n")){
            dnGenes =event.target.value.split("\n");
        }else if(event.target.value.includes(",")){
            dnGenes =event.target.value.split(",");
        }
        if(dnGenes.length > 0){
            this.setState({dn:dnGenes})
        }

    }

    getData(){
       this.setState({loading:true});
        axios.post('http://dev.ilincs.org/api/ilincsR/findConcordancesSC',
        {
            "mode"
        :
            "geneList", "signatureProfile"
        :
            {
                "genesUp"
            :
                this.state.up, "genesDown"
            :
                 this.state.dn
            }
        }
    ,
        {
            headers: {
                'Accept'
            :
                'application/json'
            }
        }
    ).then((response) => {
            this.setState({loading:false});
            var newArray = response.data.sigScores.map(el =>{
                return el.lincsSigID
            });
            this.setState({cids:newArray});

        })
    }

    render() {
        return <div>
            {this.state.loading == false && this.state.cids.length == 0 ?  <form>
                <div class="form-row">
                    <div class="col">
                        <textarea name="styled-textarea" id="styled" type="text" value={this.state.value} onChange={this.handleUpGenes} placeholder="Enter UP Genes either seperated by coma or new line "/>
                    </div>
                    <div className="col text-center " style={{marginTop:"20em"}}>
                    <Button className="btn btn-primary  mb-2"  onClick={() => {this.getData()} }>
                        Submit
                    </Button>
                        </div>
                    <div class="col">
                        <textarea name="styled-textarea" id="styled" type="text" value={this.state.value} onChange={this.handleDownGenes}  placeholder="Enter Down Genes either seperated by coma or new line "/>
                    </div>
                </div>
            </form> : "" }

            <div className="row">
                <div className="col-offset-5">
                 {this.state.loading == true ?   <div className="row text-center lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : "" }
                </div>
            </div>
            {this.state.cids.length > 0   ?  <Signatures centerid={this.state.cids}/> : ''}

        </div>;
    }

}

export default SignatureSearch;

