import React from 'react'
import { connect } from 'react-redux'
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';
import BarChart from '../../components/assays/BarChart';

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
                    <span>
                     <img style={{maxHeight: "30px"}}
                          src="http://dev3.ccs.miami.edu:8080/SignatureCommons/images/u151.svg"/>
                        Gene Expression:   <a href={'/signatures/signatures?signature=Gene Expressions&class=cell line&term='+this.props.data.name}>{this.props.data.signature_category_count['gene expression']}</a>
                    </span>
                            <br/>
                    <span> <img
                        style={{maxHeight: "30px"}}
                        src="/media/icons/Protein_Expression_Icon.png"/>
                             Protein Expression:   <a href={'/signatures/signatures?signature=proteomics&class=cell line&term='+this.props.data.name}>{this.props.data.signature_category_count['proteomics']}</a>
                    </span>
                            <br/>
                     <span> <img
                         style={{maxHeight: "30px"}}
                         src="/media/icons/Epigenomic_Icon.png"/>
                           Epigenomic:   <a href={'/signatures/signatures?signature=epigenetic&class=cell line&term='+this.props.data.name}>{this.props.data.signature_category_count['epigenetic']}</a>
                    </span>
                            <br/>
                     <span> <img
                         style={{maxHeight: "30px"}}
                         src="/media/icons/Cell_Phenotype_Icon.png"/>
                             Cell Phenotype: <a href={'/signatures/signatures?signature=Cell Phenotype&class=cell line&term='+this.props.data.name}>{this.props.data.signature_category_count['cell phenotype']}</a>
                    </span>
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
