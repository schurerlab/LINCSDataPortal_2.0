import React from "react";

import PanelPerturbations from "../components/home/PanelPerturbations";
import PanelSide from "../components/home/PanelSide";

export const SigSignatures = (props) => {
    return (
        <div >
            <div className="row">
                <div className="col-md-3">
                    <PanelSide />
                </div>
                <div className="col-md-9">
                    <PanelPerturbations />
                </div>
                
            </div>
        </div>
    )
}

