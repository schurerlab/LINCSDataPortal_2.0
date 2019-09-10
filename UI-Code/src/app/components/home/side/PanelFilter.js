import React from "react";

export class PanelFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.state.nsel = Array.from(Array(1000).keys());

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }


    render() {
        return (
            <div>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>
                            Small Molecules
                        <input
                                className="form-control form-control-sm"
                                type="text"
                                value={this.state.value}
                                onChange={this.handleChange} />
                        </label>

                        <div className="form-group">
                            <label>
                                Redux Test
                        <select
                                    className="form-control form-control-sm"
                                    type="text"
                                    value={this.state.value}
                                    onChange={this.handleSubmit} >

                                    {this.state.nsel.map(function (nsel, i) {
                                        return <option key={i}>{nsel + 1}</option>
                                    })}

                                </select>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

