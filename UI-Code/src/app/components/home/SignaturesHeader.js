import React from "react";

import { Link } from "react-router-dom";

let csl = { 'fontSize': '0.8em' };

class SignaturesHeader extends React.Component {





    render() {

        return (

            <Link to={"/beta/signatures"} style={{ color: '#FF9900' }}>
                <div className="row">
                    <span className="col-md-4" style={{ textAlign: 'right' }}>  <img className="img-fluid" style={{ maxWidth: '30%' }} src="/media/icons/Signatures.png" /> </span>
                    <span  className="col-md-8"  style={{ textAlign: 'left' }}>Signatures</span>
                </div>
            </Link>

        )
    };
}



export default SignaturesHeader;
