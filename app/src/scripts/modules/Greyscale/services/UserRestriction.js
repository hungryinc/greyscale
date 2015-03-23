module.exports = function(redirectTo) {    
    return ['$q', '$state', '$timeout', 'CurrentUser', function($q, $state, $timeout, CurrentUser) {
        var deferred = $q.defer();

        function reject(slug) {
            $timeout(function() {
                $state.transitionTo(redirectTo);
            })
        }

        CurrentUser.get().then(function(user) {
            reject();
        }, function() {
            deferred.resolve();
        })
        
        return deferred.promise;
    }]
}