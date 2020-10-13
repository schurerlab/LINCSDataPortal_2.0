import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import '../../index.css'
import '../../titip.min.css';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SigHome } from "../pages/SigHome";
import { Help } from "../pages/Help";
import { SigAssays } from "../pages/SigAssays";
import { BigQuery } from "../pages/BigQuery";
import { SigDatasets } from "../pages/SigDatasets";
import SigPerturbations from "../pages/SigPerturbations";
import { SigModels } from "../pages/SigModels";
import { SigReadouts } from "../pages/SigReadouts";
import { SigSignatures } from "../pages/SigSignatures";
import PerturbationShowPage from "../components/perturbations/PerturbationShowPage";
import ModelSystemLandingPage from "../components/modelSystems/ModelSystemLandingPage";
import AssayLandingPage from "../components/assays/AssayLandingPage";
import DatasetLandingPage from "../components/datasetLandingPages/DatasetLandingPage";
import SignaturesZScores from "../components/signatures/SignaturesZScores";
import { ContextProvider } from '../Context';

// import { getCounts } from "../redux/fetch/get-counts";

class Main extends React.Component {

    // SETING THE INITIAL STATE OF THE APP

    componentDidMount() {
        // this.props.getCounts();
    }

    render() {
        return (

            <BrowserRouter>
            <ContextProvider>
                <div>
                    <Navbar />


                    <div style={{ marginTop: "6em"}} className="offset-1 col-md-10 col-sm-12 col-lg-10">

                        <Route exact path="/signatures" render={(props) => (
                            <Redirect from="/signatures" to="/signatures/home" />
                        )} />
                        <Route path="/signatures/home" render={(props) => <SigHome />} />
                        <Route exact path="/signatures/assays" render={ (props) => <SigAssays />} />
                        <Route exact path="/signatures/assays/:dataset_id" render={
                          (props) => <AssayLandingPage id={props.match.params.dataset_id}/>}
                        />
                        <Route exact path="/signatures/datasets/:dataset_id" render={
                          (props) => <DatasetLandingPage id={props.match.params.dataset_id}/>}
                        />
                        <Route exact path="/signatures/perturbations" render={(props) => <SigPerturbations />} />
                        <Route exact path="/signatures/perturbations/:perturbation_id" render={
                          (props) => <PerturbationShowPage id={props.match.params.perturbation_id}/>}
                        />
                        <Route exact path="/signatures/models" render={(props) => <SigModels />} />
                        <Route exact path="/signatures/models/:id" render={
                          (props) => <ModelSystemLandingPage id={props.match.params.id}/>}
                        />
                        <Route path="/signatures/structure-search" render={(props) => <SigReadouts />} />
                        <Route path="/signatures/signatures" render={(props) => <SigSignatures />} />
                        <Route path="/signatures/signature-search-results" render={(props) => <SignaturesZScores mode={props.location.state.mode} data={props.location.state.data}/>} />
                        <Route path="/signatures/help" render={(props) => <Help/>} />
                        <Route path="/signatures/bigquery" render={(props) => <BigQuery/>} />
                    </div>
                    <Footer />
                </div>
                </ContextProvider>
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
