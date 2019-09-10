import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

let csl = { 'fontSize': '0.8em' };

class PanelSignatures extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div >
                <div style={{ color: 'orange' }}> Signatures </div>
                <div className="card container" style={{ borderColor: 'orange', height: '360px' }}>
                    <br />
                    <Link to={"/signatures"} style={{ textDecoration: 'none' }}>
                        <div className="row">
                            <button className="btn btn-outline-warning d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/epigenetic.svg" />
                                </div>
                                <div className="col-md-8">
                                    <div>{this.props.vals.n_transcriptional}</div>
                                    <div style={csl}> Transcriptional </div>
                                </div>
                            </button>
                        </div>


                        <div className="row">
                            <button className="btn btn-outline-warning d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/doseresponse.svg" />
                                </div>
                                <div className="col-md-8">
                                    <div>{this.props.vals.n_doseresponse}</div>
                                    <div style={csl}> Dose Response </div>
                                </div>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn btn-outline-warning d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/cell_phenotype.svg" />
                                </div>
                                <div className="col-md-8">
                                    <div>{this.props.vals.n_cellphenotype}</div>
                                    <div style={csl}> Cell Phenotype </div>
                                </div>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn btn-outline-warning d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/proteomic.svg" />
                                </div>
                                <div className="col-md-8">
                                    <div>{this.props.vals.n_proteomic}</div>
                                    <div style={csl}> Proteomic </div>
                                </div>
                            </button>
                        </div>


                        <div className="row">
                            <button className="btn btn-outline-warning d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/epigenetic.svg" />
                                </div>
                                <div className="col-md-8">
                                    <div>{this.props.vals.n_epigenetic}</div>
                                    <div style={{ fontSize: '0.8em' }}> Epigenetic </div>
                                </div>
                            </button>
                        </div>
                    </Link>
                </div>


                <div style={{ height: '3px' }}></div>
                <button className="btn btn-light d-flex w-100 justify-content-between"
                    style={{ borderColor: 'orange' }}>
                    <div>Browse</div>
                    <div>{this.props.vals.n_signatures}</div>
                </button>
            </div>
        )
    };
}

// redux store
const mapStateToProps = (state) => {
    return {
        vals: state.signaturesReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newdispatch: () => {
            dispatch(actionCreator)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelSignatures);