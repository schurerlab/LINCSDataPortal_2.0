import React, { Component } from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import FacetItem from '../../components/datasets/FacetItem';
import FacetShowHide from '../../components/datasets/FacetShowHide';
import Element from  '../../components/home/Element';



class StructureSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sm: '',
        }


    }
    componentDidMount() {
        ChemicalizeMarvinJs.createEditor("#marvin-test").then(function (marvin) {
            function subStructure() {
                marvin.exportStructure("smiles").then(function (smiles) {
                    window.open("/signatures/perturbations?smiles="+smiles+"&class=substructure","_self");
                    console.log(smiles);
                });
            }
            function similarity() {
                marvin.exportStructure("smiles").then(function (smiles) {
                    window.open("/signatures/perturbations?smiles="+smiles+"&class=similar","_self");
                });
            }

            document.getElementById("getSmilesButton").addEventListener("click", subStructure);
            document.getElementById("getSimarButton").addEventListener("click", similarity);

        });


    }









render() {

    return (
        <div align="center"  >
            <div  style={{width: 800, height: 600}}  id="marvin-test" />
            <div align="center">
                <button id="getSmilesButton" style={{backgroundColor: "#3a5278",borderColor: "#578fc7",color: "whitesmoke"}} >Substructure Search</button>
                <button id="getSimarButton" style={{backgroundColor: "#3a5278",borderColor: "#578fc7",color: "whitesmoke"}} >Similarity Search</button>
            </div>
        </div>
    );
}
}

export default StructureSearch;