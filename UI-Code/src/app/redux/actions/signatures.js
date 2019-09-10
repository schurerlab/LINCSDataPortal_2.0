export function nullCountSignatures() {
    return dispatch => {
        dispatch(setCountTranscriptional());
        dispatch(setCountDoseResponse());
        dispatch(setCountCellPhenotype());
        dispatch(setCountProteomic());
        dispatch(setCountEpigenetic());
        dispatch(setCountSignaturesTotal());
    }
}

export function setCountTranscriptional(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_TRANSCRIPTIONAL",
        payload: n

    };
}

export function setCountDoseResponse(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_DOSERESPONSE",
        payload: n

    };
}

export function setCountCellPhenotype(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_CELLPHENOTYPE",
        payload: n

    };
}

export function setCountProteomic(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_PROTEOMIC",
        payload: n

    };
}

export function setCountEpigenetic(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_EPIGENETIC",
        payload: n

    };
}

export function setCountSignaturesTotal(n) {

    if (n === undefined)
        n = '-'

    return {
        type: "SET_N_SIGNATURES",
        payload: n

    };
}