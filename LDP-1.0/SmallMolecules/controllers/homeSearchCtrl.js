/**
 * Created by akoleti on 2/23/17.
 */
app.controller('HomeSearchCtrl',function($scope,DatasetService,$location){
    $scope.searchDatasets = DatasetService;

    $scope.searchWithSuggest = function(selectedItem) {

        if ('originalObject' in selectedItem && selectedItem.originalObject !== null) {
            var item = '', searchHandle = '';

            if ('originalObject' in selectedItem && selectedItem.originalObject !== null) {
                if (typeof(selectedItem.originalObject) === 'object') {
                    if ('label' in selectedItem.originalObject) {
                        item = selectedItem.originalObject.label;
                        if(selectedItem.originalObject.type=='smallmolecule' ){
                            searchHandle ='SM_Name';
                        }else if(selectedItem.originalObject.type=='assayname'){
                            searchHandle ='assays';
                        }else if(selectedItem.originalObject.type=='cellline'){
                            searchHandle ='cells';
                        }
                        else{
                            searchHandle = selectedItem.originalObject.type;
                        }

                    }

                } else {
                    item = selectedItem.originalObject;
                    searchHandle = 'text';
                }

                $location.path('/catalog');

                $scope.searchDatasets.elements(item, '', $scope.searchDatasets.selected, searchHandle);

            }
        }
    }
});