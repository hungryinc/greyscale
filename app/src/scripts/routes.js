'use strict';

module.exports = function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        template: require('./modules/Greyscale/html/pages/homepage.html'),
        controller: 'MainCtrl',
      })

      .when('/about', {
        template: require('./modules/Greyscale/html/pages/about.html'),
        controller: 'MainCtrl',
      })

      .when('/assets', {
        template: require('./modules/Greyscale/html/pages/assets.html'),
        controller: 'AssetCtrl',
      })

    $locationProvider.html5Mode(true);

};
