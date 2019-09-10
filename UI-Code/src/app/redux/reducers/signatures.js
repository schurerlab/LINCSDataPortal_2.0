
const init_state_signatures = {
    n_transcriptional: '-',
    n_doseresponse: '-',
    n_cellphenotype: '-',
    n_proteomic: '-',
    n_epigenetic: '-',
    n_signatures: '-'
};

const signaturesReducer = (state = init_state_signatures, action) => {

    switch (action.type) {
        case "SET_N_TRANSCRIPTIONAL":
            state = {
                ...state,
                n_transcriptional: action.payload
            }
            break;
        case "SET_N_DOSERESPONSE":
            state = {
                ...state,
                n_doseresponse: action.payload
            }
            break;
        case "SET_N_CELLPHENOTYPE":
            state = {
                ...state,
                n_cellphenotype: action.payload
            }
            break;
        case "SET_N_PROTEOMIC":
            state = {
                ...state,
                n_proteomic: action.payload
            }
            break;
        case "SET_N_EPIGENETIC":
            state = {
                ...state,
                n_epigenetic: action.payload
            }
            break;
        case "SET_N_SIGNATURES":
            state = {
                ...state,
                n_signatures: action.payload
            }
            break;
    }
    return state;
};

export default signaturesReducer;