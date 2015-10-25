(function() {
    angular.module('underscore', [])
       .factory('_', function () {
           return window._;
       });

    angular.module('taskTracker', ['ui.router', 'ngStorage', 'ui.bootstrap', 'ngAnimate', 'underscore'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', {
            url: '/',
            views: {
                'header': {
                    templateUrl: 'Home/views/header.html'
                },
                'content': {
                    templateUrl: 'Home/views/home.html',
                    controller: 'homeController'
                },
                'footer': {
                    templateUrl: 'Home/views/footer.html'
                }
            }
        })
        .state('home.timesheet', {
           url: '/:name',
           views: {
               'timesheet@home': {
                   templateUrl: 'Home/views/timesheet.html',
                   controller: 'timeEntryController'
               }
           }
        })
        .state('admin', {
            url: '/admin',
            views: {
                'header': {
                    templateUrl:'/app/Admin/partials/header.html'
                },
                'content': {
                    templateUrl: '/app/Admin/partials/content.html',
                    controller: 'adminController'
                },
                'footer': {
                    templateUrl:'/app/Admin/partials/footer.html'
                }
            },

             
        })
        .state('admin.clients', {
            url: '/clients',
            views: {
                'content@': {
                    templateUrl: '/app/Client/index.html',
                    controller: 'clientsController'
                }
            }
            
        })
        .state('admin.clients.detail', {
            url: '/:id',
            views: {
                'detail@admin.clients': {
                    templateUrl: '/app/Client/show.html'
                }
            }
        })
        .state('admin.projects', {
            url: '/projects',
            views: {
                'content@': {
                    templateUrl: '/app/Project/index.html',
                    controller: 'projectsController'
                }
            }

        })
        .state('admin.projects.detail', {
            url: '/:id',
            views: {
                'detail@admin.projects': {
                    templateUrl: '/app/Project/show.html'
                } //Issue with the back button in this route, can't resolve admin.projects.detail
            }
        })
        .state('admin.phases', {
           url: '/phases',
            views: {
                'content@': {
                    templateUrl: '/app/Phase/index.html',
                    controller: 'phasesController'
                }
            }

        })
        .state('admin.phases.detail', {
            url: '/:id',
            views: {
                'detail@admin.phases': {
                    templateUrl: '/app/Phase/show.html'
                }
            }
        })
        .state('admin.employees', {
            url: '/employees',
            views: {
                'content@': {
                    templateUrl: '/app/Employee/index.html',
                    controller: 'employeeController'
                }
            }
        })
        .state('admin.employees.detail', {
            url: '/:id',
            views: {
                'detail@admin.employees': {
                    templateUrl: '/app/Employee/show.html'
                }
            }
        })
        // Employee state wont have subroute for times, the view will iterate over time array and u update the employee model itself

    }]);


})();