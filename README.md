# TimeTracker

Time Tracker is an interactive proposal for Tallan Inc.'s employee time management portal. 
Employees can log in and submit/edit new timesheets for the project or project phase that they 
were assigned to. In addition, administrators can manage their internal system with the following 
features: 
* Add new clients 
* Add new projects for each client in the system 
* Add a phase to a project
* Add employees and assign them to either a project or a phase
* Get an overview of each client, project, phase, and employee

It is built using HTML5, CSS3, Bootstrap, JavaScript, AngularJS, and HTML5 LocalStorage. For the optimal
viewing experience, please follow the directions below:


##Getting Started
You can navigate to the [app url](http://jensenbouzi.com/TimeTracker/) or clone this repository and run a simple python web server to get started:

```
	python -m SimpleHTTPServer 8000
```

##Administrator Portal
When getting started, the you must add clients, projects, phases, and emloyees into the
system. To do so, click the admin button on the bottom to enter the admin portal. On 
each page, there will be instructions prompting you to add these objects to the system.
Be sure to assign your employees to projects or phases such that they can add their own timesheets 
for these assignments.

##Employee Portal
Once you've added clients, projects, phases and employees, you can sign out and log in as one of
the employees. For simplicity, you only need to provide the employee's full name and any password 
(the password input simply checks the length of the password typed) in order to log in as that employee.
Once in the employee portal, you can add timesheets for the employee's assignments and view basic statistics 
regarding their burndown. 



