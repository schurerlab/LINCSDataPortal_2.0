import React from 'react';
import axios from 'axios';
import GeneExpression from  '../../components/home/GeneExpression';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';


// import Loader from '../../../media/icons/cells.png"';


class SignatureSearch extends  React.Component {

    constructor( props ) {
        super( props );


        this.state = {
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
                // console.log(res.data.data);
                console.log(this.props.mode);                 
                // console.log(Object.keys(res.data.data).length );
                const resultNotFoundMsg = Object.keys(res.data.data).length < 2
                    ? 'There are no more search results. Please try a new search.'
                    : '';
                this.setState({
                    results: res.data.data['small molecule']||null,
                    // len:Object.keys(res.data.data).length > 1 ? Object.keys(res.data.data).length : 0 ,
                    cells: res.data.data['cell line']||null,
                    ge: res.data.data['Gene expression']||null,
                    message: resultNotFoundMsg,
                    pb: res.data.data['Protein binding']||null,
                    pe: res.data.data['Protein expression']||null,
                    ep: res.data.data['Epigenetic']||null,
                    me: res.data.data['MEMA cell growth']||null,
                    sh: res.data.data['shRNA']||null,
                    sg: res.data.data['sgRNA']||null,
                    loading: false,
                });
            })
            .catch( error => {
                if ( /*axios.isCancel(error) ||*/ error ) {
                    this.setState({
                        loading: false,
                        // message: 'Failed to fetch the data. Please check network'
                    })
                }
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
            this.setState({ query, loading: true, message: '' }, () => {
                this.fetchSearchResults( query);
            });
        }
    };








    render() {
        const {message, loading } = this.state;
        const { query } = this.state;
        return (
            <div >

                <div className="col-12" style={{marginBottom:'2em'}}>



                    <Well   >
                        <FormGroup  style={{   display: "block", width:"100%",background:"#F2F2F2", borderRadius: "6px",border: "1px solid #ced4da",  marginBottom: "0" }}>
                            <InputGroup  style={{ marginBottom: "none" }} >

                                <FormControl style={{  background:"#F2F2F2",border:"none"}}
                                             type="text"
                                             value={query}
                                             id="search-input"
                                             placeholder="Search ..."
                                             onChange={this.handleOnInputChange}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Well>




                    {  (this.state.message) && <p className="message">{message}</p> }





                </div>
                    <Row className="col-12">
                        {this.state.ge && 
                            <GeneExpression facets={this.state.ge} label="Gene Expression" mode={this.props.mode} addFacet={this.props.addFacet} />
                        }
                        {this.state.pe && 
                            <GeneExpression facets={this.state.pe} label="Protein Expression" mode={this.props.mode} addFacet={this.props.addFacet} />
                        }
                        {this.state.ep && 
                            <GeneExpression facets={this.state.ep} label="Epigenetic" mode={this.props.mode} addFacet={this.props.addFacet} />
                        }
                        {this.state.pb && 
                            <GeneExpression facets={this.state.pb} label="Protein binding" mode={this.props.mode} addFacet={this.props.addFacet} />
                        }
                        {this.state.me && 
                            <GeneExpression facets={this.state.me} label="MEMA cell growth" mode={this.props.mode} addFacet={this.props.addFacet} />
                        } 
                        {this.state.cells && 
                            <GeneExpression facets={this.state.cells} label="Cell line" mode={this.props.mode} addFacet={this.props.addFacet} />
                        }
                    </Row> 
            </div>
        )
    }
}

export default SignatureSearch;
