# Review as I go
* Solution is an architecture for organizing projects
	* One Solution can have multiple projects
* Below the solution file is the project file
	* Project is the structure for organizing files and folders in single project
	* If you double click the file its opens the project csproj file where we properties of the project

* In Properties file, there is launchSettings.json
	* Has launch setting configurations
	* Contains profiles: http, https, IIS Express,etc..
	* It will have API Url running under
* Controller folders will have different endpoints or controllers for our application
* appsettings.json is used to store configs for our apps like database connection strins, env variables
* Program.cs is important as it is the entry point of the project 
	* Is first executed when app runs
	* We add dependencies to our app to be used later
	* First add services to container (.net supports depdendecny injection; allows control between class and depende)
	* Configure HTTP request pipeline
		* By using pipeline, add middleware which handles requests and reponses
		* configured by default

