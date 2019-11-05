import React from 'react';
import {Grid, Col, Row,Nav,Tabs,Tab,NavItem,TabContent} from 'react-bootstrap';
import axios from 'axios';
import DatasetDescription from '../../../components/datasetLandingPages/description/DatasetDescription';
import DatasetDownload from '../../../components/datasetLandingPages/DatasetDownload';
import Metadata from '../../../components/datasetLandingPages/metadata/Metadata';

class Header extends React.Component {

    constructor() {
        super();


        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: 1
        };
    }
    handleSelect(key) {
        this.setState({ key });
    }

    componentWillUnmount() {
        let newTitle = document.querySelector('title')
        newTitle.innerHTML = "Dataset Landing Page"
    }

    render() {
        let header;
        let datasetgroup;
        let datalevsls;
        let eventElement = "";
        let download = "";
        if(this.props.datasetinfo){
            let sp = this.props.datasetinfo
            let title = document.querySelector('title')
            title.innerHTML = `${sp.datasetname}`
            header = sp.datasetname
             datasetgroup = sp.datasetgroup
             datalevsls = sp.datasetlevels
            eventElement = <DatasetDescription datasetinfo={sp.datasetgroup}/>
            // download = <DatasetDownload datasetinfo={sp}/>
        }
    

        if(this.state.key === 1){
            if(this.props.datasetinfo) {
                eventElement = <DatasetDescription datasetinfo={this.props.datasetinfo}/>
            }
        }else if(this.state.key === 2){
            if(this.props.datasetinfo) {
                let props = {
                    tabs:this.props.datasetinfo.statsfields,
                    data:this.props.datasetinfo
                }
                eventElement = <Metadata {...props} />
            }
        }
        else if(this.state.key === 3){

        }

        console.log()


        return (

            <div >
            <div  style={{padding: "40px"}}>

                <div >
                    <h3  className="text-center title-small"
                         style = {{marginBottom: "40px"}}> {header}(<span style={{  color: "#337ab7"}} >{datasetgroup}:</span><span style={{  color: "#337ab7"}}  > {String(datalevsls)} </span><span>)</span>
                    </h3>
                    <hr style={{borderTop: "1px solid gray"}} />
                </div>
                </div>
               {eventElement}
                <hr style={{borderTop: "1px solid gray"}} />
                

        </div>

        );
    }
}

export default Header;