import React,{useContext,useEffect,useState} from 'react';
import { Context } from '../../Context';
import axios from 'axios';
import ReactTable from "react-table";

let csl = { 'fontSize': '0.7em' };

const SigTable = () => {
    const provider = useContext(Context);
    
    
    const retrieveSignatures = 'retrieveSignatures';
    // const [selectedRow, setSelectedRow] = useState(0);
   
   

    useEffect(() => {
        console.log("########");
        fetch(
            provider.apiUrl+retrieveSignatures+'?limit=20&page='+provider.page,{ method: 'GET',credentials: 'include'}
        ) .then(res => res.json())
          .then(response => {
              provider.setTotalPages(Math.floor(response.totalCount/20));
              provider.setData(response.data);
          })
 
      }, [provider.query,provider.page]);
    return (

        <table className="table  table-bordered" style={csl}>
        <thead className="thead-light">
             <tr>
            <th scope="col">Category</th>
            <th scope="col">Dataset</th>
            <th scope="col">Perturbagen</th>
            <th scope="col">Cell Line</th>
            <th scope="col">Organ</th>
            <th scope="col">Time Point</th>
            <th scope="col">Concentration</th>
        </tr>
  </thead>
  {provider.data ? 
  <tbody>

{/* onClick={e => (selectedRow=index)}  */}
{/* style={ {
        background: index === selectedRow ? 'orange' : 'white',
        color: index === selectedRow ? 'white' : 'black'
      }} */}

    {provider.data.map((row,index) => (
    <tr  onClick={e =>  provider.setSelectedRow(index)} className="table-tr-click" key={index} style={ {
        background: index === provider.selectedRow ? 'orange' : 'white',
        color: index ===  provider.selectedRow ? 'white' : 'black'
      }}  >
      <td>{row.assay_category}</td>
      <td>{row.dataset_id}</td>
      <td>{row["small molecule"] ? row["small molecule"][0][`name`] : ''}</td>
      <td>{row["cell line"] ? row["cell line"][0][`name`] : '-'}</td>
      <td>{row["cell line"] ? row["cell line"][0][`organ`] : '-'}</td>
      <td>{row["small molecule"] && row["small molecule"][0].timepoint ? row["small molecule"][0].timepoint + ` (${row["small molecule"][0].timepointUnit})` : '-'}</td> 
      <td>{row["small molecule"] && row["small molecule"][0].concentration + ` (${row["small molecule"][0].concentrationUnit})`}</td>
        </tr>
        ))}
  </tbody> :''} 
  </table>
    
    )
}

export default SigTable;