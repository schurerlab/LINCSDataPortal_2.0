/**
 * Created by akoleti on 3/8/16.
 */
app.factory("Dataset", function ($resource) {
    return $resource("/dcic/api/:verb", {verb:'@verb', searchTerm:'@searchTerm',facet:'@facet', sort:'@sort', limit:'@limit',skip:'@skip'}, {
        update: {
            method: 'GET'
        }
    });
});
app.factory("DatasetPost", function ($resource) {
    return $resource("/dcic/api/:verb", {verb:'@verb', searchTerm:'@searchTerm',facet:'@facet', sort:'@sort', limit:'@limit',skip:'@skip'}, {
        update: {
            method: 'POST'
        }
    });
});