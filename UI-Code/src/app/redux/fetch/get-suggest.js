import axios from 'axios';
// import { url_server } from "./server";

import { setSuggestData } from "../actions/set-suggest"

let url_server = "http://lincsportal.ccs.miami.edu/sigc-api/search/"

export function getSuggest(str_term) {

    if(str_term.length < 3)
        return dispatch => {
            dispatch(setSuggestData({}));
        }

    let target_url = url_server + "suggest?term=" + str_term + "&UI=1";

    return dispatch => {

        axios.get(target_url)
            .then((response) => {

                let json_d = response.data.data;

                let json_m = Object.keys(json_d).map(function (key) {
                    return {
                        "segment": key,
                        "suggest": json_d[key]
                    }

                });


                dispatch(setSuggestData(json_m));

            }
            ).catch((response) => console.log(response, 'fetch failure !!!'));

    }
}

