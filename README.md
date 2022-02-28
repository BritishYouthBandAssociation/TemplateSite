# TemplateSite
> A skeleton that allows sites to be created with everything that they need to get up and running quickly with minimum fuss.

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Structure](#structure)
* [Setup](#setup)

## General Information

This repository is for any code and features that are generic and applicabele to every site that we generate.
No site-specific files, colours or configurations should be committed.

## Technologies Used
- JavaScript
- Node.JS
- Handlebars
- ExpressJS
- ESLint

## Structure

```
/
+-- .husky		- contains custom git hooks
+-- config		- contains sample configuration files
+-- lib			- contains general helper modules and classes
+-- public		- contains static content served directly
+-- routes		- contains Express routers
+-- views		- contains handlebars view files
|   +-- layouts		- contains handlebars layout files
|   +-- partials	- contains handlebars partials
+-- app.js		- the entry point for the application
```
## Setup
### Prerequisites

- Node.JS
- NPM
- gulp-cli (to install this run `npm install -g gulp-cli` as a priviledged user)

### Instructions

1. Create a new repository using this one as a template
2. Clone this new repository to your development environment
3. Using a command line, run `npm install` - this will install all of the dependencies for the site and the custom git hooks
4. Using a command line, run `gulp` - this will copy all sample configurations to their non-sample counterpart, and prompt you to edit the values to suit your environment
