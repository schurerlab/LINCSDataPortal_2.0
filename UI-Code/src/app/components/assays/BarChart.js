import CanvasJS from '../../../canvasjs.min';
import React from 'react';
var CanvasJSReact = require('../../../canvasjs.react');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class BarChart extends React.Component {
    render() {
        const options = {
            title: {
                text: "Area chart"
            },
            data: [{
                type: "area",
                dataPoints: this.props.data
            }]
        }

        return (
            <div>
                <CanvasJSChart className="col-3" options = {options}/>
            </div>
        );
    }
}

export default BarChart;


