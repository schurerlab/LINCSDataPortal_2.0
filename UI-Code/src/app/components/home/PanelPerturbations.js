import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

let csl = { 'fontSize': '0.8em' };

class PanelPerturbations extends React.Component {

    render() {
        return (
            <div>
                <div style={{ color: 'red' }}> Perturbations</div>
                <div className="card container" style={{ borderColor: 'red', height: '360px' }}>
                    <br />
                    <Link to={"/perturbations"} style={{ textDecoration: 'none' }}>
                        <div className="row">
                            <button className="btn btn-outline-danger d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/smallmolecule.png" />
                                </div>
                                <div className="col-md-8">
                                    <div>{this.props.vals.n_smallmolecules}</div>
                                    <div style={csl}> Small Molecules </div>
                                </div>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn btn-outline-danger d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/shrna.svg" />
                                </div>
                                <div className="col-md-8">
                                    <div className="align-left">{this.props.vals.n_shrnas}</div>
                                    <div style={csl}> shRNAs </div>
                                </div>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn btn-outline-danger d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/cdna.svg" />
                                </div>
                                <div className="col-md-8">
                                    <div>{this.props.vals.n_cdnas}</div>
                                    <div style={csl}> cDNAs </div>
                                </div>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn btn-outline-danger d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/antibody.png" />
                                </div>
                                <div className="col-md-8">
                                    <div>{this.props.vals.n_antibodies}</div>
                                    <div style={csl}> Antibodies </div>
                                </div>
                            </button>
                        </div>

                        <div className="row">
                            <button className="btn btn-outline-danger d-flex w-100"
                                style={{ borderColor: 'white' }}>
                                <div className="col-md-4">
                                    <img className="img img-fluid" src="./media/icons/microenvironment.png" />
                                </div>
                                <div className="col-md-8">
                                    <div>{this.props.vals.n_microenvironments}</div>
                                    <div style={{ 'fontSize': '0.7em' }}> Microenvironments </div>
                                </div>
                            </button>
                        </div>
                    </Link>
                </div>
                <div style={{ height: '3px' }}></div>
                <button className="btn btn-light d-flex w-100 justify-content-between"
                    style={{ borderColor: 'red' }}>
                    <div>Browse</div>
                    <div>{this.props.vals.n_perturbations}</div>
                </button>
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