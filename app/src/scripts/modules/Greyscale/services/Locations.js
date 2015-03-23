'use strict'

module.exports = function($q, $resource, $cookies, config) {


    var resource = $resource(config.api + '/locations', {}, {
        get: {
            method: "GET",
            authentication: "required"
        }
    });

    this.get = function(params) {
        var deferred = $q.defer();

        params = params || {};

        resource.get(params, function(response) {
            deferred.resolve(response.locations);
        }, function() {
            deferred.reject();
        });

        return deferred.promise;
    }
}