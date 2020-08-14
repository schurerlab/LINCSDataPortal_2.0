import React,{useState, createContext,useEffect} from 'react';
import axios from 'axios';
export const Context = createContext();

// {class:"small molecule",term:"Buparlisib",type:"name"}
export const ContextProvider = (props) =>{
    const [query, setQuery] = useState([]);
    const [page, setPage] = useState(1);
    const [smquery, setSmQuery] = useState([]);
    const [clquery, setClQuery] = useState([]);
    const [pertquery, setPertQuery] = useState([]);
    const [data, setData] =  useState([]);
    const [selectedRow, setSelectedRow] = useState(0);
    const apiUrl  = 'http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/';
    const [totalPages, setTotalPages] = useState();
    const [filters,setFil] = useState([]);
    const providerValue = React.useMemo(() => ({
        query, setQuery,
        page, setPage,
        smquery, setSmQuery,
        clquery, setClQuery,
        pertquery, setPertQuery,
        apiUrl,
        data, setData,
        selectedRow, setSelectedRow,
        totalPages, setTotalPages, filters,setFil
    }), [query,data,selectedRow,page]);

    // useEffect(() => {

    //     if(query.length > 0){
    //         // fetch(
    //         //     // small%20molecule&term=Buparlisib&type=name
    //         //     // apiUrl+'clearFacets',
    //         //     apiUrl+'addFacet?class='+query[0].class+'&term='+query[0].term+'&type='+query[0].type, 
    //         //     { method: 'GET',headers: {
    //         //        'Content-Type': 'application/json'
    //         //     },
    //         //     credentials: 'include'} ) .then(res => res.json())
    //         //   .then(response => {
                
    //         //   })
    //     }
        
    //  }, [query]);
    return (
        <Context.Provider value={providerValue}>
             {props.children}
        </Context.Provider>
    );
}