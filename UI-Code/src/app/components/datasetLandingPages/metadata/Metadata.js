import React from 'react';
import {Grid, Col, Row, Well} from 'react-bootstrap';

class Metadata extends React.Component {
    constructor(){
        super();
        this.state = {
            cats:[]
        }
    }
    render() {
        console.log(this.props)
    let cats ;
        if(this.props.tabs){
            cats = this.props.tabs.map((tab, index) => {
                return (

                    <span key={index}>
                     <img src={`/media/icons/${tab}.png`} className="category-image"/>
                          <b className="between-category">{this.props.data.statsvalues[index]} {tab}</b>


                     </span>

                        )
            });
        }
        return (
            <div className="text-center">
                {cats}
            </div>
        );
    }

}
export default Metadata;