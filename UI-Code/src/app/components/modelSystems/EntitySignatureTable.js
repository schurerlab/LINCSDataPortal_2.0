import React,{useContext,useEffect,useState} from 'react';
import { Context } from '../../Context';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

const EntitySignatureTable = (props) => {
    const provider = useContext(Context);
    const [data, setData] = useState();
    const [cells, setCells] = useState();
    const [molecules, setMolecules] = useState();
    let selected = [];
    const [search,setSearch] = useState();

    const handleInputChange=(e,k,type,cat)=> {

        let cls=[];
        let term=[];
        let ty=[];
        if(type=='Protein expression'){
          term.push('proteomics assay')
          cls.push("generating_activity_class")
          ty.push('assay')
        }else if(type=='Gene expression'){
          term.push('gene expression assay')
          cls.push("generating_activity_class")
          ty.push('assay')
        }else if(type=='Protein binding'){
          term.push('binding assay')
          cls.push("generating_activity_class")
          ty.push('assay')
        }else if(type=='Epigenetic'){
          term.push('epigenetics assay')
          cls.push("generating_activity_class")
          ty.push('assay')
        }
        if(cat==='model system'){
          cls.push("cell line")
          ty.push("name")
          term.push(k)
        }else{
          cls.push(cat)
          ty.push("name")
          term.push(k)
        }

        fetch(
            provider.apiUrl+'clearFacets',
            { method: 'GET',headers: {
               'Content-Type': 'application/json'
            },
            credentials: 'include'} ) .then(res => res.json())
          .then(response => {
            for(var i=0;i< cls.length;i++){
           
                fetch(
        
                   provider.apiUrl+'addFacet?class='+cls[i]+'&term='+term[i]+'&type='+ty[i],
            { method: 'GET',headers: {
               'Content-Type': 'application/json'
            },
            credentials: 'include'} ) .then(res => res.json())
          .then(response => {
            provider.setQuery([{class:type,term:k,type:cat}]);
            {!provider.filters.includes(k) ?  provider.setFil(prefiltered => [...prefiltered,k])  :''}
            {provider.setQuery([{class:type,term:k,type:cat}]) ?  <Redirect to="/signatures/signatures" /> :''}
           
          })}
        })

    }
    return(
        <tbody>
        <tr  >
            <th style={{width:"50%",padding:".25em",fontWeight:"200"}} >Gene Expression :</th>
            <td className="pull-left" style={{padding:".25em"}}>
            <Link to='/signatures/signatures' onClick={(e) => {handleInputChange(e,props.name,'Gene expression',props.type)}}    style={{ borderColor: 'white', color:"blue" }}>{props.data.signatures["gene expression"] ? props.data.signatures["gene expression"]: "-"}</Link>

                {/* <a href={'/signatures/signatures?signature=Gene Expressions&class=cell line&term='+props.data.name}> <b>{props.data.signatures["gene expression"] ? props.data.signatures["gene expression"]: "-"}</b> </a> */}
            </td>
        </tr>
        <tr  >
            <th  scope="row" style={{width:"50%",padding:".25em",fontWeight:"200"}}>Epigenetic</th>
            <td style={{padding:".25em"}}>
            <Link to='/signatures/signatures'   onClick={(e) => {handleInputChange(e,props.name,'Epigenetic',props.type)}}    style={{ borderColor: 'white', color:"blue" }}>{props.data.signatures["epigenetic"] ? props.data.signatures["epigenetic"]: "-"}</Link>
            </td>
        </tr>
        <tr  >
            <th  scope="row" style={{width:"50%",padding:".25em",fontWeight:"200"}}>Protein Binding : </th>
            <td style={{padding:".25em"}}>
            <Link to='/signatures/signatures'  onClick={(e) => {handleInputChange(e,props.name,'Protein binding',props.type)}}    style={{ borderColor: 'white', color:"blue" }}>{props.data.signatures["binding"] ? props.data.signatures["binding"]: "-"}</Link>

                {/* <a href={'/signatures/signatures?signature=binding&class=cell line&term='+props.data.name}> <b>  {props.data.signatures["binding"] ? props.data.signatures["binding"]: "-"} </b> </a> */}

            </td>
        </tr>
        <tr  >
            <th  scope="row" style={{width:"50%",padding:".25em",fontWeight:"200"}}>Protein Expression:</th>
            <td style={{padding:".25em"}}>
            <Link to='/signatures/signatures'  onClick={(e) => {handleInputChange(e,props.name,'Protein expression',props.type)}}    style={{ borderColor: 'white', color:"blue" }}>{props.data.signatures["proteomics"] ? props.data.signatures["proteomics"]: "-"}</Link>

                {/* <a href={'/signatures/signatures?signature=proteomics&class=cell line&term='+props.data.name}>  <b>  {props.data.signatures["proteomics"] ? props.data.signatures["proteomics"]: "-"}</b> </a> */}
            </td>
        </tr>
        <tr  >
            <th  scope="row" style={{width:"50%",padding:".25em",fontWeight:"200"}}>Cell Phenotype :</th>
            <td style={{padding:".25em"}}>
            <Link to='/signatures/signatures'  onClick={(e) => {handleInputChange(e,props.name,'Cell viability',props.type)}}    style={{ borderColor: 'white', color:"blue" }}>{props.data.signatures["cell phenotype"] ? props.data.signatures["imaging"]: "-"}</Link>

                {/* <a href={'/signatures/signatures?signature=imaging&class=cell line&term='+props.data.name}>  <b>   {props.data.signatures["cell phenotype"] ? props.data.signatures["imaging"]: "-"} </b> </a> */}
            </td>
        </tr>

        </tbody>
    )
      

}

export default EntitySignatureTable;