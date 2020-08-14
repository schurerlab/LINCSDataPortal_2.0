import React,{useContext,useEffect,useState} from 'react';
import { Context } from '../../Context';
import axios from 'axios';
let csl = { 'fontSize': '0.7em' };

const AppliedFilters =() => {
    const provider = useContext(Context);
    const resultsSummary = 'resultsSummary';
    const [filters,setFilters] = useState([]);
    let prefiltered =[];
    // let summary = []; 
    useEffect(() => {
        
        fetch(
            `http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/getCurrentFacets`, { method: 'GET',headers: {
  
             'Content-Type': 'application/json'
          },
          credentials: 'include'})
            .then(res => res.json())
            .then(response => {
                let filteredSet = new Set()
                setFilters(response);
                response.map((key) => {
                    filteredSet.add(key.term)
                    provider.setFil(Array.from(filteredSet));
                  })
                
            })
            .catch(error => console.log(error));
      }, [provider.query,provider.data]);


    const clear =()=>{
        fetch(
            provider.apiUrl+'clearFacets',
            { method: 'GET',headers: {
               'Content-Type': 'application/json'
            },
            credentials: 'include'} ) .then(res => res.json())
          .then(response => {
            provider.setQuery([]);
            setFilters([]);
            provider.setFil([]);
          })
    }  

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

    const removeSelected = (cl,name,type) => {
        fetch(
            provider.apiUrl+'removeFacet'+'?class='+cl+'&term='+name+'&type='+type,
            { method: 'GET',headers: {
               'Content-Type': 'application/json'
            },
            credentials: 'include'} ) .then(res => res.json())
          .then(response => {
            provider.setQuery([]);
            provider.setFil(removeItemAll(provider.filters,name));
            // setFilters([]);
          })
    }


    return (
        <div className="col-11" style={csl}>
           {/* onClick={removeSelected(row.class,row.term,row.type)} */}
        {filters.length > 0 ? 
                                            <div>
                                        <div className="filtered-by"><b>Filtered By:</b> </div>
        {filters.map(row => (  <span className="suggestion-chip" key={row.index} style={{marginLeft:"0.6em"}}>
                        <b>{row.term}</b>
                        <em>({row.class})</em>
                       
                            <i type="button" onClick={ () => removeSelected(row.class,row.term,row.type)} className="fa fa-times" aria-hidden="true"></i>
                           </span> ) ) }

                           <span> <button className="suggestion-chip" type="button" style={{marginLeft:"0.6em"}} onClick={clear}>clear</button></span>
                                      
                                       
                                        </div>
                                        : ""}
                                            </div>
    )
}

export default AppliedFilters;