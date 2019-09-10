
export function setSearchTerms(str, is_set) {

    if (str === undefined)
        return {}

    if (is_set == true) {
        return {
            type: "ADD_ARRAY_TERMS",
            payload: str

        };
    } else {
        return {
            type: "SUB_ARRAY_TERMS",
            payload: str
        };

    }
}
