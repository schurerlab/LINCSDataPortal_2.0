import axios from 'axios';
import { url_server } from "../server";

import { setDataTablePerturbagens } from "../actions/perturbations";

export function getDataTablePerturbagens(array_terms, result_group) {
    // This function formats the data returned from the GET fetch for
    // perturbagens and then dispatches that data to the store. 

    // let target_url = url_server + "fetch-perturbagens?term=" + encodeURI(array_terms.join())
    let target_url = 'http://dev3.ccs.miami.edu:8080/sigc-api/small-molecule/fetch?limit=100'

    console.log(target_url);

    return dispatch => {

        axios.get(target_url)
            .then((response) => {

                let json_d = response.data.data;
                var gcol = "";
                var pcol = "";
                var bcol = "";
                var ecol = "";
                var icol = "";

                let json_m = Object.keys(json_d).map(function (key) {


                    if (json_d[key].signature_category_count['gene expression'] != undefined) {
                        gcol = "/media/icons/Arrow_Icon.png";
                    }
                    if (json_d[key].signature_category_count['proteomics'] != undefined) {
                        pcol = "/media/icons/Arrow_Icon.png";
                    }
                    if (json_d[key].signature_category_count['binding'] != undefined) {
                        bcol = "/media/icons/Arrow_Icon.png";
                    }
                    if (json_d[key].signature_category_count['epigenetic'] != undefined) {
                        ecol = "/media/icons/Arrow_Icon.png";
                    }
                    if (json_d[key].signature_category_count['imaging'] != undefined) {
                        icol = "/media/icons/Arrow_Icon.png";
                    }

                    return {
                        "id": json_d[key].perturbagen_id[0],
                        "sm_name": json_d[key].sm_name.join(',').replace(/^(.{20}).+/, "$1…"),
                        "moa": json_d[key].moa.join(',').replace(/^(.{20}).+/, "$1…"),
                        "target": json_d[key].target.join(',').replace(/^(.{20}).+/, "$1…"),
                        "max_fda_phase": json_d[key].max_fda_phase.join(',').replace(/^(.{20}).+/, "$1…"),
                        "g": gcol,
                        "p": pcol,
                        "b": bcol,
                        "e": ecol,
                        "i": icol
                    }
                });

                dispatch(setDataTablePerturbagens(json_m));

            }
            ).catch((response) => console.log(response, 'fetch failure !!!'));

    }
}
