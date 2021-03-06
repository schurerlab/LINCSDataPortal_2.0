import React from "react";
import { connect } from "react-redux";

import PanelQuery from "./side/PanelQuery";
import { PanelFilter } from "./side/PanelFilter";


class PanelSide extends React.Component {

    constructor() {
        super();
        this.state = {
            subpanel: "query"
        };
    }

    changeSubPanel(newSubPanel) {
        this.setState({
            subpanel: newSubPanel
        });
    }

    render() {
        return (

            <div>


                <div className="nav-item" >
                    <a className={(() => {
                            switch (this.state.subpanel) {
                                case 'query':
                                    return "nav-link active";
                                default:
                                    return "nav-link";
                            }
                        })()}
                       onClick={() => this.changeSubPanel('query')}>
                    </a>
                </div>


                <div className=" border-top-0 border-bottom-0 rounded-0">

                    {(() => {
                        switch (this.state.subpanel) {
                            case 'filter':
                                return <PanelFilter />;
                            default:
                                return <PanelQuery />;
                        }
                    })()}

                </div>
            </div>


        )
    };
}




// redux store
const mapStateToProps = (state) => {
    return {
        str: state.null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newdispatch: (str) => {
            dispatch();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelSide);
