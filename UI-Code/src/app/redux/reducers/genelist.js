
const init_state_genelist = {
    array_up_genes: "ATAD2",
    array_down_genes: "BUB1B"
};

const genelistReducer = (state = init_state_genelist, action) => {

    switch (action.type) {
        case "SET_UP_GENES":
            state = {
                ...state,
                array_up_genes: action.payload
            }
            break;

        case "SET_DOWN_GENES":
            state = {
                ...state,
                array_down_genes: action.payload
            }
            break;
    }
    return state;
};

export default genelistReducer;