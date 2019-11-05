import React from "react";
import {Well, FormControl} from 'react-bootstrap';

class DatasetSearch extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            value: props.value
        }
    }

    onChange(e){

        this.setState({value: e.target.value});
        this.props.onChange(this.state.value);
        
    }

    render() {
        return (
            <Well>
                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Search Datasets..."
                    onChange={this.onChange.bind(this)}
                />
            </Well>
        )
    }
}

export default DatasetSearch;
