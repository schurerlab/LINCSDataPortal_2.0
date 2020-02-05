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
            // ge:{},
            // pb:{},
            // pe:{},
            // ep:{},
            // me:{},
            // sh:{},
            // sg:{},
            sm:{},
            cells:{},
            organ:{},
            disease:{},
            smallmoleculetarget:{},
            facets:{},
            loading: false,
            message: '',
        };
        this.cancel = '';

    }



    componentDidMount() {
        this.getData()
    }


//    getDiseases() {
//         return axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=disease');
//     }

//     getMoa() {
//         return axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=mechanism%20of%20action');
//     }

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
                this.setState({disease:disease})

            })
        axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=organ%2Ftissue')
            .then((res) => {

                organ = res.data.data['cell line'];
                console.log(organ);
                
                this.setState({organ:organ})
            })

        axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=small%20molecule%20target')
            .then((res) => {
                smt  = res.data.data['small molecule'];
                this.setState({smallmoleculetarget:smt})

            })
        axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=name')
            .then((res) => {
                smt  = res.data.data['small molecule'];
                this.setState({sm:res.data.data['small molecule'],cells:res.data.data['cell line']})
            })
        axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?type=mechanism%20of%20action')
            .then((res) => {
                    moa = res.data.data['small molecule'];
                    this.setState({moa:moa})
                if(organ!= undefined && disease != undefined && moa != undefined && smt != undefined && this.props.mode != "concordance"){
                    cls = Object.assign(organ, disease,moa,smt)
                    // console.log(cls);
                    this.setState({facets:cls})
                    // this.setState({cells:cls})
                }
            })
        // axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets')
        // .then((res) => {
        //     console.log(res.data);            
        // })
    }

    render() {

        return (

            < div >

                {this.state.facets && this.props.mode != "concordance"  ? 
                    <Row className="col-12">
                             <GeneExpression facets={this.state.facets} />
                    </Row> :                     
                    <Row className="col-12">                                     
                        {this.state.organ && 
                            <GeneExpression facets={this.state.organ} label="Cell line" mode={this.props.mode} addFacet={this.props.addFacet} />
                        }
                        {this.state.disease && 
                            <GeneExpression facets={this.state.disease} label="Cell line" mode={this.props.mode} addFacet={this.props.addFacet} />
                        }
                        {this.state.cells && 
                            <GeneExpression facets={this.state.cells} label="Cell line" mode={this.props.mode} addFacet={this.props.addFacet} />
                        }
                        {this.state.sm && 
                            <GeneExpression facets={this.state.sm} label="Small molecule" mode={this.props.mode} addFacet={this.props.addFacet} />
                        }
                        {this.state.moa && 
                            <GeneExpression facets={this.state.moa} label="Gene Expression" mode={this.props.mode} addFacet={this.props.addFacet} />
                        }
                        {this.state.smallmoleculetarget && 
                            <GeneExpression facets={this.state.smallmoleculetarget} label="Gene Expression" mode={this.props.mode} addFacet={this.props.addFacet} />
                        }
                    </Row>
                }

            </div>


        )
    }
}
