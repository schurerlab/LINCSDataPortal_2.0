import React from 'react'
import { connect } from 'react-redux'
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import SmallMoleculeDetail from './SmallMoleculeDetail'

class PerturbationDetail extends React.Component {

  render() {
    if (!this.props.showPerturbation) {
      return null
    } else {
    let sp = this.props.showPerturbation
    return (
        <div>
        <div className = "text-center">
          <a href={`/signatures/smallmolecule/${sp.id}`}
          className = "name-header">
            {sp.sm_name}
          </a>
        </div>
        <div className = "properties-header">
            Metadata
        </div>
        <hr className="border-line"/>
        <SmallMoleculeDetail showPerturbation={sp} />

            </div>
    )
  }
  }
}



export default PerturbationDetail
