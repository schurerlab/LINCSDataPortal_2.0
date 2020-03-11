import React from "react";

import { Link } from "react-router-dom";

let csl = { 'fontSize': '0.8em' };

class PerturbationsHeader extends React.Component {





    render() {

        return (

                <Link to={"/signatures/perturbations"} style={{ color: '#CC3300' }}>
                    <div className="row">
                        <span className="col-md-4" style={{ textAlign: 'right' }}>  <img className="img-fluid" style={{ maxWidth: '30%' }} src="/media/icons/Perturbation.png" /> </span>
                        <span  className="col-md-8"  style={{ textAlign: 'left' }}>Perturbations</span>
                    </div>
                </Link>

        )
    };
}



export default PerturbationsHeader;
