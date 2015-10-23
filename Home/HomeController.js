(function () {

    angular.module('taskTracker')
    .controller('homeController', ['$scope', '$stateParams', 'databaseService', function ($scope, $stateParams, databaseService) {
        $scope.name = '';
        $scope.animate = false;

        $scope.toggleOpen = function() {
            $scope.animate = !$scope.animate;
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
})();