(function () {

    angular.module('taskTracker')
    .controller('phasesController', ['$scope', '$stateParams', 'databaseService', function ($scope, $stateParams, databaseService) {

        $scope.clients = databaseService.getData('clients');
        $scope.phases = databaseService.getData('phases');

    }])
})();