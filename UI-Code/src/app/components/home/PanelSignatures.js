import React from "react";

import axios from 'axios';
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import SignaturesHeader from './SignaturesHeader';

let csl = { 'fontSize': '0.8em' };

class PanelSignatures extends React.Component {
    constructor() {
        super();
        this.state = {
            data:[],
        }
    }
    
    // componentWillMount(){
    //     this.getData();
    // }
    // getData(){
    //     axios.request({
    //         method:'get',
    //         url:'http://dev3.ccs.miami.edu:8080/sigc-api/search/count'
    //     }).then((response) => {
    //         console.log(response.data.data)
    //
    //
    //     })
    // }

    render() {
        return (
            <div >



            <SignaturesHeader/>

                <div className="" style={{ borderColor: 'orange', height: '360px' }}>
                    <br />
                    <Link to={"/beta/signatures?signature=Gene Expressions"} style={{ textDecoration: 'none' }}>
                        <div className="row">
                            <button className="btn d-flex w-100"
                                    style={{  color:'gray'  }}>
                                <div className="col-md-4" style={{ textAlign: 'right' }}>
                                    <div style={csl}><b> 570862 </b> </div>
                                </div>
                                <div className="col-md-8" style={{ textAlign: 'left' }}>
                                    <div style={csl}> Gene Expression </div>
                                </div>
                            </button>
                        </div>
                        </Link>
                    <Link to={"/beta/signatures?signature=Proteomics"} style={{ textDecoration: 'none' }}>
                        <div className="row">
                            <button className="btn d-flex w-100"
                                    style={{  color:'gray'  }}>
                                <div className="col-md-4" style={{ textAlign: 'right' }}>
                                    <div style={csl}><b> 2811 </b></div>
                                </div>
                                <div className="col-md-8" style={{ textAlign: 'left' }}>
                                    <div style={csl}> Protein Expression </div>
                                </div>
                            </button>
                        </div>
                        </Link>
                    <Link to={"/beta/signatures?signature=Epigenetic"} style={{ textDecoration: 'none' }}>
                        <div className="row">
                            <button className="btn  d-flex w-100"
                                    style={{ color:'gray'  }}>
                                <div className="col-md-4" style={{ textAlign: 'right' }}>
                                    <div style={csl}><b> 2677 </b></div>
                                </div>
                                <div className="col-md-8" style={{ textAlign: 'left' }}>
                                    <div style={csl}> Epigenetic </div>
                                </div>
                            </button>
                        </div>
</Link>
                    <Link to={"/beta/signatures?signature=Cell Phenotype"} style={{ textDecoration: 'none' }}>
                        <div className="row">
                            <button className="btn  d-flex w-100"
                                    style={{  color:'gray'  }}>
                                <div className="col-md-4" style={{ textAlign: 'right' }}>
                                    <div style={csl}><b> 8240 </b></div>
                                </div>
                                <div className="col-md-8" style={{ textAlign: 'left' }}>
                                    <div style={csl}> Cell Phenotype </div>
                                </div>
                            </button>
                        </div>
</Link>
                    <Link to={"/beta/signatures?signature=Protein Binding"} style={{ textDecoration: 'none' }}>
                        <div className="row">
                            <button className="btn  d-flex w-100"
                                    style={{  color:'gray'  }}>
                                <div className="col-md-4" style={{ textAlign: 'right' }}>
                                    <div style={csl}><b> 193 </b></div>
                                </div>
                                <div className="col-md-8" style={{ textAlign: 'left' }}>
                                    <div style={csl}> Protein Binding </div>
                                </div>
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
