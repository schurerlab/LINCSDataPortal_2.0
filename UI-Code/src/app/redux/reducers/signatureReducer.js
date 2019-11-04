/**
 * Created by akoleti on 6/3/19.
 */
import { ADD_ARTICLE } from "../constants/actions-types";

const initialState = {
    articles: []
};

function signatures(state = initialState, action) {
    if (action.type === ADD_ARTICLE) {
        return Object.assign({}, state, {
            articles: state.articles.concat(action.payload)
        });
    }
    return state;
}
export default signatures;
