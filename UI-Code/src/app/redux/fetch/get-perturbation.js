import axios from 'axios'

export function changeShowPerturbation(id) {
  return function(dispatch) {
    let sp = {}

    function datafetch(url, id, stateVar) {
      return axios.get('http://dev3.ccs.miami.edu:8080/sigc-api/small-molecule/' + url + id)
        .then((response) => {
          sp = {...sp, ...response.data.data[0]}
          })
    }
    // function to change the Perturbation Detail panel when a table row is clicked.
    // This function sets State with a new showPerturbation after it's been fetched by id.
    datafetch('fetch-by-id?id=', id, "showPerturbation").then(() => {
      datafetch('fetch-properties?id=', id, "properties").then(() => {
        datafetch('fetch-identifiers?id=', id, "IDs").then(() => {
          dispatch({type: "SET_SHOW_PERTURBATION", payload: sp})
        })
      })
    })


  }
}
