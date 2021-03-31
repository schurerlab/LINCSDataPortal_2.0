/**
 * Created by akoleti on 9/1/16.
 */
app.factory("DatasetDetails", function ($resource) {
    return $resource("/dcic/api/:verb", {verb:'@verb', searchTerm:'@searchTerm',facet:'@facet', sort:'@sort', limit:'@limit',skip:'@skip'}, {
        update: {
            method: 'GET'
        }
    });
});
