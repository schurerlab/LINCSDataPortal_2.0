import React from 'react'
import axios from 'axios';
import ModelSystems from  '../../components/home/ModelSystems';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';


export default class ModelSystemFilter extends React.Component {

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



    componentDidMount() {
        this.getData()
    }



    getData() {
        let disease = {} ;
        let organ = {};
        let cells = {};
        axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=disease')
            .then((res) => {

                organ = res.data.data['cell line']
            })
        axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=organ%2Ftissue')
            .then((res) => {

                    disease = res.data.data['cell line'];
                    cells = Object.assign(organ, disease)
                    this.setState({cells:cells})
            })
    }

    render() {

        return (

            < div >

            {this.state.cells  ?
                <Row >

                        <ModelSystems facets={this.state.cells}/>

                </Row> : "" }

            </div>


        )
    }
}
