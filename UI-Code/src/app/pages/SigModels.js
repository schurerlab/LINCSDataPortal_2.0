import React from "react";

import TableModelSystems from "../components/home/TableModelSystems";
import PanelSide from "../components/home/PanelSide";

export const SigModels = (props) => {
    return (
        <div >
        <div className="row">
            <div className="col-md-3">
                <PanelSide />
            </div>
            <div className="col-md-9">
                <TableModelSystems />
            </div>
            
        </div>
    </div>
    )
}

