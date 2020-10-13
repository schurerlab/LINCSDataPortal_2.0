import React,{useContext,useEffect,useState} from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import { Context } from '../../Context';
const Item =(props) => {

    const provider = useContext(Context);
    let selected = [];
    const [search,setSearch] = useState();

   

    useEffect(() => {
        selected=provider.filters;
        provider.setFil(provider.filters);
       
    },[provider.filters])

    const removeItemAll =(arr, value) => {
        var i = 0;
        while (i < arr.length) {
          if (arr[i] === value) {
            arr.splice(i, 1);
          } else {
            ++i;
          }
        }
        return arr;
      }

      const searchInputChange=(e)=>{
          setSearch(e.target.value.toLowerCase());
      }



    const handleInputChange=(e)=> {
       
        let term = e.target.name;
       
        if(e.target.checked===true){
          
            fetch(

                provider.apiUrl+'addFacet?class='+props.cls+'&term='+term+'&type='+props.type,
                { method: 'GET',headers: {
                   'Content-Type': 'application/json'
                },
                credentials: 'include'} ) .then(res => res.json())
              .then(response => {
                provider.setQuery([{class:props.cls,term:term,type:props.type}]);
                {!provider.filters.includes(term) ?  provider.setFil(prefiltered => [...prefiltered,term]):''}
                // provider.setFil(removeItemAll(provider.filters,term));
        
              })
           
            
        }else if(e.target.checked===false){
            fetch(
                provider.apiUrl+'removeFacet'+'?class='+props.cls+'&term='+term+'&type='+props.type,
                { method: 'GET',headers: {
                   'Content-Type': 'application/json'
                },
                credentials: 'include'} ) .then(res => res.json())
              .then(response => {
                provider.setQuery([]);
                provider.setFil(removeItemAll(provider.filters,term));
              })
        }
  
    }
    return (
        <div >
              <input type="text" className="form-control" onChange={searchInputChange} placeholder="Search"></input>
            { search!= undefined   ? Object.keys(props.term).sort().filter(term => term.toLowerCase().includes(search)).map((key,index)=> (
                
                 <div key={index}>
                     {provider.filters.length > 0 && provider.filters.includes(key) ? 
                     
                     <label>
     
     <input
        name={key}  
        type="checkbox" 
        checked="true"
        onChange={ handleInputChange}
       />  {key}
   </label>  :

                     
                     <label>
     
                 <input
                    name={key}  
                    type="checkbox" 
                    onChange={ handleInputChange}
                   />  {key}
               </label>
}
               </div> 
            )
            ):Object.keys(props.term).sort().map((key,index)=> (
                <div key={index}>
                    {provider.filters.length > 0 && provider.filters.includes(key) ? 
                    
                    <label>
    
    <input
       name={key}  
       type="checkbox" 
       checked="true"
       onChange={ handleInputChange}
      />  {key}
  </label>  :

                    
                    <label>
    
                <input
                   name={key}  
                   type="checkbox" 
                   onChange={ handleInputChange}
                  />  {key}
              </label>
}
              </div> 
           )
           )}
            
        </div>
    )
}

export default Item;
