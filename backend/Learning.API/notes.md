# Review as I go

## Project Web API Structure
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

## Routing
* Routing is the process of matchin incomin http requests to action methods that handle it
* It used to map URL of request to controller then its action method

## Domain Models:
* So far I have courses, material, students, and teacher. For now I want to focus on courses and material. 
* For ID property put GUID for unique identifier

## Install NuGet for entity framework Core
* Need entity framework core to creeate database that is needed for our app
* Which will have the structure of our models to put in db

## Create DbContext Class
* Maintain coneection to db
* Track Changes
* Perform CRUD
* Bridge between model and domain
* Controller <- -> DbContext <- -> Database
* It is the primary class responsible for interacting with db and performing crud on the db ablrd
* Create DbContext Class
	* Inherits from DbContext, must important Microsoft.EntityFrameworkCore
	* Create constructor which takes options and passes to base class
	* Now we want the context or collection as properties

## Add Connection String To DB in AppSettings.json
* Inside App.Settings.json, afer hosts we will put the connectionstrings property

## Dependency Injection
* Design pattern
* Built into .NET Core
* Responsible for create and manage instnaces

## Running EF Core Migrations
* Time to run EF core migrations
	* Will create db with the name provided inside connection string and create db inside the SQL server
* Click on tools, Nuget, and then Package Manager Console
	* Type Add-Migration "Initial Migration"
		* Creates a script that framework work can use to create a later on SQL script and create db
		* This now creates a Migration folder with the files, which has the code to create the tables
	* Type Update-Database
		* EF Core will read file and have connection with SQL Server and if DB does not exist it will create one

## Create Controllers
* To create CRUD endpoints we need controllers
* Right click controllers folder, click add controller, make sure on API, and set empty
* We will see it has the shell ready where it will have imports and inherit from ControllerBase

## DTO
* Data Transfer Objects
* Used to transfer data between layers
* 