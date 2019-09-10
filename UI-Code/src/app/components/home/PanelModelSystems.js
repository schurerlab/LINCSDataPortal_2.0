import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

let csl = { 'fontSize': '0.8em' };

class PanelModelSystems extends React.Component {

    render() {
        return (
            <div>
                <div style={{ color: 'green' }}> Model Systems </div>
                <div className="card container" style={{ borderColor: 'green', height: '360px' }}>
                    <br />
                    <Link to={"/models"} style={{ textDecoration: 'none' }}>
                        <div className="row">
                            <button className="btn btn-outline-success d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/cells.png" />
                                </div>
                                <div className="col-md-8">
                                    <div>{this.props.vals.n_cells}</div>
                                    <div style={csl}> Cells </div>
                                </div>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn btn-outline-success d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/cell_types.png" />
                                </div>
                                <div className="col-md-8">
                                    <div>{this.props.vals.n_celltypes}</div>
                                    <div style={csl}> Cell Types </div>
                                </div>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn btn-outline-success d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/diseases.png" />
                                </div>
                                <div className="col-md-8">
                                    <div>{this.props.vals.n_diseases}</div>
                                    <div style={csl}> Diseases </div>
                                </div>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn btn-outline-success d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/tissue_types.png" />
                                </div>
                                <div className="col-md-8">
                                    <div>{this.props.vals.n_tissuetypes}</div>
                                    <div style={csl}> Tissue Types </div>
                                </div>
                            </button>
                        </div>
                        <br />
                    </Link>
                </div>
                <div style={{ height: '3px' }}></div>
                <button className="btn btn-light d-flex w-100 justify-content-between"
                    style={{ borderColor: 'forestgreen' }}>
                    <div>Browse</div>
                    <div>{this.props.vals.n_modelsystems}</div>
                </button>
            </div>
        )
    };
}

// redux store
const mapStateToProps = (state) => {
    return {
        vals: state.modelsystemsReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newdispatch: () => {
            dispatch(actionCreator)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelModelSystems);