import React, { Component } from 'react';
import axios from 'axios';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';

class GetSmallMolecue extends Component {
    constructor() {
        super();
        this.state = {
            name : ''
        }
        this.onSelect = this.onSelect.bind(this);
    }
    componentDidMount(){
        this.onSelect(this.props.id);
    }
    onSelect (value) {

            axios.request({
                method:'get',
                url:'http://dev3.ccs.miami.edu:8080/sigc-api/small-molecule/fetch-by-id?id='+value+'&returnSignatureIDs=false'
            }).then((response) => {
                this.setState({name:response.data.data[0].sm_name})

            })

   }
    render() {
        this.onSelect(this.props.id)

        return (
            <div >
                {this.state.name}
            </div>
        );
    }
    
}
export default GetSmallMolecue;
