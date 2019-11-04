/**
 * Created by akoleti on 6/3/19.
 */
import { ADD_ARTICLE } from "../constants/actions-types";

export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
};