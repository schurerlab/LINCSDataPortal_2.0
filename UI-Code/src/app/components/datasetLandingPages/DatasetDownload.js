import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Header from './header/Header';
import DatasetDescription from './description/DatasetDescription';

class DatasetDownload extends React.Component {
    constructor(props){
        super(props);
    }
    replace(input){

            return input.replace('/projects/ccs/bd2klincs/', '');

    }
    render() {
        let levels = this.props.datasetinfo.datalevels;
        let size = this.props.datasetinfo.datalevels.length;
        let datasetlevels = this.props.datasetinfo.datasetlevels;
        let path = this.props.datasetinfo.levelspath;
        let sizeof = this.props.datasetinfo['size'];
        // function renderElements(value, index) {
        //     console.log(levels)
        //     console.log(levels[index])
        //     // return levels[index];
        // }
        let items = levels.map((currElement, index)=> {

            return (
<tr >
    <th  key={index}>
                    {levels[index]}
                </th>
    <th key={index}>
        {datasetlevels[index]}
    </th>
    <th  key={index}>
        {sizeof[index]}
</th>
    <th  key={index}>
        <a href={`http://lincsportal.ccs.miami.edu/dcic/api/download?path=${this.replace(path[index])}&file=${datasetlevels[index]}.tar.gz`} target="_self">Download</a>
    </th>
</tr>

            );
        });

        return (
            <div  className="col-9">
                <table className="table download-table"><tbody>
                <tr>
                    <th className="download-table-header" >Data Level</th>
                    <th className="download-table-header" >Dataset ID</th>
                    <th className="download-table-header">Size</th>
                    <th className="download-table-header">Download</th>
                    </tr>
                {items}
                   </tbody>
                </table>

            </div>
        );
    }
}

export default DatasetDownload;

