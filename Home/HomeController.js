(function () {

    angular.module('taskTracker')
    .controller('homeController', ['$scope', '$stateParams', 'databaseService', function($scope, $stateParams, databaseService) {
        $scope.name = '';
        $scope.animate = false;
        $scope.isDisabled = true;
        $scope.employees = databaseService.getData('employees');
        $scope.validateName = validateName;

        $scope.toggleOpen = function() {
            $scope.animate = !$scope.animate;
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        function validateName(name, password){
            var employee = _.where($scope.employees, {name: name});
            if (employee.length === 1 && password.length >=5) {
                $scope.isDisabled = false;
            }
        };

    }]);
})();