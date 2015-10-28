(function () {

    angular.module('taskTracker')
    .controller('timeEntryController', ['$scope','systemLockFactory', '$stateParams', 'databaseService', function ($scope, systemLockFactory, $stateParams, databaseService) {

        $scope.orderBy = '';
        $scope.status = {
            opened: false
        };
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $scope.status.opened = true;
        };
        $scope.workTypes = ['Training', 'Analysis','Development', 'Testing', 'Network', 'Proposal', 'Design', 'Travel', 'Recruiting'];
        $scope.entry = {};
        $scope.isCollapsed = true;

        var employees = databaseService.getData('employees');
        $scope.employee = _.find(employees, { name: $stateParams.name });

        $scope.projects = function() {
            var projects = [];
            $scope.employee.assignments.forEach(function(assignment) {
                if (assignment.project != null) {
                    projects.push(assignment.project);
                };
            });
            return projects;
        };

        $scope.phases = function() {
            var phases = [];
            $scope.employee.assignments.forEach(function(assignment) {
                if (assignment.phase != null) {
                    phases.push(assignment.phase);
                };
            });
            return phases;
        };

        $scope.updateTime = function(entry) {
            databaseService.updateTime($scope.employee, entry);
        };

        $scope.addTime = function (entry) {
            var newEntry = entry;
            $scope.entry = {};
            databaseService.addTime($scope.employee, newEntry);           
        };
    }]);
})();