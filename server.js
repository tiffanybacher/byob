const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
// imports, setting port, etc

app.use(express.json());

app.set('port', process.env.PORT || 3001);

app.listen(port, () => {
  console.log(`Hogwarts is running on ${port}.`);
});

app.get('/', (request, response) => {
// create a get endpoint for the root url
  response.status(200).send('Hello! Welcome to Hogwarts!');
  // returning a simple string response
});

app.post('/api/v1/staff', (request, response) => {
// create a post endpoint for a staff member
  const staffMember = request.body;
  // setting the request body object as a staff member

  for (let param of ['name', 'job_title']) {
  // setting an iteration over an array of the required params
    if (!staffMember[param]) {
    // if the required param does not exist
      return response
        .status(422)
        // return a response with a 422 status code and
        .send({ error: `Expected { name: <string>, job_title: <string> }. '${param}' is missing.` });
        // return a message indicating which param is missing
    }
  }

  database('staff').insert(staffMember, 'id')
  // if all required params exist then find staff table and insert the staff member and return the new id
    .then(staffMember => {
      response.status(201).json({ id: staffMember[0] });
    })
    // return a status code of 201 along with an object containing the new id
    .catch(error => {
      response.status(500).json({ error });
    });
    // if all else fails, return a status code of 500 with the error message
});

app.get('/api/v1/staff', (request, response) => {
// create a get endpoint for staff
  database('staff').select()
  // select the staff table
    .then(staff => response.status(200).json(staff))
    // return a status of 200 with the array of staff
    .catch(error => response.status(500).json({ error }));
    // return an error with a status of 500 and the error
});

app.get('/api/v1/staff/:id', (request, response) => {
// create a get endpoint for a staff member
  const id = request.params.id;
  // setting the id from the request params

  database('staff').where('id', id).select()
  // filtering the data from the staff table where the id matches
    .then(staffMember => {
      if (staffMember.length) {
        response.status(200).json(staffMember);
        // if staff member exists with id, return status 200 and the staff member
      } else {
        response.status(404).json({
          error: `Could not find staff member with id ${id}.`
        });
        // if the staff member does not exist, return a status 404 and message indicating the faulty id
      }
    })
    .catch(error => response.status(500).json({ error }));
    // returning an error if the fetch fails
});

app.delete('/api/v1/staff/:id', (request, response) => {
// creating a delete endpoint for a staff member
  const id = request.params.id;
  // setting the id from the request params

  database('classes').where('instructor_id', id).update({
    instructor_id: null
  }, ['instructor_id'])
  // finding the class where the instructor id matches the id in order to change the value to null before deleting the instructor
  .then(() => {
    database('staff').where('id', id).del()
    // deleting the staff member with the matching id from the staff table
      .then(staffMember => {
        if (!staffMember) {
          response.status(404).json({ error: `Could not find student with id ${id}.` });
        // if the staff member does not exist, return a status 404 along with a message indicating the faulty id
        } else {
          response.status(202).json({ sucess: `Staff member ${id} was successfully deleted.` });
        // otherwise returning a 202 with a message that the staff member was successfully deleted
        }
      });
    })
    .catch(error => response.status(500).json({ error }));
    // returning an error if the fetch failed
});

app.post('/api/v1/students', (request, response) => {
// creating a post endpoint for a student
  const student = request.body;
  // setting student as the object from the request body

  for (let param of ['name', 'house_id']) {
  // iterating over the required params for student
    if (!student[param]) {
      return response
        .status(422)
        .send({ error: `Expected { name: <string>, house_id: <integer> }. '${param}' is missing.` });
    // if a param is missing, send a 422 with a message indicating the missing param
    }
  }

  database('students').insert(student, 'id')
  // otherwise find the students table and insert the new student and return the new id
    .then(footnote => {
      response.status(201).json({ id: footnote[0] });
    })
    // return a 201 with the new id
    .catch(error => {
      response.status(500).json({ error });
    })
    // return an error if the fetch fails
});

app.get('/api/v1/students', (request, response) => {
// create a get endpoint for all students
  database('students').select()
  // select the students table from the database
    .then(students => response.status(200).json(students))
    // return a 200 along with an array of students
    .catch(error => response.status(500).json({ error }));
    // return a 500 if the fetch fails
});

app.get('/api/v1/students/:id', (request, response) => {
// create a get endpoint for a student
  const id = request.params.id;
  // setting the id from the request params

  database('students').where('id', id).select()
  // find the student in the student table with the matching id
    .then(student => {
      if (student.length) {
        response.status(200).json(student);
        // if the student exists, return a 200 and the student object
      } else {
        response.status(404).json({ 
          error: `Could not find student with id ${id}.`
        });
        // otherwise return a 404 with a message indicating the faulty id
      }
    })
    .catch(error => response.status(500).json({ error }));
    // return error if fetch fails
});

app.delete('/api/v1/students/:id', (request, response) => {
// create a delete endpoint for a student
  const id = request.params.id;
  // set the id to the request param

  database('students').where('id', id).del()
  // find and delete the student in the students table with the matching id
    .then(student => {
      if (!student) {
        response.status(404).json({ error: `Could not find student with id ${id}.` });
      // if the student was not found, return a 404 with a message indicating the faulty id
      } else {
        response.status(202).json({ success: `Student ${id} was successfully deleted` });
      // otherwise send a 202 with a message indicating the student was successfully deleted
      }
    })
    .catch(error => response.status(500).json({ error }));
    // return an error if the fetch failed
});

app.post('/api/v1/classes', (request, response) => {
  const classItem = request.body;

  for (let param of ['class', 'instructor_id']) {
    if (!classItem[param]) {
      return response
        .status(422)
        .send({ error: `Expected { class: <string>, instructor_id: <integer> }. You are missing a '${param}' property.` })
    }
  }

  database('classes').insert(classItem, 'id')
    .then(paper => {
      response.status(201).json({ id: paper[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/classes', (request, response) => {
  database('classes').select()
    .then(classes => {
      response.status(200).json(classes);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/classes/:id', (request, response) => {
  const id = request.params.id;

  database('classes').where('id', id).select()
    .then(classItem => {
      if (classItem) {
        response.status(200).json(classItem);
      } else {
        response.status(404).json({ 
          error: `Could not find class with id ${id}.` 
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/classes/:id', (request, response) => {
  const id = request.params.id;

  database('classes').where('id', id).del()
    .then(classItem => {
      if (!classItem) {
        response.status(404).json({ error: `Could not find class with id ${id}.` });
      } else {
        response.status(202).json({ success: `Class ${id} was successfully deleted` });
      }
    })
    .catch(error => response.status(500).json({ error }));
});
