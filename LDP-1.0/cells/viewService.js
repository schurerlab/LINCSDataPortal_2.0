/**
 * Created by akoleti on 3/8/16.
 */
app.service('ViewService', function (DatasetDetails,$location,$window) {
    var self = {
        'limit':10,
        'skip':0,
        'gototop': function () {
            $window.scrollTo(0, 0)
        },
        'viewDatasetDetails': function (term) {
            self.gototop();
            temp= "LINCS_ID:"+term;
            // self.datasetid=term;
            DatasetDetails.get({verb: 'fetchcells', searchTerm: temp,limit: self.limit,skip:self.skip}, function (data) {
                    self.datasetinfo=data.results.documents[0];
                    self.name=data.results.documents[0].Name;
                    self.loadDatasets();
                }
            )
        },
        'loadDatasets':function(){
            clSearch="cellline:"+"\""+self.name+"\"" + " OR iPSC:\""+self.name+"\"" +" OR primarycell:\""+self.name+"\"" +" OR differentiatediPSC:\"" +self.name +"\"";
            DatasetDetails.get({verb: 'fetchdata', searchTerm:clSearch ,limit:200,skip:self.skip,fields:'datasetname,datasetid,assayname,centerletter,centerurl,assaydesignmethod,biologicalbucket'}, function (data) {
                self.totalDatasets = data.results.totalDocuments;
                self.clDatasets = data.results.documents;
          


            })
        }
    }


    return self;
});
