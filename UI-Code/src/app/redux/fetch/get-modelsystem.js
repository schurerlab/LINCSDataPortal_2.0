import axios from 'axios'
import { setShowModelSystem } from "../actions/modelsystems"

export function changeShowModelSystem(id) {
  return function (dispatch) {
      let lincsid;
      axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/search/identifiers?id=' + id + '&object_class=cell line')
          .then((response) => {
              lincsid = response.data.data[0]['LINCS Data Portal'][0];
              // Object.assign(ms2, {lcl: lincsid});
          });
  axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/cell-line/fetch-by-id?id=' + id + '&returnSignatureIDs=false')
    .then((response) => {
      let ms = response.data.data[0];
        let ms2;

          if (ms && lincsid) {
                    ms2 = {
                        "id": id,
                        "name": ms.cell_line_name,
                        "category": "Cell line",
                        "disease": ms.disease[0],
                        "tissue": ms.tissue ? ms.tissue[0] : null,
                        "organ": ms.organ,
                        "signatures": ms.signature_category_count,
                        "lcl": lincsid
                    }

                } else {
                    ms2 = null
                }
      dispatch(setShowModelSystem(ms2))

    })
  }

}
