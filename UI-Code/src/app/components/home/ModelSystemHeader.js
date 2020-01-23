import React from "react";

import { Link } from "react-router-dom";

let csl = { 'fontSize': '0.8em' };

class ModelSystemHeader extends React.Component {





    render() {

        return (

            <Link to={"/signatures/models"} style={{ color: '#4CC189' }}>
                <div className="row">
                    <span className="col-md-4" style={{ textAlign: 'right' }}>  <img className="img-fluid" style={{ maxWidth: '30%' }} src="/media/icons/Model_System.png" /> </span>
                    <span  className="col-md-8"  style={{ textAlign: 'left' }}>Model Systems</span>
                </div>
            </Link>

        )
    };
}



export default ModelSystemHeader;
