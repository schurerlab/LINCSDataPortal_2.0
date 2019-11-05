import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table,Pagination} from 'react-bootstrap';
import GetSmallMolecue from '../../components/signatures/GetSmallMolecue';
import SignaturePanel from '../../components/signatures/SignaturePanel';

let csl = { 'fontSize': '0.7em' };
import { Link } from 'react-router';

const columns = [{
    Header: 'Perturbagen',
    accessor: 'pertname'
},
    {
        Header: 'MOA',
        accessor: 'mechanismOfAction'
    },
    {
        Header: 'Cell Line',
        accessor: 'cellName'

    },
    {
        Header: 'Category',
        accessor: 'assay_category' // String-based value accessors!
    },
    {
        Header: 'Organ',
        accessor: 'organ' // String-based value accessors!
    },
    {
        Header: 'Time Point',
        accessor: 'timepoint'
    }
    ,
    {
        Header: 'concentration',
        accessor: 'concentration'
    }
];




class SignatureTable extends Component {
    constructor(props) {
        super();

        this.state = {
            selected: 0,
            currentPage:1,
            todosPerPage:10,
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

            <div>
            <ReactTable
            data={data}
            columns={columns}
            minRows={1}
            defaultPageSize={10}
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
        )


    }
}

export default SignatureTable;