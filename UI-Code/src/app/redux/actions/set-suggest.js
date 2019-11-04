
export function setSuggestData(n) {

    if (n === undefined)
        n = {}

    return {
        type: "SET_SUGGEST_DATA",
        payload: n

    };
}

export function setSuggestStr(n) {

    if (n === undefined)
        n = ''

    return {
        type: "SET_SUGGEST_STR",
        payload: n

    };
}

export function setFacetsData(n) {

    if (n === undefined)
        n = ''

    return {
        type: "SET_FACETS_DATA",
        payload: n

    };
}