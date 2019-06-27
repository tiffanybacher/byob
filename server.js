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

app.get('/api/v1/staff', (request, response) => {
  database('staff').select()
    .then(staff => response.status(200).json(staff))
    .catch(error => response.status(500).json({ error }));
});
