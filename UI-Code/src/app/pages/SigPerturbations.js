import React from "react";

import TablePerturbations from "../components/home/TablePerturbations";
import PanelSide from "../components/home/PanelSide";

export const SigPerturbations = (props) => {
    return (
        <div >
            <div className="row">
                <div className="col-md-3">
                    <PanelSide />
                </div>
                <div className="col-md-9">
                    <TablePerturbations />
                </div>
                
            </div>
        </div>
    )
}

