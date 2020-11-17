import React from 'react';
import axios from 'axios';
import ModelSystems from  '../../components/home/ModelSystems';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';


// import Loader from '../../../media/icons/cells.png"';


class ModelSystemSearch extends  React.Component {

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


        const searchUrl = `http://lincsportal.ccs.miami.edu/sigc-api/search/get-facets?term=${query}`;

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
                console.log(Object.keys(res.data.data).length );
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
                if ( axios.isCancel(error) || error ) {
                    this.setState({
                        loading: false,
                        message: 'Failed to fetch the data. Please check network'
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




                    {  message && <p className="message">{message}</p> }





                </div>
                { this.state.len > 1 ?
                    <Row >


                            <ModelSystems facets={this.state.cells} />


                    </Row> :"" }
            </div>
        )
    }
}

export default ModelSystemSearch;
