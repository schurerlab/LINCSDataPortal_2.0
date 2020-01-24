import React from 'react'
import { connect } from 'react-redux'
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';
import BarChart from '../../components/assays/BarChart';

class AssaysDetailsPanel extends React.Component {
    render() {
        if (!this.props.data) {
            return null
        } else {
            let assays = this.props.data
            console.log(this.props.data)
            let obj= [] 
           for (var i = 0; i < assays.counts.length; i++) { 
               var split = assays.counts[i].split(':'); 
               obj.push({"label":split[0],"count":split[1]}); 
           }
            const listItems = obj.map((d) => <div key={d.label}> <b>{d.label}:</b> {d.count}</div>);


            return (
                <div>

                    <div >

                        <div className = "text-center">
                            <a className = "text-center  name-header"
                               href={`/signatures/assays/${assays.id}`}
                               style={{color: "orange"}}
                            >
                                {assays.title}
                            </a>
                        </div>
                        <div className = "properties-header"
                                                                                style={{color: "orange"}}>
                        Metadata
                    </div>
                        <hr style={{borderTop: "1px solid orange"}}/>

                        <div className="body-text">
                            <div>
                                <b>Area of study:</b><span> {assays.area}</span>
                            </div>
                            <span><b>Technology:</b> {assays.method}</span><br/>
                            <span><b>Center:</b> {assays.center.toString()}</span><br/>
                            <span><b>Biological Process:</b> {assays.process}</span><br/>
                            <span><b>Format:</b> {assays.format}</span><br/>


                            <div className="properties-header" style= {{color: "orange"}}>Participants</div>
                            <hr style={{borderTop: "1px solid orange"}}/>
                            {listItems}
                            <div className="properties-header" style= {{color: "orange"}}>Datasets</div>
                            <hr style={{borderTop: "1px solid orange"}}/>
                            <div>
                                <b>Datasets:</b><span> {assays.datasets}</span>
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
    }
}


export default AssaysDetailsPanel
