import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
// stateless component
export const Navbar = (props) => {

    let menuStyle = { cursor: 'pointer' };

    return (
        <nav className="navbar  navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4">
                    <NavLink to={"/signatures"} className={"nav-link"} style={{ color: 'white',fontSize:"20px"}}>
                        {/* <a Link="/signatures"> */}
                            <img className="navbar-brand" src="/media/nav/logo.png" height="60px" />
                        {/* </a> */}
                        </NavLink>
                    </div>
                    <div className="col-sm-8" style={{ color: 'white'}} >
                        <NavLink to={"/signatures"} className={"nav-link"} style={{ color: 'white',fontSize:"20px",marginTop:"1em",marginLeft:"-1em"}}>
                                LINCS Data Portal 2.0
                        </NavLink>
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
                            <NavLink to={"/signatures/assays"} className={"nav-link"} >
                                <div><img className="mx-auto d-block" src="/media/nav/datasetsLogo.png" height="24px" /></div>
                                <div><span style={{ fontSize: '0.8em', }}> Assays </span>  </div>
                            </NavLink>
                           </li>

                        <li className="nav-item">
                            <NavLink to={"/signatures/perturbations"} className={"nav-link"} >
                                <div><img className="mx-auto d-block" src="/media/nav/pertLogo.png" height="24px" /></div>
                                <div><span style={{ fontSize: '0.8em' }}> Perturbations </span>  </div>
                            </NavLink>

                        </li>

                        <li className="nav-item">
                            <NavLink to={"/signatures/models"} className={"nav-link"} >
                                <div><img className="mx-auto d-block" src="/media/nav/modelLogo.png" height="24px" /></div>
                                <div><span style={{ fontSize: '0.8em' }}> Model System </span>  </div>
                            </NavLink>
                        </li>



                        <li className="nav-item">
                            <NavLink to={"/signatures/signatures"} className={"nav-link"}>
                                <div><img className="mx-auto d-block" src="/media/nav/signaturesLogo.png" height="24px" /></div>
                                <div><span style={{ fontSize: '0.8em' }}> Signatures </span>  </div>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <a href="http://dev3.ccs.miami.edu:8080/sigc-api/swagger-ui.html" target="_blank" className={"nav-link"} >
                                <div><img className="mx-auto d-block" src="/media/nav/api_icon2.png" height="24px" /></div>
                                <div><span style={{ fontSize: '0.8em' }}> Data Access </span>  </div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/signatures/help"} className={"nav-link"}>
                                <div><img className="mx-auto d-block" src="/media/nav/help_icon2.png" height="24px" /></div>
                                <div><span style={{ fontSize: '0.8em' }}> Help </span>  </div>
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </nav >
    );
}
