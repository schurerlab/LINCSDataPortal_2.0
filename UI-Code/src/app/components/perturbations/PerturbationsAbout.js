import React from "react";
import {Well, FormControl} from 'react-bootstrap';

class PerturbationsAbout extends React.Component {


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
                <div className="col-4">
                    <h3 style={{color: "#5a5a5a",fontWeight: "200"}}>Search for Perturbagens</h3>
                    <p>
                        Search all kinds of Perturbagens by generic names, synonyms, trade names and explore across LINCS datasets,  model systems and annotations.
                    </p>

                    <p>Example search for <a href="/perturbations/smallmolecules/catalog?query=Seliciclib">Seliciclib</a> can query using either <a href="/perturbations/smallmolecules/catalog?query=Roscovitine">"Roscovitine"</a> or <a href="/perturbations/smallmolecules/catalog?query=CYC-202">"CYC-202" </a>.A comprehensive list of generic names and synonyms are also stored and can be used as search terms.</p>
                </div>
                <div className="col-4">
                    <h3 style={{color: "#5a5a5a",fontWeight: "200"}}>Explore Annotations</h3>
                    <p>Search can be performed by a wide set of annotations such as mechanism of actions <a href="/perturbations/smallmolecules/catalog?query=Cyclin-dependent kinase 2 inhibitor">Cyclin-dependent kinase 2 inhibitor</a>,  MESH terms <a href="/perturbations/smallmolecules/catalog?query=CARCINOMA">CARCINOMA</a>, EFO terms <a href="/perturbations/smallmolecules/catalog?query=CYSTIC FIBROSIS">CYSTIC FIBROSIS</a> and cells <a href="/perturbations/smallmolecules/catalog?query=mcf7">MCF7</a>.   </p>
                </div>
                <div className="col-4">
                    <h3 style={{color: "#5a5a5a",fontWeight: "200"}}>Advanced Search</h3>
                    <p> Search also facilitates AND , OR , NOT queries. Some examples 1) find Small Molecules that are used in KINOMEscan and L1000 assays. 2) Find CRISPR Perturbagens </p>
                </div>

            </div>
        )
    }
}

export default PerturbationsAbout;
