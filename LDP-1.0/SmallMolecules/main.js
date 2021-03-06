var app = angular.module('compounds', [
	'ngResource',
	'mgcrea.ngStrap',
	'ngAnimate',
	'ngRoute',
	'ui.bootstrap',
	'angucomplete-alt','chart.js','smart-table'
]).directive('navBar', function () {
	return {
		templateUrl: 'components/nav/navbar.html'
	};
}).directive('footBar',function(){
	return {
		templateUrl: 'components/footer/footer.html'
	};
}).directive('headTitle',function(){
	return {
		templateUrl: 'components/datasetLandingPages/header/header.html'
	};
}).directive('datasetTabs',function(){
	return {
		templateUrl: 'tabs.html'
	};
});

app.service('DatasetService', function (Dataset, $q,$location,$window,DatasetPost,$timeout) {

	var self = {
		'gototop': function () {
			$window.scrollTo(0, 0)
		 },
		'maxSize': 10,
		'currentPage' : 0,
		'loadmoretrue':[],
		'items': [],
		'queryString':[],
		'querylenthcounter':"",
		'searchTerm':[],
		'selected' : [],
		'selectedItems' : [],
		'totalpages':[],
		'page': 1,
		'skip':0,
		'limit':10,
		'oldFacets':[],
		'hasMore': true,
		'isSaving': false,
		'selectedPerson': null,
		'cart':[],
		'downloadSkip':0,
		'documents': [],
		'selecteddocuments':[],
		//'search': "*",
		'type':"_text_",
		'sort':"dataset_count desc",
		'downloadoutput':[],
		'switch':"OR",
		'clearAll':function(){
			self.searchTerm ="*";
			self.selectedItems=[];
			self.selected=[];
			self.loadDocuments();
		},
		'emptyAll':function(){
			self.searchTerm ="*";
			self.selectedItems=[];
			self.selected=[];
		},

		'doSearch': function (type,search) {
			self.limit=10;
			self.skip =0;
			self.currentPage = 0;
			self.hasMore = true;
			self.page = 1;
			self.documents = [];
			self.search = "*"+search+"*";
			self.type = type;
			self.loadDocuments();
		},
		'loadNext': function (id) {
			self.currentPage = id;
			var skid = id-1;
			self.documents = [];
			self.skip=skid * self.limit;
			self.loadDocuments();
		},
		'doOrder': function (order) {
			self.hasMore = true;
			self.page = 1;
			self.documents = [];
			self.sort = order;
			self.loadDocuments();
		},

		'loadDocuments': function () {

				console.log(self.searchTerm);

				if (self.searchTerm.length < 1) {
					self.searchTerm = "*";
				}


			//
			self.facet ="source,assays,FDA_PHASE,Drug_Class,MECH_OF_ACTION";
			DatasetPost.save({ verb:'fetchmolecules', searchTerm: self.searchTerm,  facet:self.facet,limit:self.limit,skip:self.skip,sort:self.sort}, function(data) {
					self.documents=data.results.documents;
					self.allfacets=data.results.facets;
					self.totalDocuments=data.results.totalDocuments;
					self.pagenation= Math.ceil(self.totalDocuments/self.limit);
					if(self.oldfacetfield!=null && self.searchTerm.length>1){
						self.allfacets[0][self.oldfacetfield] = self.oldFacets;
					}
				}
			);
		},
		'downloadNextPage':function(id,cartitems){
			self.selecteddocuments = [];
			self.downloadSkip=id * 10;
			self.selectedDatasets(cartitems);

		},
		'selectedDatasets': function (cartitems) {
			DatasetPost.save({ verb:'fetchentities', searchTerm: cartitems, skip:self.downloadSkip}, function(data) {
					self.selecteddocuments=data.results.documents;
				}
			);
		},
		'removeFromCart':function () {

			this.cart = []
			self.selectedDatasets(this.cart.toString().replace(new RegExp(',', 'g'), ' || '));
		},
		'removeDatasets': function (id) {
			var idx = this.cart.indexOf(id);
			if (idx > -1) {
				this.cart.splice(idx, 1);
			}
			this.cart.toString().replace(new RegExp(',', 'g'), ' || ')
			self.selectedDatasets(this.cart.toString().replace(new RegExp(',', 'g'), ' || '));
		},
		'downloadSelected': function () {
			Dataset.get({ verb:'bulk-download', datasets: self.cart.toString() }, function(data) {
					self.downloadoutput=data.data.filename;
					$location.url("download/"+self.downloadoutput)
				}
			);
		},
		'exists':function(item, list){
			return list.indexOf(item) > -1;
			self.currentPage = 0;
		},
		'elements' :function(item, text, list, tk){
			console.log("item:"+item+" "+"text"+text+" "+"list"+list+" "+"tk"+tk );
			self.currentPage = 0;
			if(self.allfacets!=undefined){
				if (self.allfacets[0][tk] != undefined ) {
					self.oldFacets = self.allfacets[0][tk];
					self.oldfacetfield = tk;
				}
			}
			function getKeyByValue(value) {
			
				for (var prop in self.allfacets[0]) {
					if (self.allfacets[0].hasOwnProperty(prop)) {
						for (var item in self.allfacets[0][prop]) {
							if (item === value)
								return prop;
						}
					}
				}
				return false;
			};

			function buildUrlSearchTerm() {
				var url = "";
				 for (key in urlObject) {
					 if(self.switch === "OR"){
						 url += key + ':(' + '' + urlObject[key].join(" || ") + '' + ')' + ' ';
					 }else if(self.switch === "AND"){
						 url += key + ':(' + '' + urlObject[key].join(" AND ") + '' + ')' + ' ';
					 }
				 }
				return url;
			}

			var idx = list.indexOf(item);
			if (idx > -1) {
				self.selectedItems.splice(idx, 1);
			}
			else if (item != undefined) {
				self.selectedItems.push({"label": item, "type": tk});
			} else {
				self.selectedItems.push({"label": text, "type": '_text_'});
			}
			var chipkeys = [];
			var urlObject = {};
			for (i = 0; i < self.selectedItems.length; i++) {
				if (!urlObject[self.selectedItems[i].type]) urlObject[self.selectedItems[i].type] = [];
				urlObject[self.selectedItems[i].type].push('"' + self.selectedItems[i].label + '"');
			}
			if (idx > -1) {
				list.splice(idx, 1);
				//toaster.pop('warning', 'Removed from the list:',item);
			} else if (item != undefined) {
				list.push(item);
				//toaster.pop('success', 'Added to the list:',item);
			} else {
				list.push(text);
			}

			if (self.selected.length == 0) {
				self.searchTerm = "*";

			} else {
				self.searchTerm = buildUrlSearchTerm();
				query = [];
				for (i = 0; i < self.selectedItems.length; i++) {
					query.push(self.selectedItems[i].type + ":" + self.selectedItems[i].label);
				}
			}
			self.items = [];
			if (self.queryString.length - 1 == self.querylenthcounter) {
				self.limit=10;
				self.skip =0;

				self.loadDocuments();
			}
			if (self.queryString.length<1) {
				self.limit=10;
				self.skip =0;
				self.loadDocuments();
			}
		}
	};
	if($location.search().query == null ) {
		self.loadDocuments();
	}
	return self;

});