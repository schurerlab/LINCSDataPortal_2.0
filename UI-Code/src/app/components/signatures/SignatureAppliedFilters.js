import React from 'react'
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';


export default class SignatureAppliedFilters extends React.Component {
    
    constructor( props ) {
        super( props );
        console.log(props);
        

        this.state = {
           tags: props.tags || [],
           type: props.type || ""

        };
        this.cancel = '';

    }

    render() {
        var tags = this.state.tags.map(function(tag){
        return (<div><div className="suggestion-chip" style={{marginLeft:"0.6em"}}>{tag}</div><div className="suggestion-chip" style={{marginLeft:"0.6em"}}>+</div></div>);
          })

        return (
            < div >
                {true  &&
                    <Row className="col-12">
                        <div className="filtered-by">
                            <b>Filtered by: </b>
                        </div>
                        { tags }
                        {/* <div className="suggestion-chip" style={{marginLeft:"0.6em"}}>{this.state.tags[0]}</div>
                        <div className="suggestion-chip" style={{marginLeft:"0.6em"}}>+</div> */}
                        <div>
                            <div className="suggestion-chip" style={{marginLeft:"0.6em"}}>{this.state.type}</div>
                        </div>
                        
                    </Row> }

            </div>
        )
    }
}