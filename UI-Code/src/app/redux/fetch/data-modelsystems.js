import axios from 'axios';
import { url_server } from "../server";

import { setDataTableModelSystems } from "../actions/modelsystems";

export function getDataTableModelSystems() {



    // let target_url = url_server + "fetch-modelsystems?term=" + encodeURI(array_terms.join())
    let target_url = "http://lincsportal.ccs.miami.edu/sigc-api/cell-line/fetch?limit=1000&page=1&returnSignatureIDs=false"

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
                    } else { gcol = ""}
                    if (json_d[key].signature_category_count['proteomics'] != undefined) {
                        pcol = "/media/icons/Arrow_Icon.png";
                    } else { pcol = ""}
                    if (json_d[key].signature_category_count['binding'] != undefined) {
                        bcol = "/media/icons/Arrow_Icon.png";
                    } else { bcol = ""}
                    if (json_d[key].signature_category_count['epigenetic'] != undefined) {
                        ecol = "/media/icons/Arrow_Icon.png";
                    } else { ecol = ""}
                    if (json_d[key].signature_category_count['imaging'] != undefined) {
                        icol = "/media/icons/Arrow_Icon.png";
                    } else { icol = ""}

                    return {
                        "id": json_d[key].cell_line_id,
                        "name": json_d[key].cell_line_name,
                        "organ": json_d[key].organ,
                        "disease": json_d[key].disease.join(','),
                        "tissue": json_d[key].tissue ? json_d[key].tissue.join(',') : null,
                        "model_system_class": "cell line",
                        "g": gcol,
                        "p": pcol,
                        "b": bcol,
                        "e": ecol,
                        "i": icol
                    }
                });

                dispatch(setDataTableModelSystems(json_m));

            }
            ).catch((response) => console.log(response, 'fetch failure !!!'));

    }
}
