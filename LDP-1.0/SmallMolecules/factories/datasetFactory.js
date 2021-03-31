/**
 * Created by akoleti on 9/1/16.
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
app.factory("StructurePost", function ($resource) {
    return $resource("http://dev3.ccs.miami.edu:8080/SMDB-app/smdb/", { molecule:'@molecule',type:'@type', limit:'@limit',similarity:'@similarity'}, {
        update: {
            method: 'GET'
        }
    });
});