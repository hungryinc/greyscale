'use strict'

require('angular')
require('angular-ui-router')
require("angular-sanitize")
require("angular-animate")
require("angular-resource")
require("angular-route")

angular.module('Greyscale', [
    'ui.router',
    'ngResource',
    'ngAnimate',
    'ngRoute',
])

// Configs
.config(['$routeProvider', '$locationProvider', require('../../routes.js')])

// Constant
.constant('config', require('../../config/app')())

// Controllers
.controller('MainCtrl', ['$scope', require('./controllers/Layout')])

// Finially, bootstrap
angular.bootstrap(document, ['Greyscale']);