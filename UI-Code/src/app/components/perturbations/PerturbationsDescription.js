import React from "react";
import {Well, FormControl} from 'react-bootstrap';

class PerturbationsDescription extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            value: props.value
        }
    }

    onChange(e){

        this.setState({value: e.target.value});
        this.props.onChange(this.state.value);

    }

    render() {
        return (
            <div className="row" >
                    <div className="col-2">
                        <img className="circle pull-right" src="/media/nav/pertLogo.png" style= {{background: "rgb(53, 147, 177)",height: "10em",width:"10em"}}  />
                    </div>
                <div className="col-10">
                    <b style={{  fontSize: "40px"}}> Perturbations</b>
                    <br></br>
                   <h3 style= {{width: "auto",margin: "0%",background: "none", color: "grey",fontSize: "24px",fontWeight: "200"}}> The effect of a perturbing agent in a biological model system, measuring one or multiple effect(s) of the agent facilitated by an assay design method translates the perturbation into a detectable signal to arrive at one or multiple endpoint(s) that quantify or qualify the extent of the perturbation.
                    </h3>
                    <br></br>
                    <br></br>
                </div>

            </div>
        )
    }
}

export default PerturbationsDescription;
