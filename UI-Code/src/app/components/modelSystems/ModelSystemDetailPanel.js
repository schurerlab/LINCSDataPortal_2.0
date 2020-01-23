import React from 'react'
import { connect } from 'react-redux'
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';
import ModelSystemDetail from './ModelSystemDetail'

class ModelSystemDetailPanel extends React.Component {

  render() {
    if (!this.props.showModelSystem) {
      return null
    } else {
    let sms = this.props.showModelSystem
    console.log(sms)
    return (
        <div>
    <div>
        <ButtonToolbar style={{marginTop:'2em'}}>
            <ButtonGroup bsSize="large" >
                <Button >
                    <img height={30}
                             src="/media/icons/Information_Icon.png"/>
                    <br/>
                       <span style={{fontSize:"0.8em"}}>Details </span>
                        </Button>
                <Button>
                    <img height={30}
                         src="/media/icons/Filter_Icon.png"/>
                    <br/>
                    <span style={{fontSize:"0.8em"}}> Filter </span>
                </Button>
                <Button>
                    <i className="fa fa-search fa-1x" style={{    color:"gray" }}></i>
                    <br/>
                    <span style={{fontSize:"0.8em"}}> Search </span>
                </Button>
               
            </ButtonGroup>
        </ButtonToolbar>
    </div>
      <div className = "details-panel">

        <div className = "text-center details-header-font">Model System Details</div>
        <div className = "text-center">
          <a className = "text-center name-header"
            href={`/signatures/models/${sms.id}`}
            style={{color: "green"}}
          >
            {sms.name}
          </a>
        </div>
        <div className = "properties-header"
          style={{color: "green"}}>
            Metadata
        </div>
        <hr style={{borderTop: "1px solid green"}}/>
        <ModelSystemDetail showModelSystem={sms} />

      </div>
            </div>
    )
  }
  }
}

const mapStateToProps = (state) => ({
        showModelSystem: state.modelsystemsReducer.showModelSystem
    })

export default connect(mapStateToProps)(ModelSystemDetailPanel)
