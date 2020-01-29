import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import DatasetSearch from '../../components/datasets/DatasetSearch';
import AssayTable from '../../components/assays/AssayTable';
import Facets from '../../components/datasets/Facets';
import AssaysDetailsPanel from '../../components/assays/AssaysDetailsPanel';

class Assays extends React.Component {
    constructor(props){
        super(props);
        if(props.location.search){
            let params = queryString.parse(props.location.search)
            this.state = {
                assays:[],
                text: params.term,
                data:[],
                totalCount:2,
                id:'',
                page:'0',
                types:params.class,
                skip:0,
            }
        }else {
            this.state = {
                types:'text',
                assays:[],
                text:'*',
                data:[],
                totalCount:2,
                id:'',
                skip:0,
                page:'0'
            }
        }

        console.log(props.location.search)
    }

    componentDidMount(){
        this.getAssays();
    }

    handlePageClick = (event) => {

        let pg =  event.selected*20;
        this.setState({skip: pg}, () => {
            this.getAssays();
        });
    }

    getAssays(){
        axios.request({
            method:'get',
            url:'http://lincsportal.ccs.miami.edu/dcic/api/fetchassayinfo?searchTerm='+this.state.types+':'+this.state.text+'&limit=20'+'&skip='+this.state.skip+'&sort=total_entities desc'
        }).then((response) => {
            

                this.setState( response.data.results.documents.map(dataset => {

                    let smet = {
                        "id": dataset.entityId,
                   "title": dataset.Name,
                    "center" : dataset.center_name.toString(),
                    "area" : dataset.area_of_study,
                    "method": dataset.assay_technology,
                    "datasets": dataset.dataset_count,
                    "participants": dataset.total_entities,
                        "process": dataset.biological_process,
                        "image": dataset.description_image,
                        "desc": dataset.description,
                        "format": dataset.assay_format,
                    "counts": dataset.counts,

                    }
                    this.state.data.push(smet)
                }));
            
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChange(text){

        this.setState({text: text}, this.getDatasets());

    }



    render() {
        return (
            <div className="row">
            <div className="col-12">

                        { this.state.data.length > 0 ? <AssayTable data={this.state.data} /> : '' }

            </div>
                <div className="offset-3 col-9">
                    { this.state.data.length > 0 ?  <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'.......'}
                        breakClassName={'break-me'}
                        pageCount={this.state.totalCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={7}
                        onPageChange={this.handlePageClick.bind(this)}
                        containerClassName={'pagination '}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                        // activeLinkClassName={'btn-page'}
                        forcePage={this.state.active}
                    />: '' }
                </div >
                </div>


        );
    }
}

export default withRouter(Assays);


