/**
 * Created by akoleti on 3/8/16.
 */
app.factory("DatasetDetails", function ($resource) {
    return $resource("/dcic/api/:verb", {verb:'@verb', searchTerm:'@searchTerm',facet:'@facet', sort:'@sort', limit:'@limit',skip:'@skip'}, {
        update: {
            method: 'GET'
        }
    });
});

app.factory("CannedAnalysis", function ($resource) {
    return $resource("http://amp.pharm.mssm.edu/datasets2tools/api/:verb", {verb:'@verb', object_type:'@object_type',dataset_accession:'@dataset_accession'}, {
        update: {
            method: 'GET'
        }
    });
});
