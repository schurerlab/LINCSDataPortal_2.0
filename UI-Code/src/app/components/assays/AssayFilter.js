import React from 'react'
import axios from 'axios';
import Assays from  '../../components/home/Assays';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';


export default class AssayFilter extends React.Component {

    constructor( props ) {
        super( props );

        console.log(this.props.facets)

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



    componentDidMount() {
        this.getData()
    }



    getData() {
        let disease ;
        let organ;
        let cells;
        axios.get('http://lincsportal.ccs.miami.edu/dcic/api/fetchassayinfo?searchTerm=*&facet=area_of_study,center_name&limit=0')
            .then((res) => {
                this.setState({cells:res.data.results.facets[0]})

            })








    }

    render() {

        return (

            < div >

                {this.state.cells  ?
                    <Row >


                            <Assays facets={this.state.cells}/>



                    </Row> : "" }

            </div>


        )
    }
}
