
const init_state_signatures = {
    data_table_signatures: [{}],
    showSignatures: null
};

const signaturesReducer = (state = init_state_signatures, action) => {

    switch (action.type) {

        case "SET_DATA_SIGNATURES":
            state = {
                ...state,
                data_table_signatures: action.payload
            }
            break;
        case "SET_SHOW_SIGNATURES":
            state = {
                ...state,
                showSignatures: action.payload
            }
            break;
    }
    return state;
};

export default signaturesReducer;


