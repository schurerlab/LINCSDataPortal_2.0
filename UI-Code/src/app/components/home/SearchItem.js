import React,{useContext,useEffect,useState} from 'react';
import { Context } from '../../Context';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

const SearchItem = (props) => {
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
            provider.setQuery([{class:cls[i],term:term[i],type:ty[i]}]);
            {!provider.filters.includes(k) ?  provider.setFil(prefiltered => [...prefiltered,k])  :''}
            {provider.setQuery([{class:cls[i],term:term[i],type:ty[i]}]) ?  <Redirect to="/signatures/signatures" /> :''}
           
          })}
        })

    }

    return(
        <div>
               { Object.entries(props.facets).map(([key,value])=> ( 
       
        <div className="col-12" style={{marginLeft:0,fontSize:"0.8rem",padding:"0",textAlign: "left",fontWeight:"200",color:"gray"}} key={key}>
         <Link to='/signatures/signatures'  className="d-flex w-100 btn-inde" onClick={(e) => {handleInputChange(e,key,props.type,props.cat)}}    style={{ borderColor: 'white' }}>

{key}  {key.includes()}

 
</Link>
        </div>
        ))}
        
        </div>
    )
      

}

export default SearchItem;