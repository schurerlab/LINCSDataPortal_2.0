import axios from 'axios'
import { setSignature } from "../actions/signatures"

export function changeSignature(id) {
    return function (dispatch) {
        axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/signature/fetch-by-id?id=' + id + '&onlyLandmarkGenes=false')
            .then((response) => {
                let ms = response.data.data[0]
                console.log(ms);
                let ms2
                if (ms) {
                    ms2 = {
                        "id": id,
                        "data": ms.data,
                        "timepoint": ms.timepoint,
                        "timepointUnits": ms.timepointUnits,
                        "concentrationUnits": ms.concentrationUnits,
                        "concentration": ms.concentration,
                        "perturbagenID": ms.perturbagenID,
                        "perturbagenClass": ms.perturbagenClass,
                        "signatureID": ms.signatureID,
                        "modelSystem": ms.modelSystem,
                    }
                } else {
                    ms2 = null
                }



            })
        axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/signature/fetch-metadata?id=' + id )
            .then((response) => {
                let res = response.data.data[0]
                console.log(res);
                let res2
                if (res) {
                    res2 = {
                        "assay": res.assay_category,
                        "level": res.data_level,
                        "dataset": res.dataset_id,
                        "clname": res['cell line'][0].cell_line_name,
                        "clorgan": res['cell line'][0].cell_line_organ,
                        "smname": res['small molecule'][0].small_molecule_name


                    }
                } else {
                    res2 = null
                }

            })

        let result = {
            ...res2,
            ...ms2,
        };
        dispatch(setSignature(result))
    }
}

