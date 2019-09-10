import axios from 'axios';
import { url_server } from "../server";

import { setDataTableModelSystems } from "../actions/modelsystems";

export function getDataTableModelSystems(array_terms, result_group) {


    let target_url = url_server + "fetch-modelsystems?term=" + encodeURI(array_terms.join())

    console.log(target_url);

    return dispatch => {

        axios.get(target_url)
            .then((response) => {

                dispatch(setDataTableModelSystems(response.data.data));

            }
            ).catch((response) => console.log(response, 'fetch failure !!!'));

    }
}

