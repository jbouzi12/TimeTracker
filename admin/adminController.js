(function () {

    angular.module('taskTracker')
    .controller('adminController', ['$scope', 'systemLockFactory', '$stateParams', 'databaseService', function($scope, systemLockFactory, $stateParams, databaseService) {

  
        
        $scope.employees = databaseService.getData('employees');
        $scope.clients = databaseService.getData('clients');
        $scope.query = '';
        
        //$scope.lockTimeEntries = function () {
        //    systemLockFactory.lockSystem();
           
        //};

        // Functions for opening and closing forms
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        $scope.open = function ($event) {
            $scope.status.opened = true;
        };

        $scope.isCollapsed = true;

        $scope.status = {
            isItemOpen: new Array($scope.employees.length),
            isFirstDisabled: false
        };
        console.log($scope.status.isItemOpen);
        $scope.status.isItemOpen[0] = true;

    }])
})();