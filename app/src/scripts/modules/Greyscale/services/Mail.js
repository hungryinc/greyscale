'use strict'

module.exports = function($q, $resource, config) {

    var resource = $resource(config.api + '/mail', {}, {
        mail: {
            method: "POST",
            authentication: "required"
        }
    });

    this.mail = function(data) {
        var deferred = $q.defer();
        resource.mail(data, function(response) {
            deferred.resolve(response);
        }, function(r) {
            deferred.reject(r);
        });

        return deferred.promise;
    }
    
}