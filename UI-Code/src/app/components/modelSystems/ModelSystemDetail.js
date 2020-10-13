import React from 'react'
import { connect } from 'react-redux'
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';
import BarChart from '../../components/assays/BarChart';
import SignatureLink from './SignatureLink';
class ModelSystemDetail extends React.Component {
    render() {
        if (!this.props.data) {
            return null
        } else {
            let ms = this.props.data
            return (
                <div>
                    {ms ? <div>
                        
                        <div className = "text-center">
                            <a className = "text-center name-header"
                               href={'/signatures/models/'+this.props.data.id}
                               style={{color: "green"}}
                            >
                                {this.props.data.name}
                            </a>
                        </div>
                        <div className = "properties-header"
                             style={{color: "green"}}>
                            Metadata
                        </div>
                        <hr style={{borderTop: "1px solid green"}}/>
                        <div className="body-text">
                            <span>
                                <b>Category:</b> Cell line</span><br/>
                            <span><b>Tissue:</b> {this.props.data.tissue}</span><br/>
                            <span><b>Organ:</b> {this.props.data.organ}</span><br/>

                            <div className="properties-header" style= {{color: "green"}}>Signatures</div>
                            <hr style={{borderTop: "1px solid green"}}/>
                            <span>Signature Categories</span><br/>
                            <hr style={{borderTop: "1px solid whitesmoke"}} />
                            <SignatureLink data={this.props.data} type='model system' name={this.props.data.name}></SignatureLink>
                            <br/>

                            <br/>
                        </div>

                    </div>
                        : ''}
                </div>


            )
        }
    }
}


export default ModelSystemDetail
