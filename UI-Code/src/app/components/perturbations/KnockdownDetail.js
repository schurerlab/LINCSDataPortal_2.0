import React from 'react'
import { connect } from 'react-redux'
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import SmallMoleculeDetail from './SmallMoleculeDetail'

class KnockdownDetail extends React.Component {

    render() {
        if (!this.props.showPerturbation) {
            return null
        } else {
            let sp = this.props.showPerturbation
            return (
                <div>
                    <div className = "text-center">
                        <a href={`/signatures/knockdown/${sp.id}`}
                           className = "name-header">
                            {sp.name}
                        </a>
                    </div>
                    <div className = "properties-header">
                        Metadata
                    </div>
                    <hr className="border-line"/>
                    <div>
                        <b>Category:</b><span> {sp.class}</span>
                    </div>
                    <div>
                        <b>Type:</b><span> {sp.type}</span>
                    </div>
                    <div>
                        <b>Sub type:</b><span> {sp.subtype}</span>
                    </div>

                    <div>
                        <b>Species:</b><span> {sp.species}</span>
                    </div>
                    <div>
                        <b>Entrez ID:</b>  <a href={`https://www.ncbi.nlm.nih.gov/gene/${sp.id}`} target="_blank"
                                             >
                        {sp.id}</a>
                    </div>
                    <div className="properties-header">Signatures</div>
                    <hr className="border-line"/>
                    <span>Signature Categories</span><br/>
                    <hr style={{borderTop: "1px solid whitesmoke"}} />
          <span>
                     <img style={{maxHeight: "30px"}}
                          src="http://dev3.ccs.miami.edu:8080/SignatureCommons/images/u151.svg"/>
                        Gene Expression:   <a href={'/signatures/signatures?signature=Gene Expressions&class=nuclicacid reagnet&term='+sp.name}>-</a>
                    </span>
                    <br/>

                </div>
            )
        }
    }
}



export default KnockdownDetail
