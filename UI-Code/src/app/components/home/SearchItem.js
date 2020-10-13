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
  
        fetch(
            provider.apiUrl+'clearFacets',
            { method: 'GET',headers: {
               'Content-Type': 'application/json'
            },
            credentials: 'include'} ) .then(res => res.json())
          .then(response => {
        fetch(

           
            provider.apiUrl+'addFacet?class='+type+'&term='+k+'&type='+cat,
            { method: 'GET',headers: {
               'Content-Type': 'application/json'
            },
            credentials: 'include'} ) .then(res => res.json())
          .then(response => {
            provider.setQuery([{class:type,term:k,type:cat}]);
            {!provider.filters.includes(k) ?  provider.setFil(prefiltered => [...prefiltered,k])  :''}
            {provider.setQuery([{class:type,term:k,type:cat}]) ?  <Redirect to="/signatures/signatures" /> :''}
           
          })
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