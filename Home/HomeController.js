(function () {

    angular.module('taskTracker')
    .controller('homeController', ['$scope', '$stateParams', 'databaseService', function($scope, $stateParams, databaseService) {
        $scope.name = '';
        $scope.animate = false;
        $scope.validName = false;
        $scope.employees = databaseService.getData('employees');
        $scope.validateName = validateName;

        $scope.toggleOpen = function() {
            $scope.animate = !$scope.animate;
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        function validateName(name, password){
            console.log('name', name);
            var employee = _.where($scope.employees, {name: name});
            console.log('employee', employee);
            if (employee.length === 1 && password.length) {
                $scope.validName = true;
            }
        }
    }]);
})();