import React from "react";
import { NavLink } from "react-router-dom";

// stateless component
export const Navbar = (props) => {

    let menuStyle = { cursor: 'pointer' };

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <a href="./">
                            <img className="navbar-brand" src="./media/nav/logo.png" height="50px" />
                        </a>
                    </div>
                    <div className="col-sm-8" style={{ color: 'white', }}>
                        Signature Store <br/>
                        <span style={{ fontSize: '0.8em', }}> Data Portal </span>
                    </div>
                </div>

                <button className="navbar-toggler" type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse w-90 navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav nav-pills ml-auto">

                        <li className="nav-item">
                            <NavLink to={"/home"} className={"nav-link"} activeClassName={"active"}>
                                <div><img className="mx-auto d-block" src="./media/nav/homeLogo.png" height="24px" /></div>
                                <div><span style={{ fontSize: '0.8em', }}>  Home </span></div>
                            </NavLink></li>

                        <li className="nav-item">
                            <NavLink to={"/datasets"} className={"nav-link"} activeClassName={"active"}>
                                <div><img className="mx-auto d-block" src="./media/nav/datasetsLogo.png" height="24px" /></div>
                                <div><span style={{ fontSize: '0.8em', }}> Datasets </span>  </div>
                            </NavLink></li>

                        <li className="nav-item">
                            <NavLink to={"/perturbations"} className={"nav-link"} activeClassName={"active"}>
                                <div><img className="mx-auto d-block" src="./media/nav/pertLogo.png" height="24px" /></div>
                                <div><span style={{ fontSize: '0.8em', }}> Perturbations </span>  </div>
                            </NavLink></li>

                        <li className="nav-item">
                            <NavLink to={"/models"} className={"nav-link"} activeClassName={"active"}>
                                <div><img className="mx-auto d-block" src="./media/nav/modelLogo.png" height="24px" /></div>
                                <div><span style={{ fontSize: '0.8em', }}> Model Systems </span>  </div>
                            </NavLink></li>

                        <li className="nav-item">
                            <NavLink to={"/readouts"} className={"nav-link"} activeClassName={"active"}>
                                <div><img className="mx-auto d-block" src="./media/nav/readoutsLogo.png" height="24px" /></div>
                                <div><span style={{ fontSize: '0.8em', }}> Readouts </span>  </div>
                            </NavLink></li>

                        <li className="nav-item">
                            <NavLink to={"/signatures"} className={"nav-link"} activeClassName={"active"}>
                                <div><img className="mx-auto d-block" src="./media/nav/signaturesLogo.png" height="24px" /></div>
                                <div><span style={{ fontSize: '0.8em', }}> Signatures </span>  </div>
                            </NavLink></li>

                    </ul>
                </div>
            </div>
        </nav >
    );
}