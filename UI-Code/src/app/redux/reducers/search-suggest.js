
const init_state_suggest = {
    suggest_str: '',
    suggest_json: [{}],
    facets_json: [{}],
    suggest_url: "",
    suggest_time: 0
};

const searchSuggetsReducer = (state = init_state_suggest, action) => {

    switch (action.type) {
        case "SET_SUGGEST_DATA":
            state = {
                ...state,
                suggest_json: action.payload
            }
            break;

        case "SET_FACETS_DATA":
            state = {
                ...state,
                facets_json: action.payload
            }
            break;

        case "SET_SUGGEST_STR":
            state = {
                ...state,
                suggest_str: action.payload
            }
            break;

        case "SET_SUGGEST_URL":
            state = {
                ...state,
                suggest_url: action.payload
            }
            break;

        case "SET_SUGGEST_TIME":
            state = {
                ...state,
                suggest_time: action.payload
            }
            break;

    }
    return state;
};

export default searchSuggetsReducer;