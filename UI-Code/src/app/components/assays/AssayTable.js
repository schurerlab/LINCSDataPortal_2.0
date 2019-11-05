import React, { Component } from 'react';
import ReactTable from "react-table";
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem,ButtonToolbar,FormGroup,InputGroup,ToggleButtonGroup,ToggleButton,ButtonGroup, Button,Table,Well,FormControl,Modal} from 'react-bootstrap';
import BarChart from '../../components/assays/BarChart';
let csl = { 'fontSize': '0.7em' };
import AssaysDetailsPanel from '../../components/assays/AssaysDetailsPanel';
import AssaySearch from '../../components/assays/AssaySearch';
import AssayFilter from '../../components/assays/AssayFilter';

const columns = [{
    Header: 'Assay',
    accessor: 'title',
    },
    {
        Header: 'Center',
        accessor: 'center',
    },
    {
        Header: 'Area of Study',
        accessor: 'area',

    },
    {
        Header: 'Method',
        accessor: 'method',
    },
    {
        Header: 'Datasets',
        accessor: 'datasets',
    }

];


class AssayTable extends Component {
    constructor(props) {
        super();

        this.state = {
            selected: 0,
            selectedButton:'Details',
            currentPage:1,
            todosPerPage:10,
        }

    }

    buttonSelected(key){
        if(this.state.selectedButton!=key){
            this.setState({selectedButton: key })

        }


    }


    changeShowModelSystem(id){

    }


    render() {
        if(this.state.selected===0){
            this.changeShowModelSystem(this.props.data[0].id);
        }
        const data = this.props.data;

        return (

            <div className="row" >
                {this.props.data.length > 1   ?  <div className="col-3 details-panel" style={{minHeight:"30em"}}>
                 <div>
                    <ButtonToolbar >
                        <ButtonGroup bsSize="large" >
                            <Button className={this.state.selectedButton === 'Details' ? "ms_active" : "btn-default"}  onClick={() => {this.buttonSelected('Details')} }>
                                <i className="fa fa-info fa-1x" style={{    color:"gray" }}></i>

                                <br/>
                                <span style={{fontSize:"0.8em"}}>Details </span>
                            </Button>
                            <Button  className={this.state.selectedButton === 'Filter' ? "ms_active" : " btn-default"}  onClick={() => {this.buttonSelected('Filter')}}>
                                <i className="fa fa-filter fa-1x" style={{    color:"gray" }}></i>
                                <br/>
                                <span style={{fontSize:"0.8em"}}> Filter </span>
                            </Button>
                            <Button  className={this.state.selectedButton === 'Search' ? "ms_active" : " btn-default"}  onClick={() => {this.buttonSelected('Search')}}>
                                <i className="fa fa-search fa-1x" style={{    color:"gray" }}></i>
                                <br/>
                                <span style={{fontSize:"0.8em"}}> Search </span>
                            </Button>

                        </ButtonGroup>
                    </ButtonToolbar>
                </div >
                    {this.state.selectedButton === 'Details' ?
                            <AssaysDetailsPanel data={this.props.data[this.state.selected]} ></AssaysDetailsPanel>
                        :"" }

                    {this.state.selectedButton === 'Search' ?
                    <div >



                        <AssaySearch></AssaySearch>
                    </div>

                        :"" }
                    {this.state.selectedButton === 'Filter' ?
                        <div >



                            <AssayFilter></AssayFilter>
                        </div>

                        :"" }
                </div> : '' }
                <div className="col-9" style={ csl }>

                <ReactTable
                    data={data}
                    columns={columns}
                    minRows={1}
                    defaultPageSize={20}
                    showPagination={false}
                    getTdProps={(state, rowInfo, column, instance) => {
                      return {
                      onClick: (e) => {
                      this.changeShowModelSystem(rowInfo["original"]["id"])
                          this.setState({ selected: rowInfo.index})
                      },
                        style: {
                          background: rowInfo.index === this.state.selected ? 'orange' : 'white',
                          color: rowInfo.index === this.state.selected ? 'white' : 'black'
                        }
                      }
                      }
                      }
                />
                    </div>


            </div>
        )


    }
}

export default AssayTable;