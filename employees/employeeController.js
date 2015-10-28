(function() {

    angular.module('taskTracker')
    .controller('employeeController', ['$scope', '$stateParams', 'databaseService', function ($scope, $stateParams, databaseService) {

        $scope.employee = {};
        $scope.assignment = {};
        $scope.practices = ['UX', 'Azure', 'BizTalk', 'Business Intelligence', 'Mobile', 'SharePoint'];

        // Functions for opening and closing forms
        $scope.status = {
            opened: false
        };

        $scope.open = function ($event) {
            $scope.status.opened = true;
        };

        $scope.isCollapsed = true;

        // Get clients from database
        $scope.clients = databaseService.getData('clients');
        $scope.projects = databaseService.getData('projects');
        $scope.phases = databaseService.getData('phases');
        $scope.employees = databaseService.getData('employees');

        // Add Employee to system 
        $scope.addEmployee = function(employee) {

            var newEmployee = employee;

            databaseService.addEmployee(newEmployee);

            $scope.employee = {};

        };

        // Assign employee to either phase or project 
        $scope.assignEmployee = function(assignment, employee) {

            var newEmployee = employee;
            var newAssignment = assignment;
            $scope.assignment = {};

            if (assignment.project != null) {

                databaseService.assignToProject(newAssignment, newEmployee);

            } else if (assignment.phase != null) {

                databaseService.assignToPhase(newAssignment, newEmployee);

            };

        };

    }])
})();