import React,{useState} from "react";
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal,OverlayTrigger,Popover,Tooltip} from 'react-bootstrap';
import SignatureSummary from './SignatureSummary';
import SigTable from './SigTable';
import SignaturePanel from './SignaturePanel';
import SignatureSearch from './SignatureSearch';
import SignatureFilter from './SignatureFilter';
import SignatureDetails from './SignatureDetails';
import SignaturePagenation from './SignaturePagenation';
import AppliedFilters from './AppliedFilters';
import FilterPanel from './FilterPanel';

let csl = { 'fontSize': '0.7em' };

const SignatureCatelog = () => {

    const [selectedButton,buttonSelected] = useState('Details');
    
    return(
        <div className="row">
        <div className="col-3" >
        <ButtonToolbar >
                        <ButtonGroup bsSize="medium" >
                            <Button className={selectedButton === 'Details' ? "ms_active" : "btn-default"}  onClick={() => {buttonSelected('Details')} }>
                                <i className="fa fa-info fa-2x" style={{    color:"gray" }}></i>

                                <br/>
                                <span style={{fontSize:"0.8em"}}>Details </span>
                            </Button>
                            <Button  className={selectedButton === 'Filter' ? "ms_active" : " btn-default"}  onClick={() => {buttonSelected('Filter')}}>
                                <i className="fa fa-filter fa-2x" style={{    color:"gray" }}></i>
                                <br/>
                                <span style={{fontSize:"0.8em"}}> Filter </span>
                            </Button>
                            <Button  className={selectedButton === 'Search' ? "ms_active" : " btn-default"}  onClick={() => {buttonSelected('Search')}}>
                                <i className="fa fa-search fa-2x" style={{    color:"gray" }}></i>
                                <br/>
                                <span style={{fontSize:"0.8em"}}> Search </span>
                            </Button>


                        </ButtonGroup>
                    </ButtonToolbar>
                    {/* <SignatureDetails/> */}

                    <div className="details-panel" style={{minHeight:"40em"}}>
                        <div>

                            {selectedButton === 'Search' ?
                                <div>


                                    <SignatureSearch></SignatureSearch>
                                </div>
                                :''
                            }
                            {  selectedButton === 'Filter' ?

                                <div>


                                    <br/>
                                    <FilterPanel></FilterPanel>
                                </div>
                                :''
                            }
                            {selectedButton === 'Details' ?
                                <div >

                                    <SignatureDetails/> 

                                    {/* <SignaturePanel data={data[selected]} ></SignaturePanel> */}


                                </div>
                                :"" }
                        </div>
                    </div> 
        </div>
        <div className="col-9" >
            <AppliedFilters/>
            <SignatureSummary/>
            <SigTable/>
            <SignaturePagenation/>
        </div>
        </div>

    )
}

export default SignatureCatelog;