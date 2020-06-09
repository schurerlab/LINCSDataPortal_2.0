import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeShowPerturbation } from "../../redux/fetch/get-knockdown"
import axios from 'axios'

let csl = { 'fontSize': '0.8em', 'fontWeight':'500' };
let synonyms;
let synAssay;
class KnockdownShowPage extends React.Component {

    state = {
        SMILESclicked: false,
        InChIclicked: false,
        notFound: false,
        Synclicked:false
    }

    changeState = (v) => {
        this.setState({[v]: !this.state[v]})
    }

    // getSynonyms(){
    //     let id = this.props.id
    //     axios.request({
    //         method:'get',
    //         url:'http://dev3.ccs.miami.edu:8080/sigc-api/search/synonyms?class=small%20molecule&id='+this.props.id
    //     }).then((response) => {
    //         synAssay =response.data.synonyms[id];
    //         synonyms = response.data.synonyms[id].toString()
    //
    //     })
    //
    // }

    componentDidMount() {
        if (!this.props.showPerturbation && this.state.notFound === false)
            this.props.changeShowPerturbation(parseInt(this.props.id, 10))
            console.log(this.props.id);
    }

    componentDidUpdate(prevProps) {
        if (!this.props.showPerturbation && !prevProps.showPerturbation) {
            this.setState({notFound: true})
        }
    }

    componentWillUnmount() {
        let newTitle = document.querySelector('title')
        newTitle.innerHTML = "SignatureCommonsUI"
    }

    render() {

        if (this.props.showPerturbation) {
            let sp = this.props.showPerturbation

            // Change title of the page to perturbation name
            let title = document.querySelector('title')
            title.innerHTML = `${sp.nucleic_acid_reagent_target_locus}`

            return (
                <div style={csl} className="container">
                    <div>
                        <h3 className="text-center "
                            style = {{marginBottom: "40px",color:"#CC3300" }}
                        >
                            {!sp.nucleic_acid_reagent_target_locus ?
                                sp.nucleic_acid_reagent_target_locus
                                : sp.nucleic_acid_reagent_target_locus + " "}
            <span style={{color: "#337ab7"}}>
              ({sp["name"]})
            </span>
                        </h3>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h5 style={{color:"#CC3300"}}>Metadata</h5>
                            <hr style={{borderTop: "1px solid #CC3300"}} />
                            <table className="table"  >
                                <tbody>
                                <tr  style={{padding:".25em"}}>
                                    <th scope="row" style={{width: "25%"}}>Name</th>
                                    <td ><b>{sp.nucleic_acid_reagent_target_locus}</b>
                                    </td>
                                </tr>
                                <tr  >
                                    <th scope="row">Locus</th>
                                    <td><b>{sp.nucleic_acid_reagent_target_locus}</b></td>
                                </tr>
                                <tr  >
                                    <th scope="row">sub type</th>
                                    <td><b>{sp.nucleic_acid_reagent_subtype}</b></td>
                                </tr>
                                <tr  >
                                    <th scope="row">Entrez Id</th>
                                    <td><b>{sp.nucleic_acid_reagent_entrez_gene_id}</b></td>
                                </tr>
                                <tr  >
                                    <th scope="row">Perturbagen Id</th>
                                    <td><b>{sp.perturbagen_id}</b></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-12 col-sm-12" >
                            <br/>
                            <h5  style={{color:"#CC3300"}}>{ sp.nucleic_acid_reagent_target_locus} Signatures</h5>
                            <hr style={{borderTop: "1px solid #CC3300"}} />
          <span>
            <div className = "row">
               <table className="table" >
                <tbody>

                 <tr  >
                    <th scope="row" style={{width: "25%"}}>Gene Expression :</th>
                    <td>
                        <a href={'/signatures/signatures?signature=Gene Expressions&class=small molecule&term='+sp.sm_name}>{sp.signature_category_count['gene expression']}</a>
                    </td>
                </tr>

                 <tr  >
                    <th scope="row" >Epigenetic :</th>
                    <td>
                        <a href={'/signatures/signatures?signature=Epigenetic&class=small molecule&term='+sp.sm_name}>{sp.signature_category_count['epigenetic']}</a>
                    </td>
                </tr>
               <tr  >
                    <th scope="row" >Protein Binding :</th>
                    <td>
                        <a href={'/signatures/signatures?signature=Protein Binding&class=small molecule&term='+sp.sm_name}>{sp.signature_category_count['binding']}</a>
                    </td>
                </tr>
                <tr  >
                    <th scope="row" >Protein Expression :</th>
                    <td>
            <a href={'/signatures/signatures?signature=Proteomics&class=small molecule&term='+sp.sm_name}>{sp.signature_category_count['proteomics']}</a>                    </td>
                </tr>
                <tr  >
                    <th scope="row" >Cell Phenotype :</th>
                    <td>
                    <a href={'/signatures/signatures?signature=Cell Phenotype&class=small molecule&term='+sp.sm_name}>{sp.signature_category_count['cell phenotype']}</a>
                    </td>
                </tr>
                  </tbody>
               </table>

            </div>
          </span><br/>
                        </div>
                    </div>
                    <br/>
                </div>
            )
        } else if (this.state.notFound) {
            return (
                <div className="text-center">
                    <h3 className="text-center">
                        Oops! This page doesn't exist!
                    </h3>
                    <Link to="/">Return Home</Link>
                </div>
            )
        } else {
            return (
                <div className="text-center" style={{padding: "40px"}}>
                    <h3 className="text-center">
                        Loading...
                    </h3>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    showPerturbation: state.perturbationsReducer.showPerturbation
})

const mapDispatchToProps = (dispatch) => {
    return {
        changeShowPerturbation: (id) => {
            dispatch(changeShowPerturbation(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KnockdownShowPage)
