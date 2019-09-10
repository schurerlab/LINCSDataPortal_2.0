import React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import 'react-table/react-table.css'

import { getDataTableModelSystems } from "../../redux/fetch/data-modelsystems"
import { setSuggestStr } from "../../redux/actions/set-suggest"

let csl = { 'fontSize': '0.7em' };

var columns = [
    { Header: "Name", accessor: 'cellLineName' },
    { Header: "Disease", accessor: 'disease' },
    { Header: "Organ", accessor: 'organ' },
    { Header: "Tissue", accessor: 'cellLineTissue' },
    { Header: "DOID", accessor: 'doId' }
];

class TableModelSystems extends React.Component {

    render() {
        return (
            <div style={ csl } >
                <h1> Table Model Systems </h1>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend" >
                                <button className="btn btn-outline-danger btn-sm"
                                    type="button"
                                    onClick={() => this.props.querySubmit(this.props.array_fetchterms)}>
                                    Get Data</button>
                                <span className="input-group-text" id="bstrp_ao1">
                                    {"[" + this.props.array_fetchterms.join("] [") + "]"}
                                </span>
                            </div>
                        </div>
                    </div>
                </form>

                < ReactTable
                    data={this.props.data_table_modelsystems}
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
        data_table_modelsystems: state.modelsystemsReducer.data_table_modelsystems,
        array_fetchterms: state.searchTermsReducer.array_terms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        querySubmit: (str) => {
            dispatch(getDataTableModelSystems(str))
        },
        setSuggestStr: (str) => {
            dispatch(setSuggestStr(str))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableModelSystems);