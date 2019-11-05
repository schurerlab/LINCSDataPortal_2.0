import React, { Component } from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';




class FacetShowHide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showhide:this.props.show
        }

    }
    handleChange(){
        console.log("i am here")
        // this.setState({showhide: text});

    }

    render() {



        let button;

        if(this.props != undefined) {


            if (this.state.showhide === "more") {
                return (
                    <Button className=" btn btn-default facet_button facet-margin" onChange={this.handleChange()}  >
                        <i className="fa fa-minus"></i> Less
                    </Button>
                );


            }
            else if (this.state.showhide === "less") {
                return (
                    <Button className=" btn btn-default facet_button facet-margin"  onChange={this.handleChange()} >
                        <i className="fa fa-plus"></i> Less
                    </Button>
                );


            }
        }
    }

}
export default FacetShowHide;

