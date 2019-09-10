import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Navbar } from "./Navbar";
import { SigHome } from "../pages/SigHome";
import { SigDatasets } from "../pages/SigDatasets";
import { SigPerturbations } from "../pages/SigPerturbations";
import { SigModels } from "../pages/SigModels";
import { SigReadouts } from "../pages/SigReadouts";
import { SigSignatures } from "../pages/SigSignatures";

import { getCounts } from "../redux/fetch/get-counts";

class Main extends React.Component {

    // SETING THE INITIAL STATE OF THE APP
    
    componentDidMount() {
        // this.props.getCounts();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar />

                    <br /><br /><br /><br /><br />

                    <div className="container">

                        <Route exact path="/" render={(props) => (
                            <Redirect from="/" to="/home" />
                        )} />
                        <Route path="/home" render={(props) => <SigHome />} />
                        <Route path="/datasets" render={(props) => <SigDatasets />} />
                        <Route path="/perturbations" render={(props) => <SigPerturbations />} />
                        <Route path="/models" render={(props) => <SigModels />} />
                        <Route path="/readouts" render={(props) => <SigReadouts />} />
                        <Route path="/signatures" render={(props) => <SigSignatures />} />
                    </div>
                </div>
            </BrowserRouter>
        )
    };
}

// redux store
const mapStateToProps = (state) => {
    return {
        vals: state.perturbationsReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCounts: () => {
            dispatch(getCounts())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
