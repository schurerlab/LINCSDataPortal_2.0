import React from "react";
import { NavLink } from "react-router-dom";

// stateless component
export const Footer = (props) => {

        return (

            <footer   className=" footer navbar fixed-bottom navbar-fixed-bottom  navbar-expand navbar-dark bg-dark ">
                    <div className="col-2   "><a href="http://www.lincs-dcic.org" target="_blank" style={{color:"#fff"}} ><img src="/media/icons/DCIC_Logo.png" className="footer-image" />
                       <span style={{marginLeft:"0.5em"}}> BD2K-LINCS</span></a></div>
                    <div className="col-2 text-center " ><a style={{color:"#fff"}} href="http://bd2k-lincs.org/#/about#team" target="_blank">Team</a></div>
                    <div className="col-2  text-center "><a style={{color:"#fff"}} href="http://lincsportal.ccs.miami.edu/dcic-portal/#/terms" target="_blank">Terms of use</a></div>
                    <div className="col-2  text-center "><a style={{color:"#fff"}} href="http://lincsportal.ccs.miami.edu/dcic-portal/#/acknowledgement" target="_blank">Acknowledgements</a></div>
                    <div className="col-4  text-left">
                        <p style={{fontSize:"1em",marginTop:"2em"}}>© 2019, LINCS Program. All rights reserved.

                            Funded by <a href="http://commonfund.nih.gov/lincs/" target="_blank">
                                The NIH Common Fund</a>.
                            Developed by the <a href="http://lincs-dcic.org/" target="_blank">
                                BD2K-LINCS DCIC</a>.
                        </p>

                    </div>
            </footer>
        );
    }