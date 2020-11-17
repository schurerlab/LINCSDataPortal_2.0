import axios from 'axios';
// import { url_server } from "./server";

import { setFacetsData } from "../actions/set-suggest"

let url_server = "http://lincsportal.ccs.miami.edu/sigc-api/search/"

export function getFacets(str_term, str_type) {

    let target_url = url_server + "get-facets?term=" + encodeURI(str_term) // + "&type=" + encodeURI(str_type);
    // let target_url = "http://dev3.ccs.miami.edu:8080/sigc-api/search/get-facets?term=ABL1&type=mechanism%20of%20action";

    console.log(target_url);

    return dispatch => {

        axios.get(target_url)
            .then((response) => {

                let json_d = response.data.data;

                let json_m = Object.keys(json_d).map(function (key) {
                    return {
                        "segment": key,
                        "facet": json_d[key]
                    }

                });

                dispatch(setFacetsData(json_m));

            }
            ).catch((response) => console.log(response, 'fetch failure !!!'));

    }
}

