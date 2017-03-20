(function () {
    'use strict';

    var app = angular.module('FT', ['ngRoute', 'firebase', 'ngStorage', 'ngMaterial', 'ngMessages', 'ngMenuSidenav', 'md.data.table', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'angularMoment']);
    app.constant('firebaseUrl', 'https://funtime-6014c.firebaseio.com');
    //app.run(function ($rootScope, $location, $sessionStorage, $timeout) {
    //    $rootScope.$on('$routeChangeSuccess', function () {
    //        $rootScope.currentUrl = $location.path();
    //    });
    //});
    app.run(function(){
    document.addEventListener('deviceready', function(){
        return true;
    });
});

})();
