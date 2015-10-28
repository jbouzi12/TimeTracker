(function () {

    angular.module('taskTracker')
    .controller('clientsController', ['$scope', '$stateParams', 'databaseService', function ($scope, $stateParams, databaseService) {

        $scope.client = {};
        $scope.project = {};
        $scope.technologies = ['Angular', 'Azure', 'BizTalk', 'HTML&CSS', 'Mobile', 'SharePoint'];
        $scope.approvers = ['Krish', 'Doug', 'Bob'];
        $scope.workTypes = ['Training', 'Analysis','Development', 'Testing', 'Orientation', 'Design', 'Travel', 'Network'];
        $scope.query = '';

        // Functions for opening and closing forms
        $scope.disabled = function (date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events =
          [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
          ];
        $scope.status = {
            opened: false
        };

        $scope.open = function ($event) {
            $scope.status.opened = true;
        };

        $scope.isCollapsed = true;

        // Get clients from database
        $scope.clients = databaseService.getData('clients');

        // Add clients and assign projects to clients
        $scope.addClient = function(client) {

            var newClient = client;

            databaseService.addClient(newClient);

            $scope.client = {};

        };

        $scope.assignProject = function (client, project) {
            
            var newProject = project

            $scope.project = {};

            databaseService.assignProject(client, newProject);


        };

    }])



})();