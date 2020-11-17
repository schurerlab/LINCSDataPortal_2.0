import React,{useContext,useEffect,useState} from 'react';
import { Context } from '../../Context';
import axios from 'axios';
import { saveAs } from 'file-saver';

let FileSaver = require('file-saver');

const SignatureDetails = () => {
    const provider = useContext(Context);
    const [data, setData] = useState();

   const download =(id)=> {
     
          let url="http://lincsportal.ccs.miami.edu/sigc-api/signature/fetch-metadata?id="+id

          FileSaver.saveAs(url, "Signature_meatadata.json");
  }

  const  downloadData=(id)=> {
     
          let url="http://lincsportal.ccs.miami.edu/sigc-api/signature/fetch-by-id?includeMetadata=false&onlyLandmarkGenes=false&id="+id

          FileSaver.saveAs(url, "Signature_data.json");
  }

    useEffect(() => {

         setData(provider.data[provider.selectedRow]);
      }, [provider.data,provider.selectedRow,data]);

    return (
        <div >
                    {data  ? <div>

                        <div className = "text-center details-header-font">Signature Details</div>

                        <div className = "properties-header"
                             style={{color: "#CC3300"}}>
                            Perturbation
                        </div>
                        <hr style={{borderTop: "1px solid #CC3300"}}/>
                      <div className="body-text">
                      {data['small molecule'] ? <div>
                            <span><b>Category: </b>{data['small molecule'][0].perturbationClass}</span><br/>
                            <span><b>Name: </b> <a href={`/signatures/perturbations/${data['small molecule'][0].perturbagenID}`}>{data['small molecule'][0].name} </a></span><br/>
                            <span><b>MOA: </b>  { data['small molecule'][0].mechanismOfAction.length > 0 ? 
                             data['small molecule'][0].mechanismOfAction[0].name : '-'}</span><br/>

                            <span><b>Timepoint: </b>{ data['small molecule'][0].timepoint  }  ({data["small molecule"][0].timepointUnit})</span><br/>  
                            <span><b>Concentration: </b>{data['small molecule'][0].concentration}  ({data['small molecule'][0].concentrationUnit})</span><br/>

                            </div>:''}
                            {data['cell line'] ? <div className="properties-header" style= {{color: "green"}}>Model Systems</div>   :''}
                            <hr style={{borderTop: "1px solid green"}}/>

                            {data['cell line'] ?  <span><b>Category: </b>Cell Line</span> : ''}
                            <br/>
                            {data['cell line'] ?   <span><b>Name: </b> <a href={`/signatures/models/${data['cell line'][0].celllineID }`}>{data['cell line'][0].name} </a></span> : ''}
                              <br/>
                              {data['cell line'] ?  <span><b>Organ: </b> {data['cell line'][0].organ}</span>: ''}
                              <br/>
                              {data['cell line'] ? <span><b>Diseases: </b> {data['cell line'][0].disease}</span>: ''}
                              <br/>
                            <div className="properties-header" style= {{color: "orange"}}>Signature</div>
                            <hr style={{borderTop: "1px solid orange"}}/>

                            <span ><b>Category: </b></span><span style={{marginLeft:"1em"}} >{data.assay_category}</span><br/>
                            {/* <span ><b>Assay: </b></span><span  style={{marginLeft:"2.5em"}}><a href={`/signatures/assays/${this.props.data.assay ==="P100 Assay" ? "13" : this.props.data.assay ==="L1000 Assay" ? "2" : this.props.data.assay ==="GCP Assay" ? "18" :this.props.data.assay ==="Fluorescence imaging cell viability" ? "27": this.props.data.assay ==="MEP Processing" ? "19":""}`}>{this.props.data.assay}</a></span><br/> */}
                            <span  ><b>Dataset: </b></span><span  style={{marginLeft:"1.6em"}}><a href={`/signatures/datasets/${data.dataset_id }`}>{data.dataset_id}</a></span><br/>
                            <span ><b>Data Level: </b></span><span style={{marginLeft:"0.6em"}} >{data.data_level}</span><br/>  

                            <span><b>Download :  </b></span><span><button className="btn btn-primary  btn-sm" style={{marginLeft:"0.6em"}} onClick={() => {download(data.signature_id)}} > Metadata</button></span><span><button className="btn btn-primary btn-sm " style={{marginLeft:"0.6em"}} onClick={() => {downloadData(data.signature_id)}}> Data</button></span><br/>

                        </div>

                    </div>
                        : ''}
                </div>
    )

}

export default SignatureDetails;