const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.listen(3001, () => {
  console.log(`Hogwarts is running on port ${port}`);
});

app.post('/api/v1/staff', (request, response) => {
  const staffMember = request.body;

  for (let param of ['name', 'job_title']) {
    if (!staffMember[param]) {
      return response
        .status(422)
        .send({ error: `Expected { name: <string>, job_title: <string> }. '${param}' is missing.` });
    }
  }

  database('staff').insert(staffMember, 'id')
    .then(staffMember => {
      response.status(201).json({ id: staffMember[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/staff', (request, response) => {
  database('staff').select()
    .then(staff => response.status(200).json(staff))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/staff/:id', (request, response) => {
  const id = request.params.id;

  database('staff').where('id', id).select()
    .then(staffMember => {
      if (staffMember.length) {
        response.status(200).json(staffMember);
      } else {
        response.status(404).json({
          error: `Could not find staff member with id ${id}.`
        });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/staff/:id', (request, response) => {
  const id = request.params.id;

  database('classes').where('instructor_id', id).update({
    instructor_id: null
  }, ['instructor_id'])
  .then(() => {
    database('staff').where('id', id).del()
      .then(staffMember => {
        if (!staffMember) {
          response.status(404).json({ error: `Could not find student with id ${id}.` });
        } else {
          response.status(202).json({ sucess: `Staff member ${id} was successfully deleted.` });
        }
      });
    })
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/students', (request, response) => {
  const student = request.body;

  for (let param of ['name', 'house_id']) {
    if (!student[param]) {
      return response
        .status(422)
        .send({ error: `Expected { name: <string>, house_id: <integer> }. '${param}' is missing.` });
    }
  }

  database('students').insert(student, 'id')
    .then(footnote => {
      response.status(201).json({ id: footnote[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    })
});

app.get('/api/v1/students', (request, response) => {
  database('students').select()
    .then(students => response.status(200).json(students))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/students/:id', (request, response) => {
  const id = request.params.id;

  database('students').where('id', id).select()
    .then(student => {
      if (student.length) {
        response.status(200).json(student);
      } else {
        response.status(404).json({ 
          error: `Could not find student with id ${id}.`
        });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/students/:id', (request, response) => {
  const id = request.params.id;

  database('students').where('id', id).del()
    .then(student => {
      if (!student) {
        response.status(404).json({ error: `Could not find student with id ${id}.` });
      } else {
        response.status(202).json({ success: `Student ${id} was successfully deleted` });
      }
    })
    .catch(error => response.status(500).json({ error }));
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
