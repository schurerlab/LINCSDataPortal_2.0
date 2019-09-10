
const init_state_terms = {
    array_terms: []
};

const searchTermsReducer = (state = init_state_terms, action) => {

    switch (action.type) {
        case "ADD_ARRAY_TERMS":
            state = {
                ...state,
                array_terms: [...state.array_terms, action.payload]
            }
            break;
        case "SUB_ARRAY_TERMS":
            state = {
                ...state,
                array_terms: state.array_terms.filter(array_terms => array_terms !== action.payload)
            }
            break;
    }
    return state;
};

export default searchTermsReducer;