import React from 'react'

export default class PhysicochemicalProperties extends React.Component {

  render() {
    if (this.props.sp) {
      const sp = this.props.sp
      return (
        <div>
          <div className="row">
            <div className="col-12">
              <h5 style={{color:"#CC3300"}}>Physicochemical Properties</h5>
              <hr style={{borderBottom: "1px solid #CC3300"}} />
            </div>
            <div className="col-lg-4 col-sm-12">
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">Bioavailability <a class="titip-top">
                    <span className="titip-content">
                      Binary classification of a compound's <br/> lead likeness considering molecular  <br/>  weight, logD, hydrogen bond donors, <br/>  acceptor, rotatable bond, and ring count;  <br/> lead like compounds are easier  <br/> to optimize in medicinal chemistry  <br/> lead optimization.
                      </span>
                    <i class="fa fa-question-circle" ></i></a></th>
                  <td>{sp.Bioavailability === "true" ?
                     <span style={{color:"green"}}> True </span> :
                    <span style={{color:"red"}}>False  </span>}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Leadlikeness <a class="titip-top">
                    <span className="titip-content">
                    Binary classification of a compound's <br/> lead likeness considering molecular weight,  <br/>  logD, hydrogen bond donors, acceptor, rotatable bond,  <br/>  and ring count; lead like compounds  <br/>  are easier to optimize in medicinal  <br/> chemistry lead optimization.
                  </span><i class="fa fa-question-circle" ></i></a></th>
                  <td>{sp.Leadlikeness === "true" ?
                      <span style={{color:"green"}}> True </span> :
                      <span style={{color:"red"}}>False  </span>}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Rule of five  <a class="titip-top" >
                         <span className="titip-content">
                           Number of violations of Lipinski’s <br/> rule of five; MolWeight  500, <br/>  LogP  5, HBdonor ≤ 5, HBaccept ≤ 10; <br/>  compounds that satisfy these rules <br/>  are considered drug-like.
                         </span>
                    <i class="fa fa-question-circle" ></i></a>
                  </th>
                  <td>{sp.Ro5 <= 0 ?
                      <span style={{color:"green"}}> {sp.Ro5 }</span> :
                      <span style={{color:"red"}}>{sp.Ro5 }  </span>}
                  </td>
                </tr>
                <tr>
                  <th scope="row" >Rule of three <a class="titip-top">
                        <span className="titip-content">
                          Number of violations of Jorgensen’s rule of three; <br/> LogAqSol > -5.7, QPPCaco > 22 nm/s,<br/> number of primary metabolites <br/>  7; compounds with fewer preferably zero <br/> violations are more likely to <br/> be orally available. </span>
                    <i class="fa fa-question-circle" ></i></a></th>
                  <td>
                    {sp.Ro3 == 0 ?
                        <span style={{color:"green"}}> {sp.Ro3 }</span> :
                        <span style={{color:"red"}}>{sp.Ro3 }  </span>}
                  </td>
                </tr>
                <tr>
                  <th scope="row" >CNS activity <a class="titip-top">
                    <span className="titip-content">
                    Predicted central nervous system <br/> activity on a –2 (inactive) to +2 <br/>  (active) scale. </span>
                    <i class="fa fa-question-circle" ></i></a></th>
                  <td>
                    {sp["CNS activity"] >= 1 ?
                        <span style={{color:"green"}}> {sp["CNS activity"] }</span> :
                        <span style={{color:"red"}}>{sp["CNS activity"] }  </span>}
                  </td>
                </tr>
                <tr>
                  <th scope="row" >STARS <a class="titip-top" >
                    <span className="titip-content">
                    Number of property or descriptor values <br/> that fall outside the 95% range of <br/> similar values for known drugs; <br/> the fewer stars the more druglike.
                    </span>
                    <i class="fa fa-question-circle" ></i></a></th>
                  <td>
                    {sp.stars <= 3 ?
                        <span style={{color:"green"}}> {sp.stars}</span> :
                        <span style={{color:"red"}}>{sp.stars }  </span>}
                  </td>
                </tr>
                <tr>
                  <th scope="row" >Reactive func. groups <a class="titip-top" >
                    <span className="titip-content">
                      Number of reactive functional groups; <br/> reactive functional groups can lead to false <br/>positives in HTS assays, decomposition, <br/> reactivity, or toxicity problems in vivo.
                    </span><i class="fa fa-question-circle" ></i></a></th>
                  <td>
                    {sp["Reactive func. groups"] <=1 ?
                        <span style={{color:"green"}}> {sp["Reactive func. groups"]}</span> :
                        <span style={{color:"red"}}>{sp["Reactive func. groups"] }  </span>}
                  </td>
                </tr>
              </tbody>
            </table>
              </div>
            <div className="col-lg-4 col-sm-12">
              <table className="table">
                 <tbody>
                <tr>
                  <th scope="row">Molecular weight (g/mol) <a class="titip-top" data-title="Molecular weight."><i class="fa fa-question-circle" ></i></a></th>
                  <td>
                    {sp["Molecular weight"] > 130 && sp["Molecular weight"] < 725 ?
                        <span style={{color:"green"}}> {sp["Molecular weight"]}</span> :
                        <span style={{color:"red"}}>{sp["Molecular weight"] }</span>}
                   </td>
                </tr>
                <tr>
                  <th scope="row" >Hydrogen bond donor <a class="titip-top">
                    <span className="titip-content">
                    Estimated number of hydrogen bonds that would <br/>be donated by the solute to water molecules <br/>in an aqueous solution; values are averages <br/>taken over a number of configurations, <br/> so they can be non-integer
                    </span><i class="fa fa-question-circle" ></i></a></th>
                  <td>
                    {sp["Hydrogen bond donor"] <=5 ?
                        <span style={{color:"green"}}> {sp["Hydrogen bond donor"]}</span> :
                        <span style={{color:"red"}}>{sp["Hydrogen bond donor"] }  </span>}

                  </td>
                </tr>
                <tr>
                  <th scope="row" >Hydrogen bond acceptor <a class="titip-top">
                    <span className="titip-content">
                    Estimated number of hydrogen bonds that would be accepted by the <br/> solute from water molecules in an aqueous solution; <br/> values are averages taken over a number of configurations, <br/> so they can be non-integer.
                  </span>
                    <i class="fa fa-question-circle" ></i></a></th>
                  <td>
                    {sp["Hydrogen bond acceptor"] <=10 ?
                        <span style={{color:"green"}}> {sp["Hydrogen bond acceptor"]}</span> :
                        <span style={{color:"red"}}>{sp["Hydrogen bond acceptor"] }  </span>}
                  </td>
                </tr>
                <tr>
                  <th scope="row" >Rotatable bonds <a class="titip-top">
                    <span className="titip-content">Number of non-trivial (not CX3), <br/> non-hindered (not alkene, amide, small ring) <br/> rotatable bonds.</span><i class="fa fa-question-circle" ></i></a></th>
                  <td>
                    {sp.RB <=10 ?
                        <span style={{color:"green"}}> {sp.RB}</span> :
                        <span style={{color:"red"}}>{sp.RB }  </span>}
                  </td>
                </tr>
                <tr>
                  <th scope="row" >LogP <a class="titip-top">
                    <span className="titip-content">
                     Predicted octanol/water partition <br/> coefficient; for oral bioavailability.
                      </span><i class="fa fa-question-circle" ></i></a></th>
                  <td>
                    {sp.LogP >= 1 && sp.LogP  <= 4 ?
                        <span style={{color:"green"}}> {sp.LogP}</span> :
                        <span style={{color:"red"}}>  {sp.LogP}</span>}

                  </td>
                </tr>
                <tr>
                  <th scope="row" >PSA <a class="titip-top">
                     <span className="titip-content">
                    Polar Van der Waals surface area in A^2; <br/> PSA > 140 is a benchmark for poor membrane <br/>  permeability; a PSA  90 is a benchmark for <br/>  blood-brain barrier permeability.
                    </span>
                    <i class="fa fa-question-circle" ></i></a></th>
                  <td>
                    {sp.PSA <=120 ?
                        <span style={{color:"green"}}> {sp.PSA}</span> :
                        <span style={{color:"red"}}>{sp.PSA }  </span>}
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="col-lg-4 col-sm-12">
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row" >Log10 aqueous solubility <a class="titip-top" >
                       <span className="titip-content">
                       Predicted aqueous solubility, log10(S); <br/> S (in M concentration) is the concentration of <br/> the solute in a saturated solution that <br/> is in equilibrium with the crystalline solid.
                      </span>
                      <i class="fa fa-question-circle" ></i></a></th>
                    <td>
                      {sp["Log10 aqueous solubility"] >=-5 ?
                          <span style={{color:"green"}}> {sp["Log10 aqueous solubility"]}</span> :
                          <span style={{color:"red"}}>{sp["Log10 aqueous solubility"] }  </span>}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" >Oral absorption
                      <a class="titip-top" >
                      <span className="titip-content">
                        Predicted human oral <br/>
                        absorption on 0 to 100% scale; 80%
                        <br/> is high, 25%  is poor
                      </span> <i class="fa fa-question-circle" ></i>
                      </a>
                    </th>
                    <td>
                      {sp["Oral absorption"] >= 50 ?
                          <span style={{color:"green"}}> {sp["Oral absorption"]}</span> :
                          <span style={{color:"red"}}>{sp["Oral absorption"] }  </span>}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" >Log10 (K HSA) <a class="titip-top">  <span className="titip-content">
                      Prediction of binding to human serum albumin; <br/> log10(K HSA); surrogate for plasma binding; <br/>  smaller values mean that a greater proportion <br/>  of the drug is unbound and active <br/> and can be excreted.
                    </span><i class="fa fa-question-circle" ></i></a></th>
                    <td>
                      {sp["Log10 (K HSA)"] <0.8 ?
                          <span style={{color:"green"}}> {sp["Log10 (K HSA)"]}</span> :
                          <span style={{color:"red"}}>{sp["Log10 (K HSA)"] }  </span>}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row" >Log10 HERG K+ channels <a class="titip-top">
                      <span className="titip-content">Predicted log10(IC50) value (in M concentration) <br/> for blockage of HERG K+ channels; <br/> concerns below -5 (> 10 uM). </span>
                      <i class="fa fa-question-circle" ></i></a></th>
                    <td>
                      {sp["Log10 HERG K+ channels"] >=-5 ?
                          <span style={{color:"green"}}> {sp["Log10 HERG K+ channels"]}</span> :
                          <span style={{color:"red"}}>{sp["Log10 HERG K+ channels"] }  </span>}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" >Caco-2 cell permeability <a class="titip-top" >
                      <span className="titip-content">Predicted apparent Caco-2 cell (non-active transport) <br/> permeability in nm/sec; Caco-2 cells <br/>  are a model for the blood barrier;<br/>  25 poor, 500 great.
                      </span><i class="fa fa-question-circle" ></i></a></th>
                    <td>
                      {sp["Caco-2 cell permeability"] >=50 ?
                          <span style={{color:"green"}}> {sp["Caco-2 cell permeability"]}</span> :
                          <span style={{color:"red"}}>{sp["Caco-2 cell permeability"] }  </span>}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" >MDCK cell permeability <a class="titip-top">
                        <span className="titip-content">
                          Predicted apparent (non-active transport) <br/> MDCK cell permeability in nm/sec; <br/> MDCK cells are a good mimic <br/> for the blood-brain barrier; <br/> 25 poor, 500 great.
                          </span>
                      <i class="fa fa-question-circle" ></i></a></th>
                    <td>
                      {sp["MDCK cell permeability"] >=50 ?
                          <span style={{color:"green"}}> {sp["MDCK cell permeability"]}</span> :
                          <span style={{color:"red"}}>{sp["MDCK cell permeability"] }  </span>}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row" >Brain blood coefficient <a class="titip-top">  <span className="titip-content">
                      Predicted brain/blood partition coefficient, <br/> log10(BB); valid for orally delivered drugs.</span>
                      <i class="fa fa-question-circle" ></i></a></th>
                    <td>{sp["Brain blood coefficient"]}</td>
                  </tr>  <tr>
                    <th scope="row" >Log10 skin permeability <a class="titip-top" data-title="Predicted skin permeability, log10(Kp)."><i class="fa fa-question-circle" ></i></a></th>
                    <td>
                      {sp["Log10 Kp"]}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" >Metabolic Reactions <a class="titip-top" data-title="Number of likely metabolic reactions."><i class="fa fa-question-circle" ></i></a></th>
                    <td>
                      {sp["Metabolic Reactions"] <=5 ?
                          <span style={{color:"green"}}> {sp["Metabolic Reactions"]}</span> :
                          <span style={{color:"red"}}>{sp["Metabolic Reactions"] }  </span>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br/>
          
        </div>
      )
    } else {
      return null
    }
  }
}
