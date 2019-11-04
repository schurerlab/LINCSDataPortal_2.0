import React from "react";
import { connect } from "react-redux"

import Perturbations from "../components/perturbations/Perturbations";
import PerturbationDetail from "../components/perturbations/PerturbationDetail"
// import PerturbationsSearch from "../components/perturbations/";
// import PerturbationsDescription from "../components/perturbations/PerturbationsDescription";
// import PerturbationsAbout from "../components/perturbations/PerturbationsAbout";


export default class SigPerturbations extends React.Component{

    render() {
      return (
          <div >
              <Perturbations></Perturbations>

          </div>

      )
    }
}
