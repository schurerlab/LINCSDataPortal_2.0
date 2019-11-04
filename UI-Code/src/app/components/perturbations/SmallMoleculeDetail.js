import React from 'react'

export default class SmallMoleculeDetail extends React.Component {

  state = {
    SMILESclicked: false,
    InChIclicked: false,
    PubChemclicked: false,
    ChEMBLclicked: false
  }

  changeState = (v) => {
    this.setState({[v]: !this.state[v]})
  }

  render() {
    let sp = this.props.showPerturbation
    return (
      <div className="body-text">
        <div>
          <b>Category:</b><span> Small Molecule</span>
        </div>
        <div className="text-center">
          <img
            src={`http://life.ccs.miami.edu/life/web/images/SigC-SmImages/${sp.id}.png`}
            className="img-responsive"
            style={{maxHeight: "10em"}}
          />
        </div>
        <span><b>MOA:</b> {sp.moa ? sp.moa : null}</span><br/>
        <span><b>Development Phase:</b> {sp.max_fda_phase[0]}</span><br/>

        {sp.canonical_smiles ? <span><div>
          <b>SMILES:</b>
          <label className="btn-show-hide" onClick={() => this.changeState("SMILESclicked")}>
            {this.state.SMILESclicked ? "Hide" : "Show"}
            <i className={this.state.SMILESclicked ? "fa fa-chevron-up" : "fa fa-chevron-down"}/>
          </label>
        </div>
        <div className="col-md-12">
          {this.state.SMILESclicked ? sp.canonical_smiles : null}
        </div></span> : null }

        
        {sp.canonical_inchi ? <span><div>
          <b>InChI:</b>
          <label className="btn-show-hide" onClick={() => this.changeState("InChIclicked")}>
            {this.state.InChIclicked ? "Hide" : "Show"}
            <i className={this.state.InChIclicked ? "fa fa-chevron-up" : "fa fa-chevron-down"}/>
          </label>
        </div>
        <div className="col-md-12">
          {this.state.InChIclicked ? sp.canonical_inchi : null}
        </div></span> : null }

        <div className="properties-header">Signatures</div>
        <hr className="border-line"/>
        <span>Signature Categories</span><br/>
        <hr style={{borderTop: "1px solid whitesmoke"}} />
          <span>
                     <img style={{maxHeight: "30px"}}
                          src="http://dev3.ccs.miami.edu:8080/SignatureCommons/images/u151.svg"/>
                        Gene Expression:   <a href={'/beta/signatures?signature=Gene Expressions&class=small molecule&term='+sp.sm_name}>{sp.signature_category_count['gene expression']}</a>
                    </span>
          <br/>
                    <span> <img
                        style={{maxHeight: "30px"}}
                        src="/media/icons/Protein_Expression_Icon.png"/>
                             Protein Expression:   <a href={'/beta/signatures?signature=proteomics&class=small molecule&term='+sp.sm_name}>{sp.signature_category_count['proteomics']}</a>
                    </span>
          <br/>
                     <span> <img
                         style={{maxHeight: "30px"}}
                         src="/media/icons/Epigenomic_Icon.png"/>
                           Epigenomic:   <a href={'/beta/signatures?signature=epigenetic&class=small molecule&term='+sp.sm_name}>{sp.signature_category_count['epigenetic']}</a>
                    </span>
          <br/>
                     <span> <img
                         style={{maxHeight: "30px"}}
                         src="/media/icons/Cell_Phenotype_Icon.png"/>
                             Cell Phenotype: <a href={'/beta/signatures?signature=Cell Phenotype&class=small molecule&term='+sp.sm_name}>{sp.signature_category_count['cell phenotype']}</a>
                    </span>
          <br/>

          <br/>

      </div>
    )
  }
}
