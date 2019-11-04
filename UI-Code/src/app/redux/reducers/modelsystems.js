
const init_state_modelsystems = {
    n_cells: '-',
    n_celltypes: '-',
    n_diseases: '-',
    n_tissuetypes: '-',
    n_modelsystems: '-',
    data_table_modelsystems: [{}],
    showModelSystem: null
};

const modelsystemsReducer = (state = init_state_modelsystems, action) => {

    switch (action.type) {
        case "SET_N_CELLS":
            state = {
                ...state,
                n_cells: action.payload
            }
            break;
        case "SET_N_CELLTYPESS":
            state = {
                ...state,
                n_celltypes: action.payload
            }
            break;
        case "SET_N_DISEASES":
            state = {
                ...state,
                n_diseases: action.payload
            }
            break;
        case "SET_N_TISSUETYPES":
            state = {
                ...state,
                n_tissuetypes: action.payload
            }
            break;
        case "SET_N_MODELSYSTEMS":
            state = {
                ...state,
                n_modelsystems: action.payload
            }
            break;
        case "SET_DATA_MODELSYSTEMS":
            state = {
                ...state,
                data_table_modelsystems: action.payload
            }
            break;
        case "SET_SHOW_MODELSYSTEM":
            state = {
                ...state,
                showModelSystem: action.payload
            }
            break;
    }
    return state;
};

export default modelsystemsReducer;
