import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import ModelSystemHeader from './ModelSystemHeader'

let csl = { 'fontSize': '0.8em' };

class PanelModelSystems extends React.Component {

    render() {
        return (
            <div>

                <ModelSystemHeader/>



                <div className=" " style={{ borderColor: 'green', height: '360px' }}>
                    <br />
                    <Link to={"/signatures/models"} style={{ textDecoration: 'none' }}>
                        <div className="row">
                            <button className="btn d-flex w-100"
                                    style={{ borderColor: 'white', color:'gray'  }}>
                                <span className="col-md-4" style={{ textAlign: 'right' }}>
                                    <span style={csl}> <b>88 </b></span>
                                </span>
                                <span className="col-md-8" style={{ textAlign: 'left' }}>
                                    <span style={csl}> Cell Lines </span>
                                </span>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn d-flex w-100"
                                    style={{ borderColor: 'white', color:'gray'  }} disabled>
                                <span className="col-md-4" style={{ textAlign: 'right' }}>
                                    <span style={csl}> <b>Pending </b></span>
                                </span>
                                <span className="col-md-8" style={{ textAlign: 'left' }}>
                                    <span style={csl}> Differentiated cells </span>
                                </span>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn d-flex w-100"
                                    style={{ borderColor: 'white', color:'gray'  }} disabled>
                                <span className="col-md-4" style={{ textAlign: 'right' }}>
                                    <span style={csl}> <b>Pending </b></span>
                                </span>
                                <span className="col-md-8" style={{ textAlign: 'left' }}>
                                    <span style={csl}> Primary Cells </span>
                                </span>
                            </button>
                        </div>
                        <div className="row">
                            <button className="btn d-flex w-100"
                                    style={{ borderColor: 'white', color:'gray'  }} disabled>
                                <span className="col-md-4" style={{ textAlign: 'right' }}>
                                    <span style={csl}> <b>Pending </b></span>
                                </span>
                                <span className="col-md-8" style={{ textAlign: 'left' }}>
                                    <span style={csl}> Embryonic Stem Cells </span>
                                </span>
                            </button>
                        </div>
                        <div className="row">
                            <button className="btn d-flex w-100"
                                    style={{ borderColor: 'white', color:'gray'  }} disabled>
                                <span className="col-md-4" style={{ textAlign: 'right' }}>
                                    <span style={csl}> <b>Pending </b></span>
                                </span>
                                <span className="col-md-8" style={{ textAlign: 'left' }}>
                                    <span style={csl}> IPSCs </span>
                                </span>
                            </button>
                        </div>


                    



                        <br />
                    </Link>
                </div>

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
