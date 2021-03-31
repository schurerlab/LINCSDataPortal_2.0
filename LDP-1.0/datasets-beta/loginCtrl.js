/**
 * Created by akoleti on 8/28/17.
 */
var auth = {};
var logout = function(){
    console.log('*** LOGOUT');
    auth.loggedIn = false;
    auth.authz = null;
    auth.email = null;
    auth.username = null;
    window.location = auth.logoutUrl;
};

app.controller('GlobalCtrl', function($scope, $http,$timeout) {
    var keycloakAuth = new Keycloak('keycloak.json');
    auth.loggedIn = false;

    keycloakAuth.init({ onLoad: 'chech-sso' }).success(function () {
        auth.loggedIn = true;
        auth.authz = keycloakAuth;
        keycloakAuth.loadUserInfo().success(function (userInfo) {
            auth.email=userInfo.email;
            auth.username = userInfo.preferred_username;
        });

        auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/dst/protocol/openid-connect/logout?redirect_uri=http://localhost:8080/dataset-submission/index.html";
        app.factory('Auth', function() {
            return auth;
        });
    }).error(function () {
        window.location.reload();
    });

    $timeout( function(){
        $scope.user = auth.username;
        $scope.email = auth.email;
        // console.log($scope.useremail);
    }, 50 );


    $scope.init = function() {


    };
    // setInterval(function() {
    $scope.init();
    // }, 1000);
    $scope.logout = logout;

});

// app.factory('authInterceptor', function($q, Auth) {
//     return {
//         request: function (config) {
//             var deferred = $q.defer();
//             if (Auth.authz.token) {
//                 Auth.authz.updateToken(5).success(function() {
//                     config.headers = config.headers || {};
//                     config.headers.Authorization = 'Bearer ' + Auth.authz.token;
//
//                     deferred.resolve(config);
//                 }).error(function() {
//                     deferred.reject('Failed to refresh token');
//                 });
//             }
//             return deferred.promise;
//         }
//     };
// });
//
//
//
// app.factory('errorInterceptor', function($q) {
//     return function(promise) {
//         return promise.then(function(response) {
//             return response;
//         }, function(response) {
//             if (response.status == 401) {
//                 console.log('session timeout?');
//                 logout();
//             } else if (response.status == 403) {
//                 alert("Forbidden");
//             } else if (response.status == 404) {
//                 alert("Not found");
//             } else if (response.status) {
//                 if (response.data && response.data.errorMessage) {
//                     alert(response.data.errorMessage);
//                 } else {
//                     alert("An unexpected server error has occurred");
//                 }
//             }
//             return $q.reject(response);
//         });
//     };
// });
//
