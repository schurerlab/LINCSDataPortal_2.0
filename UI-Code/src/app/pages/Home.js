import React from "react";

import Search from "../components/home/Search";

import PanelPerturbations from "../components/home/PanelPerturbations";
import PanelModelSystems from "../components/home/PanelModelSystems";
import PanelSignatures from "../components/home/PanelSignatures";
import PanelSide from "../components/home/PanelSide";

export const SigHome = (props) => {
    return (
        <div >
            <div className="row">
                

            </div>
            <div className="row">
                <div className="col-md-3">
                     <PanelPerturbations />
                </div>
                <div className="col-md-3">
                    <PanelModelSystems />
                </div>
                <div className="col-md-3">
                    <PanelSignatures />
                </div>
            </div>
        </div>
)
}


