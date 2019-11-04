// need to update setCountMicroevnironments, and misspelled Perturbations

export function nullCountPerturbations() {
    return dispatch => {
        dispatch(setCountSmallMolecules());
        dispatch(setCountshRNAs());
        dispatch(setCountcDNAs());
        dispatch(setCountAntibodies());
        dispatch(setCountMicroevnironments());
        dispatch(setCountPerterbationsTotal());
    }
}

export function setCountTest() {

    let n = Math.floor(Math.random() * 1000);

    return dispatch => {
        dispatch(setCountSmallMolecules(n))
    };
}

export function setCountSmallMolecules(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_SMALLMOLECULES",
        payload: n

    };
}

export function setCountshRNAs(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_SHRNAS",
        payload: n

    };
}

export function setCountcDNAs(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_CDNAS",
        payload: n

    };
}

export function setCountAntibodies(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_ANTIBODIES",
        payload: n

    };
}

export function setCountMicroevnironments(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_MICROENVIRONMENTS",
        payload: n
    };
}

export function setCountPerterbationsTotal(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_PERTERBATIONS",
        payload: n
    };
}

export function setDataTablePerturbagens(json) {

    if (json === undefined)
        json = NaN

    return {
        type: "SET_DATA_PERTURBAGENS",
        payload: json
    };
}
