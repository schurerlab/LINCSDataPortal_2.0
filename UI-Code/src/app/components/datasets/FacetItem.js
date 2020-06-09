import React, { Component } from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';




class FacetItem extends Component {
    constructor(props) {
        super(props);
        this.handleSerice = props.handleChange;
        
    }

    render() {
        let items;
        if (this.props.facets) {
            items = Object.entries(this.props.facets).map(([key,value])=> {
                return (
                    <div key={key}>
                        <span ><input type="checkbox"  ></input> </span>
                        {key}
                        <span className="pull-right main-page-font"  >{value.toString()} </span>
                    </div>
                );
            });
        }
        return (
            <div>
                {items}
                </div>
               )
    }
    
}
export default FacetItem;
