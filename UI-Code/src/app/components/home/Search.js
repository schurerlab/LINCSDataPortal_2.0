import React from 'react';
import axios from 'axios';
import Moa from  '../../components/home/Moa';
import Perturbations from  '../../components/home/Perturbations';
import ModelSystems from  '../../components/home/ModelSystems';
import GeneExpression from  '../../components/home/GeneExpression';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';
import PanelPerturbations from "../../components/home/PanelPerturbations";
import PanelModelSystems from "../../components/home/PanelModelSystems";
import PanelSignatures from "../../components/home/PanelSignatures";
import SignatureSearch from './SignatureSearch';
import PerturbationsHeader from './PerturbationsHeader';
import SignaturesHeader from './SignaturesHeader';
import ModelSystemHeader from './ModelSystemHeader'
// import Loader from '../../../media/icons/cells.png"';


class Search extends  React.Component {

    constructor( props ) {
        super( props );


        this.state = {

            selectedButton:'Metadata',
            query: '',
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

    }



    fetchSearchResults = ( query ) => {

        // const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';

        const searchUrl = `http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?term=${query}`;

        if (this.cancel) {
            // Cancel the previous request before making a new request
            this.cancel.cancel();
        }
        // Create a new CancelToken
        this.cancel = axios.CancelToken.source();

        axios
            .get(searchUrl, {
                cancelToken: this.cancel.token,
            })
            .then((res) => {
                // console.log(res);
                const resultNotFoundMsg = ! Object.keys(res.data.data).length > 2
                    ? 'There are no more search results. Please try a new search.'
                    : '';
                this.setState({
                    results: res.data.data['small molecule'],
                    len:Object.keys(res.data.data).length > 1 ? Object.keys(res.data.data).length : 0 ,
                    cells: res.data.data['cell line'],
                    ge: res.data.data['Gene expression'],
                    message: resultNotFoundMsg,
                    pb: res.data.data['Protein binding'],
                    pe: res.data.data['Protein expression'],
                    ep: res.data.data['Epigenetic'],
                    me: res.data.data['MEMA cell growth'],
                    sh: res.data.data['shRNA'],
                    sg: res.data.data['sgRNA'],
                    loading: false,


                });
            })
            .catch( error => {
                if(axios.isCancel(error)){
                    return
                }
                    this.setState({
                        loading: false,
                        message: 'Failed to fetch the data. Please check network'
                    })

            } )
    };

    handleOnInputChange = (event) => {
        const query = event.target.value;

        if ( ! query || query.length < 2) {
            this.setState({ query, results:{},
                len:1,
                ge:{},
                pb:{},
                pe:{},
                ep:{},
                me:{},
                sh:{},
                sg:{},
                cells:{}, message: '' } );
        } else {
            this.setState({ query, loading: true, message: ''}, () => {
                this.fetchSearchResults( query);
            });
        }
    };


    buttonSelected(key){
        if(this.state.selectedButton!=key){
            this.setState({selectedButton: key })
        }
        console.log(this.state.selectedButton);

    }






    render() {
 
        const {message, loading } = this.state;
        const { query } = this.state;
        return (
            <div >
                <h2  className="col-12 text-center" >Explore and Analyze all LINCS Signatures</h2>
                <ButtonToolbar style={{marginTop:'2em'}}>
                    <ButtonGroup bsSize="large" >
                        <Button className={this.state.selectedButton === "Metadata" ? "ms_active" : "btn-default"}  onClick={() => {this.buttonSelected('Metadata')} }>
                            Metadata Search
                        </Button>
                        <Button disabled > | </Button>
                        <Button className={this.state.selectedButton === "Signature" ? "ms_active" : "btn-default"}  onClick={() => {this.buttonSelected('Signature')} }>
                            Signature Search
                        </Button>

                    </ButtonGroup>
                </ButtonToolbar>
                { this.state.selectedButton ==="Metadata" ?
            <div className="col-12" style={{marginBottom:'2em'}}>
                {/*Heading*/}


                <Well  className="form-group-lg" >
                    <FormGroup  style={{   display: "block", width:"100%",background:"#F2F2F2", borderRadius: "6px",border: "1px solid #ced4da",  marginBottom: "0" }}>
                        <InputGroup  style={{ marginBottom: "none" }} >

                                <FormControl style={{  background:"#F2F2F2",border:"none"}}
                                 type="text"
                                 value={query}
                                 id="search-input"
                                 placeholder="Search ..."
                                 onChange={this.handleOnInputChange}
                                 />
                               <i className="pull-right fa fa-search fa-3x" style={{    color:"gray", textAlign:"center",marginTop:"0.1em" }} aria-hidden="true"></i>
                          </InputGroup>
                        </FormGroup>
                </Well>
                <a style={{color:"black",fontWeight: 200}} href="/signatures/structure-search" className="pull-right"  >
                    Structure Search
                </a>

                
                 {  message && <p className="message">{message}</p> }





            </div> : ""}
                { this.state.selectedButton ==="Metadata" ?
                <div>
                { this.state.len > 0  ?
                <Row className="col-12">
                    <Col xs={4} md={4} lg={4}>
                        <PerturbationsHeader/>
                        <br/>
                        <Perturbations facets={this.state.results} label="Small Molecules" query={this.state.query} />
                        <Perturbations facets={this.state.sh} label="shRNA" query={this.state.query} />
                        <Perturbations facets={this.state.sg} label="sgRNA" query={this.state.query} />
                    </Col>
                    <Col xs={4} md={4} lg={4}>
                        <ModelSystemHeader/>
                        <br/>
                        <ModelSystems facets={this.state.cells} query={this.state.query}  />
                    </Col>
                    <Col xs={4} md={4} lg={4}>
                        <SignaturesHeader/>
                        <br/>
                        <GeneExpression facets={this.state.ge} label="Gene Expression" query={this.state.query} />
                        <GeneExpression facets={this.state.pe} label="Protein Expression" query={this.state.query} />
                        <GeneExpression facets={this.state.ep} label="Epigenetic" query={this.state.query} />
                        <GeneExpression facets={this.state.pb} label="Protein binding" query={this.state.query} />
                        <GeneExpression facets={this.state.me} label="MEMA cell growth" query={this.state.query} />
                        <GeneExpression facets={this.state.cells} label="Cell line" query={this.state.query} />
                    </Col>
                </Row> :
                <Row className="col-12">
                    <Col xs={4} md={4} lg={4}>
                            <PanelPerturbations />
                   </Col>
                    <Col xs={4} md={4} lg={4}>
                            <PanelModelSystems />
                    </Col>
                    <Col xs={4} md={4} lg={4}>
                            <PanelSignatures />
                    </Col>
                </Row>
                }
                    </div> :
                    <SignatureSearch>

                </SignatureSearch>}
            </div>
        )
    }
}

export default Search;