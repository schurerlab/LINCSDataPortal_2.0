import React,{useContext,useEffect,useState} from 'react';
import { Context } from '../../Context';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const SignaturePagenation = () => {
    const provider = useContext(Context);
    useEffect(() => {
        provider.setTotalPages(provider.totalPages);
        console.log(provider.totalPages)
       
     }, [provider.totalPages]);

    return(

         <ReactPaginate previousLabel={'previous'} nextLabel={'next'} breakLabel={'.......'} breakClassName={'break-me'} pageCount={provider.totalPages} onPageChange={e => ( provider.setPage(e.selected+1))}  marginPagesDisplayed={2}   pageRangeDisplayed={7}     containerClassName={'pagination '}    subContainerClassName={'pages pagination'}   activeClassName={'active'}    />

    )
};

export default SignaturePagenation;
