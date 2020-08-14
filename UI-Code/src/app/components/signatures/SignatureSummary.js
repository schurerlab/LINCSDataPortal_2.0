import React,{useContext,useEffect,useState} from 'react';
import { Context } from '../../Context';
import axios from 'axios';
let csl = { 'fontSize': '0.7em' };

const SignatureSummary =() => {
    const provider = useContext(Context);
    const resultsSummary = 'resultsSummary';
    const [summary,setSummary] = useState([]);
    // let summary = []; 
    useEffect(() => {
        fetch(
          'http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/resultsSummary', { method: 'GET',headers: {
            'Content-Type': 'application/json'
         },
         credentials: 'include'}
        )
          .then(res => res.json())
          .then(response => {
             setSummary(response);
          
          })
          .catch(error => console.log(error));
      }, [provider.query,provider.data]);


    return (
        <div className="col-11" style={csl}>
           
        {summary ? 
                                            <div>
                                        <div className="filtered-by"><b>Summary:</b> </div>
                                        <div className="filtered-by" style={{marginLeft:"0.6em",color:"orange"}}>{summary.total} Signatures</div>
                                         <div className="filtered-by" style={{marginLeft:"0.6em",color:"darksalmon"}}>{summary.perturbation}  Perturbagens</div> <div className="filtered-by" style={{marginLeft:"0.6em",color:"#4CC189"}}>{summary.cellLine}  Model Systems</div> <div className="filtered-by" style={{marginLeft:"0.6em",color:"#4CC189"}}>{summary.assay} Assays</div>
                                        </div>
                                             :""} 
                                            </div>
    )
}

export default SignatureSummary;