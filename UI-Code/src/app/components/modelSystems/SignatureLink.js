import React,{useContext,useEffect,useState} from 'react';
import { Context } from '../../Context';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

const SignatureLink = (props) => {
    const provider = useContext(Context);
    const [data, setData] = useState();
    const [cells, setCells] = useState();
    const [molecules, setMolecules] = useState();
    let selected = [];
    const [search,setSearch] = useState();
    console.log(props);

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
        <span>
                     <img style={{maxHeight: "30px"}}
                          src="http://dev3.ccs.miami.edu:8080/SignatureCommons/images/u151.svg"/>
                        Gene Expression:   
                        <Link to='/signatures/signatures' onClick={(e) => {handleInputChange(e,props.name,'Gene expression',props.type)}}    style={{ borderColor: 'white', color:"blue" }}>{props.data.signature_category_count['gene expression']}</Link>
                         {/* <a href={'/signatures/signatures?signature=Gene Expressions&class=cell line&term='+props.data.name}>{props.data.signature_category_count['gene expression']}</a> */}
                    </span>
                            <br/>
                    <span> <img
                        style={{maxHeight: "30px"}}
                        src="/media/icons/Protein_Expression_Icon.png"/>
                             Protein Expression: 
                              <Link to='/signatures/signatures'  onClick={(e) => {handleInputChange(e,props.name,'Protein expression',props.type)}}    style={{ borderColor: 'white', color:"blue" }}>{props.data.signature_category_count['proteomics']}</Link>

                              {/* <a href={'/signatures/signatures?signature=proteomics&class=cell line&term='+props.data.name}>{props.data.signature_category_count['proteomics']}</a> */}
                    </span>
                            <br/>
                     <span> <img
                         style={{maxHeight: "30px"}}
                         src="/media/icons/Epigenomic_Icon.png"/>
                           Epigenomic: 
                            <Link to='/signatures/signatures'   onClick={(e) => {handleInputChange(e,props.name,'Epigenetic',props.type)}}    style={{ borderColor: 'white', color:"blue" }}>{props.data.signature_category_count['epigenetic']}</Link>

                           {/* <a href={'/signatures/signatures?signature=epigenetic&class=cell line&term='+props.data.name}>{props.data.signature_category_count['epigenetic']}</a> */}
                    </span>
                            <br/>
                     <span> <img
                         style={{maxHeight: "30px"}}
                         src="/media/icons/Cell_Phenotype_Icon.png"/>
                             Cell Phenotype: 
                             <Link to='/signatures/signatures'  onClick={(e) => {handleInputChange(e,props.name,'Cell viability',props.type)}}    style={{ borderColor: 'white', color:"blue" }}>{props.data.signature_category_count['cell phenotype']}</Link>

                             {/* <a href={'/signatures/signatures?signature=Cell Phenotype&class=cell line&term='+props.data.name}>{props.data.signature_category_count['cell phenotype']}</a> */}
                    </span>
                    </div>
    )
      

}

export default SignatureLink;