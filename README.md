# Disney API

## Table of Contents
Description -
Features -
Technologies and resources -
Requirements -
Instructions - Installing -
Documentation -
Testing


## Description

 This is an API api to explore Disney movies, get to know all the characters and the movies they worked on. 
 Common users can register and search the list and detail of characters, movies and genre. 
 Administrators can create, edit and delete movies, characters and genre, as well as global access and modification to users.

## Features:

Users register and login.
Role Validation (Admin or not).
Characters CRUD functions.
Movies CRUD functions.
Genre CRUD functions.

##  Technologies and resources

- Node.js
- Nodemon
- Express
- Express validator
- Jsonwebtoken
- BCrpyt for password encryption
- Sendgrid/mail
- Dotenv
- MySQL
- Sequelize (ORM)
- Postman for testing 
- Swagger for API documentation
- For testing: chai, mocha, supertest


### Requirements

You need to have (installed):
- [NodeJS](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/es/index.html)
- [HeidiSQL](https://www.heidisql.com/download.php) installed for Windows users or [MySQLWorkbench](https://dev.mysql.com/downloads/workbench/) for macOS users to handle the host of MySQL local database.

## Instructions - Installing

A step by step series of examples that tell you how to get a development env running.

1.- Clone the repository


$ git clone https://github.com/msilvanat/Disney_Api.git




2.- Install the following dependencies

```
npm i express express-validator body-parser bcryptjs jsonwebtoken moment mysql2 sequelize @sendgrid/mail

```

3.- Now, you have to start sql server on XAMPP and create a new session on HeidiSQL or MySQL Workbench called "disney_api". Run on them the sql file for database creation: //`./db/dbase.sql`.

```

    database: 'disney_api', 
    username: 'root',
    password: '',
    dialect: 'mysql',
    port: 3306,
    host: 'localhost'
    
```

4.- To run the api, run this on the terminal
```
node server.js 
```

## Documentation 

You can find the documentation here

https://app.swaggerhub.com/apis/msilvanat/MyDisneyApi/1.0.0


##  Testing 

In order to test all the requests available of the app, there's a **Postman** Collection that you can find [here]

https://documenter.getpostman.com/view/11943629/TzXzEHwZ


🔐 If you need to have admin permissions use this sample data:
```

username: Admin
password: admin123
```
User for tests:
```

username: lilaflorenz
password: lila123
```


##  Author 
- [@msilvanat](https://github.com/msilvanat)

