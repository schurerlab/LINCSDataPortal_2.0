import React from 'react';
import axios from 'axios';
import Assays from  '../../components/home/Assays';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';


// import Loader from '../../../media/icons/cells.png"';


class AssaySearch extends  React.Component {

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


        const searchUrl = `http://lincsportal.ccs.miami.edu/dcic/api/fetchassayinfo?facet=area_of_study,center_name&limit=0&searchTerm=${query}`;

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
                console.log(res.data.results.facets[0])
                this.setState({
                    cells: res.data.results.facets[0],
                    loading: false,


                });
            })

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
                { this.state.cells  ?
                    <Row className="col-12">

                        <Col xs={12} md={12} lg={12}>

                            <Assays facets={this.state.cells} />
                        </Col>

                    </Row> :"" }
            </div>
        )
    }
}

export default AssaySearch;

