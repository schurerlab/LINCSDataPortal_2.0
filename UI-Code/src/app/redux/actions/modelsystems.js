export function nullCountModelSystems() {
    return dispatch => {
        dispatch(setCountCells());
        dispatch(setCountCelltypes());
        dispatch(setCountDiseases());
        dispatch(setCountTissuetypes());
        dispatch(setCountModelsystemsTotal());
    }
}

export function setCountCells(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_CELLS",
        payload: n

    };
}

export function setCountCelltypes(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_CELLTYPESS",
        payload: n

    };
}

export function setCountDiseases(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_DISEASES",
        payload: n

    };
}

export function setCountTissuetypes(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_TISSUETYPES",
        payload: n

    };
}

export function setCountModelsystemsTotal(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_MODELSYSTEMS",
        payload: n

    };
}

export function setDataTableModelSystems(json) {

    if (json === undefined)
        json = NaN

    return {
        type: "SET_DATA_MODELSYSTEMS",
        payload: json
    };
}

export function setShowModelSystem(json) {
  return {
    type: "SET_SHOW_MODELSYSTEM",
    payload: json   
  }
}
