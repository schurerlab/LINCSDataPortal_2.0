import React from "react";
import { connect } from "react-redux"
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal,Tabs,Tab} from 'react-bootstrap';
import Perturbations from "../components/perturbations/Perturbations";
import Knockdown from "../components/perturbations/Knockdown";
import PerturbationDetail from "../components/perturbations/PerturbationDetail"
// import PerturbationsSearch from "../components/perturbations/";
// import PerturbationsDescription from "../components/perturbations/PerturbationsDescription";
// import PerturbationsAbout from "../components/perturbations/PerturbationsAbout";


export default class SigPerturbations extends React.Component{

    constructor(props) {
        super();

        this.state = {
            selected: 0,
            selectedButton:'Small molecules',
            currentPage:1,
            todosPerPage:10,
        }

    }
    buttonSelected(key){
        if(this.state.selectedButton!=key){
            this.setState({selectedButton: key })
            console.log(this.state.selectedButton);
        }


    }

    render() {
      return (
          <div>
          <ButtonToolbar >
          <ButtonGroup >
            <Button className={this.state.selectedButton === 'Small molecules' ? "ms_active" : "btn-default"}  onClick={() => {this.buttonSelected('Small molecules')} }>
        <br/>
        <span style={{fontSize:"1.5em"}}>Small molecules </span>
        </Button>
        <Button  className={this.state.selectedButton === 'Knock down' ? "ms_active" : " btn-default"}  onClick={() => {this.buttonSelected('Knock down')}}>
        <br/>
        <span style={{fontSize:"1.5em"}}> Knock down </span>
        </Button>

        </ButtonGroup>
        </ButtonToolbar>

        {this.state.selectedButton === 'Small molecules' ? <Perturbations></Perturbations>  :""}
              {this.state.selectedButton === 'Knock down' ? <Knockdown></Knockdown>  :""}

          </div>

      )
    }
}
