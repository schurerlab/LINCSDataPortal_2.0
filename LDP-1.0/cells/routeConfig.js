/**
 * Created by akoleti on 3/8/16.
 */
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/download/:id',
        {
            templateUrl:'download.html',contoller:'DownloadController'
        }
    )
        .when('/view/:id',
        {
            templateUrl:'data.html',contoller:'ViewCtrl'
        }
    )
        .when('/WordCloud/:id/:epName',
        {
            templateUrl:'WordCloud.html',contoller:'WordCloudCtrl'
        }
    )
        .when('/Sunbrust/:id/:epName',
        {
            templateUrl:'Sunbrust.html',contoller:'SunburstCtrl'
        }
    ).when('/Packcloud/:id/:epName',
        {
            templateUrl:'packcloud.html',contoller:'PackCtrl'
        }
    ).when('/terms',
        {
            templateUrl:'components/footer/termsofuse.html'
        }
    ).when('/acknowledgement',
        {
            templateUrl:'components/footer/acknowledgement.html'
        }
    ) .when('/catalog',
        {
            templateUrl: 'main.html', contoller: 'DatasetListController'
        }
    )
        .when('/',
            {
                templateUrl: 'home.html', contoller: 'HomeController'
            }
        )
        .otherwise(
        {
            templateUrl:'main.html',contoller:'DatasetListController'
        })

}]);
