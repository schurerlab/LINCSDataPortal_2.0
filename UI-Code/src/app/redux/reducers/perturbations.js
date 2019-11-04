
const init_state_perturbations = {
    n_smallmolecules: '-',
    n_shrnas: '-',
    n_cdnas: '-',
    n_antibodies: '-',
    n_microenvironments: '-',
    n_perturbations: '-',
    data_table_perturbagens: [{}],
    showPerturbation: null
};

const perturbationsReducer = (state = init_state_perturbations, action) => {

    switch (action.type) {
        case "SET_N_SMALLMOLECULES":
            state = {
                ...state,
                n_smallmolecules: action.payload
            }
            break;
        case "SET_N_SHRNAS":
            state = {
                ...state,
                n_shrnas: action.payload
            }
            break;
        case "SET_N_CDNAS":
            state = {
                ...state,
                n_cdnas: action.payload
            }
            break;
        case "SET_N_ANTIBODIES":
            state = {
                ...state,
                n_antibodies: action.payload
            }
            break;
        case "SET_N_MICROENVIRONMENTS":
            state = {
                ...state,
                n_microenvironments: action.payload
            }
            break;
        case "SET_N_PERTERBATIONS":
            state = {
                ...state,
                n_perturbations: action.payload
            }
            break;
        case "SET_DATA_PERTURBAGENS":
            state = {
                ...state,
                data_table_perturbagens: action.payload
            }
            break;
        case "SET_SHOW_PERTURBATION":
            state = {
              ...state,
              showPerturbation: action.payload
            }
            break;
    }
    return state;
};

export default perturbationsReducer;
