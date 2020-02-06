import React from 'react'
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';

import SignatureAppliedFilter from './SignatureAppliedFilter'


export default class SignatureAppliedFilters extends React.Component {
    
    constructor( props ) {
        super( props );
        // console.log(props);
        // debugger
        

        this.state = {
        //    tags: props.tags || [],
            class: props.class || "",   
            type: props.type || "",
           term: props.term || "",
            classes: props.class || [],
            types: props.type || [],
            terms: props.term || [],
           removeTag: props.removeTag

        };
        this.cancel = '';

    }

    removeTag = (e) => {
        console.log("remove tag");
        console.log(e);
        // console.log(this.state.class, this.state.type, this.state.term);
        // this.state.removeTag(this.state.class, this.state.type, this.state.term);
    }

    render() {
        // var tags = this.state.tags.map(function(tag,index){
        // if (tag) return (<div key="index"><div className="suggestion-chip" style={{marginLeft:"0.6em"}}>{tag}</div><div className="suggestion-chip" style={{marginLeft:"0.6em"}}>+</div></div>);
        //   })
        // console.log(tags);
        const types = this.state.types;
        const classes = this.state.classes; 
        const removeFilter = this.state.removeTag;
        console.log(this.state.terms);
        
        var terms = this.state.terms.map(function(term,index){
        const type = types[index];
        if (term) return (<SignatureAppliedFilter key={index} filterIndex={index} filterClass={classes[index]} filterType={types[index]} filterTerm={term} removeFilter={removeFilter}></SignatureAppliedFilter>);
          })
        // console.log(tags);
        
        
        return (
            < div >
                {terms.length > 0  &&
                    <Row className="col-12">
                        <div className="filtered-by">
                            <b>Filtered by: </b>
                        </div>
                        {/* { tags } */}
                        { terms }
                        {/* <div className="suggestion-chip" style={{marginLeft:"0.6em"}}>{this.state.tags[0]}</div>
                        <div className="suggestion-chip" style={{marginLeft:"0.6em"}}>+</div> */}
                        {/* <div> */}
                            {/* <div className="suggestion-chip" style={{marginLeft:"0.6em"}}>{this.state.type}</div> */}
                            {/* <div className="suggestion-chip" style={{marginLeft:"0.6em"}}><b>{this.state.type}: </b>{ this.state.term }<i className="close" onClick={this.removeTag}>x</i></div>
                        </div> */}
                        
                    </Row> }

            </div>
        )
    }
}