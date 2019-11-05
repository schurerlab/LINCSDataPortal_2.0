import React from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

let csl = { 'fontSize': '0.8em' };

import PerturbationsHeader from './PerturbationsHeader';

class PanelPerturbations extends React.Component {





    render() {

        return (

            <div>


                    <PerturbationsHeader/>
                  
                
                <div className="" style={{  height: '360px' }}>
                    <br />

                    <Link to={"/signatures/perturbations"} style={{ textDecoration: 'none' }}>
                        <div className="row">
                            <button className="btn  d-flex w-100"
                                    style={{ borderColor: 'white', color:'gray' }}>
                                <span className="col-md-4" style={{ textAlign: 'right' }}>
                                    <span style={csl}><b> 21231 </b></span>
                                </span>
                                <span className="col-md-8"  style={{ textAlign: 'left' }}>
                                    <span style={csl}>Small Molecules  </span>
                                </span>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn  d-flex w-100"
                                    style={{ borderColor: 'white', color:'gray' }}>
                                <span className="col-md-4" style={{ textAlign: 'right' }}>
                                    <span style={csl}><b> 745 </b> </span>
                                </span>
                                <span className="col-md-8" style={{ textAlign: 'left' }}>
                                    <span style={csl}> shRNA  </span>
                                </span>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn  d-flex w-100"
                                    style={{ borderColor: 'white', color:'gray' }}>
                                <span className="col-md-4" style={{ textAlign: 'right' }}>
                                    <span style={csl}><b> 376 </b> </span>
                                </span>
                                <span className="col-md-8" style={{ textAlign: 'left' }}>
                                    <span style={csl}> sgRNA  </span>
                                </span>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn   d-flex w-100"
                                    style={{ borderColor: 'white', color:'gray' }} disabled>
                                <span className="col-md-4" style={{ textAlign: 'right' }}>
                                    <span style={csl}><b>Pending</b></span>
                                </span>
                                <span className="col-md-8"  style={{ textAlign: 'left' }}>
                                    <span style={csl}>Gene overexpression </span>
                                </span>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn   d-flex w-100"
                                    style={{ borderColor: 'white', color:'gray' }} disabled>
                                <span className="col-md-4" style={{ textAlign: 'right' }}>
                                    <span style={csl}><b>Pending</b></span>
                                </span>
                                <span className="col-md-8"  style={{ textAlign: 'left' }}>
                                    <span style={csl}>Microenviroments </span>
                                </span>
                            </button>
                        </div>

                    </Link>
                </div>

            </div>
        )
    };
}

// redux store
const mapStateToProps = (state) => {
    return {
        vals: state.perturbationsReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newDispatch: (n) => {
            dispatch()
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPerturbations);
