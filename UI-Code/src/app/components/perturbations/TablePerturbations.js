import React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import queryString from 'query-string';
import ReactPaginate from 'react-paginate'
import { getDataTablePerturbagens } from "../../redux/fetch/data-perturbagens"
import { setSuggestStr } from "../../redux/actions/set-suggest"
import { changeShowPerturbation } from "../../redux/fetch/get-perturbation"

let csl = { 'fontSize': '0.7em' };

var columns = [
    { Header: "Name", accessor: 'sm_name'},
    { Header: "MOA", accessor: 'moa' },
    { Header: "Target", accessor: 'target' },
    { Header: "Max FDA Phase", accessor: 'max_fda_phase' },
    { Header: <img
        style={{maxHeight: "20px"}}
        src="/media/icons/Gene_Expression_Icon.png"/>,
        accessor: 'g',
        Cell: (row) => {
            return <div><img height={15} src={row.original.g}/></div>
        },
        width: 30},
    {Header: <img
        style={{maxHeight: "20px"}}
        src="/media/icons/Protein_Expression_Icon.png"/>,
        accessor: 'p',
        Cell: (row) => {
            return <div><img height={15} src={row.original.p}/></div>
        }, width: 30},
    {Header: <img
        style={{maxHeight: "20px"}}
        src="/media/icons/Protein_Binding_Icon.png"/>, accessor: 'b',
        Cell: (row) => {
            return <div><img height={15} src={row.original.b}/></div>
        }, width: 30},
    { Header: <img
        style={{maxHeight: "20px"}}
        src="/media/icons/Epigenomic_Icon.png"/>, accessor: 'e',Cell: (row) => {
        return <div><img height={15} src={row.original.e}/></div>
    }, width: 30},
    { Header: <img
        style={{maxHeight: "20px"}}
        src="/media/icons/Cell_Phenotype_Icon.png"/>,
        accessor: 'i',Cell: (row) => {
        return <div><img height={15} src={row.original.i}/></div>
    }, width: 30}
];



class TablePerturbations extends React.Component {

    state = {
      selected: 0
    }

    componentDidMount() {
      this.props.querySubmit(this.props.array_fetchterms)
    }

    componentDidUpdate(prevProps) {
      if (prevProps.data_table_perturbagens.length === 1) {
        this.props.changeShowPerturbation(this.props.data_table_perturbagens[0].id)
      }
    }

    findId = (name) => {
      // This function finds the perturbagen id given the name from the table.
      // used in getTdProps in the ReactTable
      // This enables the SigPerturbation component to fetch the perturbagen by id.
      let pert =  this.props.data_table_perturbagens.find(p => {
        return p.sm_name == name
      })
      return pert.id
    }

    render() {
        return (
            <div style={ csl } >
                

                < ReactTable
                    data={this.props.data_table_perturbagens}
                    columns={columns}
                    minRows={1}
                    showPagination={false}
                    getTdProps={(state, rowInfo, column, instance) => {
                      return {
                        onClick: (e) => {
                          this.props.changeShowPerturbation(this.findId(rowInfo["original"]["sm_name"]))
                          this.setState({ selected: rowInfo.index})
                        },
                        style: {
                          background: rowInfo.index === this.state.selected ? 'darksalmon' : 'white',
                          color: rowInfo.index === this.state.selected ? 'white' : 'black'
                        }
                      }
                    }}
                />

               

                {this.props.data_table_perturbagens.length > 1 ? null : <h3>Loading...</h3>}

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
            dispatch(getDataTablePerturbagens(str))
        },
        setSuggestStr: (str) => {
            dispatch(setSuggestStr(str))
        },
        changeShowPerturbation: (id) => {
            dispatch(changeShowPerturbation(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePerturbations);
