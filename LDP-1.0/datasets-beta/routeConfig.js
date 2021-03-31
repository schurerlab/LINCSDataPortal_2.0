/**
 * Created by akoleti on 3/8/16.
 */


app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
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
    ) .when('/date',
        {
            templateUrl:'date.jsp'
        }
    )
        .when('/terms',
        {
            templateUrl:'termsofuse.html'
        }
    ).when('/acknowledgement',
        {
            templateUrl:'acknowledgement.html'
        }
    )
        .otherwise(
        {
            templateUrl:'main.html',contoller:'DatasetListController'
        });

    $locationProvider.html5Mode(true);

}]);
