import React from "react";

import PanelPerturbations from "../components/home/PanelPerturbations";
import PanelModelSystems from "../components/home/PanelModelSystems";
import PanelSignatures from "../components/home/PanelSignatures";
import Search from "../components/home/Search";

export const SigHome = (props) => {
    return (
        <div>
            <div className="row">
                <div  className="col-1"></div>
                <div className="col-10" >
                    < Search />
                </div>

            </div>
            
        </div>
    )
}

