import React from "react";
import { connect } from "react-redux";

import { setSuggestStr } from "../../../redux/actions/set-suggest";
import { setSearchTerms } from "../../../redux/actions/set-terms";

import { getSuggest } from "../../../redux/fetch/get-suggest";
import { getFacets } from "../../../redux/fetch/get-facets";

import { setCounts } from "../../../redux/fetch/get-counts";

function mapObject(state, object, lastkey, callback) {
    return Object.keys(object).map(function (key) {

        if (object[key] !== null && typeof object[key] === 'object') {
            return mapObject(state, object[key], lastkey + ":" + key, callback);
        } else {
            return callback(state, key, lastkey, object[key]);
        }
    });
}



class PanelQuery extends React.Component {

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">

                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="search term"
                                aria-label="search term"
                                aria-describedby="button-organized-suggest"
                                value={this.props.str_suggest}
                                onChange={(meta_search) => this.props.setSuggestStr(meta_search.target.value)}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-secondary"
                                        type="button" id="button-organized-suggest"
                                        onClick={() => this.props.querySuggestSubmit(this.props.str_suggest)}>
                                    Search</button>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                     <button className="btn btn-outline-danger btn-sm btn-block"
                     style={{ "fontSize": "0.7em" }}
                     type="button" id="button-update-counts"
                     onClick={() => this.props.updateCounts(this.props.array_terms)}>
                     update counts</button>
                     </div> */}


                    <br />

                    <div >


                        {
                            mapObject(this.props, this.props.json_suggest, "", function (state, key, lastkey, value) {

                                if (key === 'segment') {

                                    segment = key
                                    return <div>
                                        <div className="badge badge-dark" style={{ "display": "block", "padding": "5px" }}>{value}</div>
                                    </div>
                                }

                                if (key === 'preferred_term') {
                                    lastkey = lastkey.replace(/\:[0-9]+$/, '').replace(/.*\:/, '')
                                    return <a className="btn btn-sm btn-outline-warning btn-block"
                                              style={{ "fontSize": "0.7em" }}
                                              key={lastkey}
                                              value={value}
                                              onClick={() => state.queryTermSubmit(value, segment)}
                                    > {value} </a>
                                }

                            })
                        }
                    </div>

                </form>
            </div >
        );
    }
}


// redux store
const mapStateToProps = (state) => {
    return {
        str_suggest: state.searchSuggetsReducer.suggest_str,
        url_suggest: state.searchSuggetsReducer.suggest_url,
        time_suggest: state.searchSuggetsReducer.suggest_time,

        array_terms: state.searchTermsReducer.array_terms,

        json_suggest: state.searchSuggetsReducer.suggest_json,
        json_facets: state.searchSuggetsReducer.facets_json
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSuggestStr: (value) => {
            dispatch(setSuggestStr(value));
        },
        querySuggestSubmit: (str_query) => {
            dispatch(getSuggest(str_query));
        },
        queryTermSubmit: (str_term, str_type) => {
            dispatch(getFacets(str_term, str_type));
        },
        nullAction: (str) => {
            dispatch();
        },
        setSearchTerms: (str_term) => {
            dispatch(setSearchTerms(str_term, TRUE))
        },
        updateCounts: (array_terms) => {
            dispatch(setCounts(array_terms))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PanelQuery);
