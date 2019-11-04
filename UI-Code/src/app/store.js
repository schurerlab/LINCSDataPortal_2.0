 import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import perturbationsReducer from "./redux/reducers/perturbations";
import modelsystemsReducer from "./redux/reducers/modelsystems";
import signaturesReducer from "./redux/reducers/signatures";
import genelistReducer from "./redux/reducers/genelist";
import searchSuggetsReducer from "./redux/reducers/search-suggest";
import searchTermsReducer from "./redux/reducers/search-terms";
 


export default createStore(
    combineReducers({ 
        perturbationsReducer, 
        modelsystemsReducer, 
        signaturesReducer,
        genelistReducer,
        searchSuggetsReducer,
        searchTermsReducer
    }),
    {},
    applyMiddleware(logger, thunk)
);