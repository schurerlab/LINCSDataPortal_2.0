import React,{useContext,useEffect,useState} from 'react';
import { Context } from '../../Context';
import SearchResultsPanel from './SearchResultsPanel';
import axios from 'axios';

const FilterPanel = () => {
    const provider = useContext(Context);
    const [data, setData] = useState();
    const [cells, setCells] = useState();
    const [molecules, setMolecules] = useState();

    useEffect(() => {
        fetch(
          'http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/getFacets', { method: 'GET',headers: {
            'Content-Type': 'application/json'
         },
         credentials: 'include'}
        )
          .then(res => res.json())
          .then(response => {
              
                setCells(response.data['cell line']);
        
                setMolecules(response.data['small molecule']);  
             

          
          })
          .catch(error => console.log(error));
      }, [provider.query,provider.filters]);

    return (
                    <div className="col-12" style={{marginBottom:'2em'}}>


            {cells ?  <SearchResultsPanel facets={cells} label="cell line" /> :''}
            {molecules ?       <SearchResultsPanel facets={molecules} label="small molecule" /> :''}
            {!cells && !molecules ? <h3>Please Search to see relevent Filters</h3> :'' }
         


                    </div>
    )

}

export default FilterPanel;