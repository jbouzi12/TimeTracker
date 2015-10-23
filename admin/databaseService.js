(function () {

    angular.module('taskTracker')
    .service('databaseService', ['$localStorage', function ($localStorage) {
        var self = this;

        $localStorage.$default({
            clients: [],
            projects: [],
            phases: [],
            employees:[]
        });

        self.addTime = function(employee, timeEntry) {
            var updatedEm = employee;
            var newEntry = timeEntry;
            newEntry.dateAdded = new Date();
            updatedEm.timeEntries.push(newEntry);
            updatedEm.totalTime = getTotal(updatedEm.timeEntries);
            console.log(updatedEm);
            console.log(updatedEm.totalTime);
            updateModel('employees', updatedEm);
        };

        self.updateTime = function(employee, timeEntry) {
            var updatedEm = employee;
            var updatedTime = timeEntry;
            updatedTime.modifyDate = new Date();
            
            var oldTimeIndex = _.findIndex(employee.timeEntries, { description: updatedTime.description });

            updatedEm[oldTimeIndex] = updatedTime;
            updatedEm.totalTime = getTotal(updatedEm.timeEntries);
            //console.log(updatedEm);
            //console.log(updatedTime);
            updateModel('employees', updatedEm);
        };

        self.addClient = function(client) {
            var newClient = client;
            newClient.projects = [];

            storeModel('clients', newClient);
        };

        self.addEmployee = function (employee) {
            var newEmployee = employee;
            newEmployee.timeEntries = [];
            newEmployee.assignments = [];

            storeModel('employees', newEmployee);
        };

        self.assignToPhase = function(assignment, employee) {
            var newAssignment = assignment;
            newAssignment.employee = employee.name;

            //Find assignment phase and associated client and project;
            var phases = $localStorage['phases'];
            var projects = $localStorage['projects'];
            var clients = $localStorage['clients'];
            var phase = _.find(phases, { name: assignment.phase });
            var project = _.find(projects, { name: phase.project });
            var client = _.find(clients, { name: project.client });

            console.log(phase.project);
            console.log(client);

            //Update employee, phase, and project in database;
            employee.assignments.push(newAssignment);
            phase.assignments.push(newAssignment);

            ////Update employee, client, phase, and project in database;
            //TODO: Fix issue with updating Project and client
            updateModel('employees', employee);
            updateModel('phases', phase);
            updateParent('projects', 'phases', project, phase);
            updateParent('clients', 'projects', client, project);
        };

        self.assignToProject = function(assignment, employee) {
            var newAssignment = assignment;
            newAssignment.employee = employee.name;

            //Find project and associated client for project
            var projects = $localStorage['projects'];
            var clients = $localStorage['clients'];
            var project = _.find(projects, { name: assignment.project });
            var client = _.find(clients, { name: project.client });
            //console.log(newAssignment);

            // Add assignment to both employee and project
            employee.assignments.push(newAssignment);
            project.assignments.push(newAssignment);

            // Update employee, project, and client in database
            updateModel('employees', employee);
            updateModel('projects', project);
            updateParent('clients', 'projects', client, project);
        };

        self.assignProject = function (client, project) {
            var newProject = project;
            newProject.client = client.name;
            newProject.phases = [];
            newProject.assignments = [];

            client.projects.push(newProject);

            storeModel('projects', newProject);
            updateModel('clients', client);

        };

        // If going to update client when adding phase or project when adding employee to phase
        // need to add third parameter to below function
        
        self.assignPhase = function(client, project, phase) {
            var newPhase = phase;
            newPhase.project = project.name;
            newPhase.client = project.client;
            newPhase.assignments = [];

            project.phases.push(phase);

            storeModel('phases', newPhase); 
            updateModel('projects', project);
            updateParent('clients','projects', client, project);
        };

        function getTotal(arr) {
            var total = 0;
            _.each(arr, function(value) {
                total += value.hours;
            });
            return total;
        };
        // GET and POST methods for retrieving and adding data from localStorage
       
        self.getData = function (type) {

            return $localStorage[type];

        };

        function storeModel(type, model) {

            $localStorage[type].push(model);

        };

        function updateModel(type, model) {

            var collection = $localStorage[type];

            var index = _.findIndex(collection, { name: model.name });

            collection[type][index] = model;
    
        };

        // Optional if I want to update the Client object when phases or employees are added to project
        // May need to include this later
        function updateParent(parentType, childType, parent, child) {
            var parentCollection = $localStorage[parentType];

            var parentIndex = _.findIndex(parentCollection, { name: parent.name });

            var childIndex = _.findIndex(oldParent[childType], { name: child.name });

            parentCollection[parentIndex][childType][childIndex] = child;
            
        };

    }])

})();