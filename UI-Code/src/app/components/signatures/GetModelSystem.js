import React, { Component } from 'react';
import axios from 'axios';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';

class GetModelSystem extends Component {
    constructor() {
        super();
        this.state = {
            name : ''
        }
    }
    render() {
        if(this.props.id){
            axios.request({
                method:'get',
                url:'http://lincsportal.ccs.miami.edu/sigc-api/cell-line/fetch-by-id?id='+this.props.id+'&returnSignatureIDs=false'
            }).then((response) => {
                this.setState({name:response.data.data[0].cell_line_name})

            })
        }
        return (
            <div >
                {this.state.name}
            </div>
        );
    }

}
export default GetModelSystem;
