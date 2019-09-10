import React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import 'react-table/react-table.css'

import { getDataTablePerterbagans } from "../../redux/fetch/data-perturbagens"
import { setSuggestStr } from "../../redux/actions/set-suggest"

let csl = { 'fontSize': '0.7em' };

var columns = [
    { Header: "ALL", accessor: 'all', width: 30},
    { Header: "Name", accessor: 'sm_name'},
    { Header: "MOA", accessor: 'moa' },
    { Header: "Target", accessor: 'target' },
    { Header: "Max FDA Phase", accessor: 'max_fda_phase' },

    { Header: "G", accessor: 'g', width: 20},
    { Header: "P", accessor: 'p', width: 20},
    { Header: "B", accessor: 'b', width: 20},
    { Header: "E", accessor: 'e', width: 20},
    { Header: "I", accessor: 'i', width: 20}
    // { Header: "PubChem ID", accessor: 'pubchemCid' },
    // { Header: "ChEMBL ID", accessor: 'chemblId' },
    // { Header: "Class", accessor: 'perturbagenClass' }

    // { Header: 'concentration', accessor: 'concentration' },
    // { Header: 'concentrationUnits', accessor: 'concentrationUnits' },
    // { Header: 'timepoint', accessor: 'timepoint' },
    // { Header: "timepointUnits", accessor: 'timepointUnits' },
];

class TablePerturbations extends React.Component {

    render() {
        return (
            <div style={ csl } >
                <h1> Table Perturbations </h1>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            {/* <div className="input-group-prepend" > */}
                                <button className="btn btn-outline-danger"
                                    type="button"
                                    onClick={() => this.props.querySubmit(this.props.array_fetchterms)}>
                                    Get Data</button>
                                {/* <span className="input-group-text" id="bstrp_ao1">
                                    {"[" + this.props.array_fetchterms.join("] [") + "]"}
                                </span> */}
                            {/* </div> */}
                        </div>
                    </div>
                </form>

                < ReactTable
                    data={this.props.data_table_perturbagens}
                    columns={columns}
                    minRows={1}
                />

            </div>
        )
    };
}

// redux store
const mapStateToProps = (state) => {
    return {
        data_table_perturbagens: state.perturbationsReducer.data_table_perturbagens,
        array_fetchterms: state.searchTermsReducer.array_terms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        querySubmit: (str) => {
            dispatch(getDataTablePerterbagans(str))
        },
        setSuggestStr: (str) => {
            dispatch(setSuggestStr(str))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePerturbations);