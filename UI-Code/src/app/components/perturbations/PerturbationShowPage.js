import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeShowPerturbation } from "../../redux/fetch/get-perturbation"
import PhysicochemicalProperties from "./PhysicochemicalProperties"
import ReagentDatasets from "../../components/datasets/ReagentDatasets"
import Bioactivity  from "./Bioactivity"
import axios from 'axios'
import EntitySignatureTable from '../modelSystems/EntitySignatureTable'

let csl = { 'fontSize': '0.8em', 'fontWeight':'500' };
let synonyms;
let synAssay;
class PerturbationShowPage extends React.Component {


  state = {
    SMILESclicked: false,
    InChIclicked: false,
    notFound: false,
      Synclicked:false
  }

  changeState = (v) => {
    this.setState({[v]: !this.state[v]})
  }

    getSynonyms(){
        let id = this.props.id
        axios.request({
            method:'get',
            url:'http://dev3.ccs.miami.edu:8080/sigc-api/search/synonyms?class=small%20molecule&id='+this.props.id
        }).then((response) => {
            synAssay =response.data.synonyms[id];
             synonyms = response.data.synonyms[id].toString()

        })

    }

  componentDidMount() {
   
    if (!this.props.showPerturbation && this.state.notFound === false)
    this.props.changeShowPerturbation(parseInt(this.props.id, 10))
      this.getSynonyms();
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
      let sp = this.props.showPerturbation;
      let data = new Object();

      data = { "signatures":this.props.showPerturbation.signature_category_count};

      // let data = data.signatures=[this.props.showPerturbation.signature_category_count];
      // console.log(data);

      // Change title of the page to perturbation name
      let title = document.querySelector('title')
      title.innerHTML = `${sp.sm_name}`

      return (
        <div style={csl} className="container">
          <div>
            <h3 className="text-center "
              style = {{marginBottom: "40px",color:"#CC3300" }}
            >
              {!sp.sm_name ?
                sp["Library of Integrated Network-base Cellular Signatures Data and Signature Genration Centers"][0]
                : sp.sm_name + " "}
            <span style={{color: "#337ab7"}}>
              ({sp["LINCS Data Portal"][0]})
            </span>
            </h3>
          </div>
          <div className="row">
            <div className="col-12">
            <h5 style={{color:"#CC3300"}}>Metadata</h5>
            <hr style={{borderTop: "1px solid #CC3300"}} />
            </div>
            <div className="col-lg-8 col-sm-12">
              <table className="table"  >
                <tbody>
                  <tr  style={{padding:".25em"}}>
                    <th scope="row" style={{width: "25%"}}>Name</th>
                    <td ><b>{!sp.sm_name ?
                      sp["Library of Integrated Network-base Cellular Signatures Data and Signature Genration Centers"][0]
                      : sp.sm_name + " "}</b>
                    </td>
                  </tr>
                  <tr  >
                    <th scope="row">LINCS (ID)</th>
                    <td><b>{sp["LINCS Data Portal"][0]}</b></td>
                  </tr>
                  <tr  >
                      <th scope="row">Synonyms</th>
                      <td>

                          <div>
                              <b> {this.state.Synclicked ? synonyms : synAssay.slice(0,6).toString()} </b>
                          </div>
                          <div>
                              <label className="btn-show-hide" onClick={() => this.changeState("Synclicked")}>
                                  {this.state.Synclicked ? "Less" : "More"}
                                  <i className={this.state.Synclicked ? "fa fa-chevron-up" : "fa fa-chevron-down"}/>
                              </label>
                          </div>
                      </td>
                  </tr>
                  {sp.PubChem ? <tr  >
                    <th scope="row">PubChem (CID)</th>
                    <td>
                      <b> <a href = {`https://pubchem.ncbi.nlm.nih.gov/compound/${sp.PubChem[0]}`}
                        target = "_blank">
                      {sp.PubChem[0]}</a> </b>
                    </td>
                  </tr> : null }
                  {sp.ChEMBL ? <tr  >
                    <th scope="row">ChEMBL (ID)</th>
                    <td><b>{[...new Set(sp.ChEMBL)].map(id =>{
                      return (
                        <span key={id}>
                          <a href={`https://www.ebi.ac.uk/chembl/compound/inspect/${id}`}
                          target="_blank">{id}</a>{" "}
                        </span>
                      )
                    })} </b></td>
                  </tr> : null }
                  <tr  >
                    <th scope="row">MOA</th>
                    <td><b>{sp.moa ? sp.moa.toString() : "-"}</b></td>
                  </tr>
                  <tr  >
                    <th scope="row">Target</th>
                    <td><b>{sp.target ? sp.target.toString() : "-"}</b></td>
                  </tr>
                  <tr  >
                    <th scope="row">Phase</th>
                    <td><b>{sp.max_fda_phase}</b></td>
                  </tr>
                  <tr  >
                    <th scope="row">SMILES</th>
                    <td>
                      <div>
                        <label className="btn-show-hide" onClick={() => this.changeState("SMILESclicked")}>
                          {this.state.SMILESclicked ? "Hide" : "Show"}
                          <i className={this.state.SMILESclicked ? "fa fa-chevron-up" : "fa fa-chevron-down"}/>
                        </label>
                      </div>
                      <div>
                        <b> {this.state.SMILESclicked ? sp.canonical_smiles : null} </b>
                      </div>
                    </td>
                  </tr>
                  <tr  >
                    <th scope="row">InChI</th>
                    <td>
                      <div>
                        <label className="btn-show-hide" onClick={() => this.changeState("InChIclicked")}>
                          {this.state.InChIclicked ? "Hide" : "Show"}
                          <i className={this.state.InChIclicked ? "fa fa-chevron-up" : "fa fa-chevron-down"}/>
                        </label>
                      </div>
                      <div>
                        <b> {this.state.InChIclicked ? sp.canonical_inchi : null} </b>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-lg-4 col-sm-12" style={{ border: "0.1px solid #bdc3c7"}}>
              <br/>
              <img className="img-responsive col-sm-12 rounded mx-auto d-block" style={{maxWidth:"25em"}}
                src={`http://life.ccs.miami.edu/life/web/images/SigC-SmImages/${sp.perturbagen_id}.png`}
              />
              <h5 className="text-center" style={{color:"#CC3300"}}>{ sp.sm_name} Signatures</h5>
          <span>
            <div className = "row">
               <table className="table-pert col-lg-6 col-sm-12"  >
               <EntitySignatureTable data={data} type='small molecule' name={sp.sm_name}></EntitySignatureTable>
               </table>
            </div>
          </span><br/>
            </div>
          </div>
          <br/>
          <PhysicochemicalProperties sp={sp}/>
            <Bioactivity sp={sp}/>
          <ReagentDatasets id={'smlincsidentifier:"'+sp["LINCS Data Portal"][0]} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PerturbationShowPage)
