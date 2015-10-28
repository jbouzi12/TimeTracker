(function () {
    
    angular.module('taskTracker')
    .factory('systemLockFactory', function () {

        var locked = false;

        return {
            isLocked: function () {
                return locked;
            },
            lockSystem: function () {
                locked = true;
            }
        }
    });
})()