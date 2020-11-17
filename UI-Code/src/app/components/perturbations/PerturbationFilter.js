import React from 'react'
import axios from 'axios';
import Perturbations from  '../../components/home/Perturbations';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';


export default class PerturbationFilter extends React.Component {

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
        let disease = {}
        let organ= {}
        let cells= {}
        axios.get('http://lincsportal.ccs.miami.edu/sigc-api/search/get-facets?type=small%20molecule%20target')
            .then((res) => {

               let temp = {
                    "Perturbagen Type": {
                        "Small Molecule": 22000,
                        "sgRNA": 10,
                        "ShRNA": 200

                    }
                }

                organ= Object.assign(temp, res.data.data['small molecule'])

            })
        axios.get('http://lincsportal.ccs.miami.edu/sigc-api/search/get-facets?type=mechanism%20of%20action')
            .then((res) => {
             disease = res.data.data['small molecule'];
                    cells = Object.assign(organ, disease)
                    this.setState({cells: cells})
            })







    }

    render() {

        return (

            < div >

                {this.state.cells  ?
                    <Row className="col-12">
                        
                            
                            <Perturbations facets={this.state.cells}  label="Small Molecules"/>

                    </Row> : "" }

            </div>


        )
    }
}
