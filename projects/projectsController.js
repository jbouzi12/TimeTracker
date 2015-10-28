(function () {

    angular.module('taskTracker')
    .controller('projectsController', ['$scope', '$stateParams', 'databaseService', function ($scope, $stateParams, databaseService) {

        $scope.technologies = ['Angular', 'Azure', 'BizTalk', 'HTML&CSS', 'Mobile', 'SharePoint'];
        $scope.practices = ['Angular', 'Azure', 'BizTalk', 'Business Intelligence', 'Mobile', 'SharePoint'];
        $scope.approvers = ['Krish', 'Doug', 'Bob'];
        $scope.workTypes = ['Training', 'Analysis', 'Development', 'Testing', 'Orientation', 'Design', 'Travel', 'Network'];

        $scope.status = {
            opened: false
        };

        $scope.open = function ($event) {
            $scope.status.opened = true;
        };

        $scope.isCollapsed = true;

        $scope.phase = {};
        $scope.assignment = {};
        $scope.projects = databaseService.getData('projects');
        $scope.clients = databaseService.getData('clients');
        $scope.employees = databaseService.getData('employees');

        $scope.hasProjects = function(client) {
            return client.projects.length >= 1;
        };

        $scope.assignPhase = function (c, project, phase) {
            var newPhase = phase;
            $scope.phase = {};
            databaseService.assignPhase(c, project, newPhase);
        };

    }])
})();