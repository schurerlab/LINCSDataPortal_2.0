import React from 'react'
import axios from 'axios';
import GeneExpression from  '../../components/home/GeneExpression';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';


export default class SignatureFilter extends React.Component {

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


   getDiseases() {
        return axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=disease');
    }

    getMoa() {
        return axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=mechanism%20of%20action');
    }

    getData() {
        let disease ={} ;
        let organ ={};
        let moa ={};
        let cls = {};
        let smt =  {};
        let sm={};
        let cl={};
        let temp1 ={};
        let temp2 ={};
        axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=disease')
            .then((res) => {

                disease = res.data.data['cell line']

            })
        axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=organ%2Ftissue')
            .then((res) => {

                organ = res.data.data['cell line'];

            })

        axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=small%20molecule%20target')
            .then((res) => {
                smt  = res.data.data['small molecule'];


            })
        axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=mechanism%20of%20action')
            .then((res) => {
                    moa = res.data.data['small molecule'];
                if(organ!= undefined && disease != undefined && moa != undefined && smt != undefined){
                    cls = Object.assign(organ, disease,moa,smt)
                    this.setState({cells:cls})
                }
            })
    }

    render() {

        return (

            < div >

                {this.state.cells  ?
                    <Row className="col-12">



                            <GeneExpression facets={this.state.cells} />


                    </Row> : "" }

            </div>


        )
    }
}
