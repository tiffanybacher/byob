# BYOB
Build Your Own Backend! An educational project aimed to get comfortable with building a RESTful API.

This API contains accessible data on Hogwarts students, staff, and classes. 

## Learning Goals
- Build a dataset then store data using PostgreSQL/Knex.js
- Create endpoints using Node.js/Express
- Deploy API on Heroku

## Getting started
To run the API in development mode:

run `git clone https://github.com/tiffanybacher/byob.git`\
run `node server.js`\
open `localhost:3001` in your browser

## Deployed on Heroku

To view API in production: https://hogwarts-roster.herokuapp.com/

## API Endpoints
### Students

- **Post Student** - `/api/v1/students`

  You must pass the student's name and house id into the request body.\
  EX: `{ name: 'Dennis Creevey', house_id: 1 }`.\
  The response will return the new student's id.

- **Get All Students** - `/api/v1/students`

  This will return an array of student objects.

- **Get Specific Student** - `/api/v1/students/:id`

  The student's id must be passed into the `:id` param. This will return a student object containing an id, name, and house_id.
  
- **Delete Student** - `/api/v1/students/:id`

  The student's id must be passed into the `:id` param.
  
### Staff

- **Post Staff Member** - `/api/v1/staff`

  You must pass the staff member's name and job title into the request body.\
  EX: `{ name: 'Dolores Umbridge', job_title: 'Instructor' }`.\
  The response will return the new staff member's id.

- **Get All Staff** - `/api/v1/staff`

  This will return an array of staff member objects.

- **Get Specific Staff Member** - `/api/v1/staff/:id`

  The staff member's id must be passed into the `:id` param. This will return a staff member object containing an id, name, and job_title.
  
- **Delete Staff Member** - `/api/v1/staff/:id`

  The staff member's id must be passed into the `:id` param.

### Classes

- **Post Class** - `/api/v1/classes`

  You must pass the class name and instructor id into the request body.\
  EX: `{ class: '', instructor_id: 64 }`.\
  The response will return the new class's id.

- **Get All Classes** - `/api/v1/classes`

  This will return an array of classes as objects.

- **Get Specific Class** - `/api/v1/classes/:id`

  The class's id must be passed into the `:id` param. This will return a class as an object containing an id, class, and instructor_id.
  
- **Delete Class** - `/api/v1/classes/:id`

  The class's id must be passed into the `:id` param.

## Authored By:
[Tiffany Bacher](https://github.com/tiffanybacher)

