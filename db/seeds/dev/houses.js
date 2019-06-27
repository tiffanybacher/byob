const housesData = require('../../../datasets/housesData.js');

const createHouse = (knex, house) => {
  return knex('houses').insert({
    id: house.id,
    house: house.house,
    founder: house.founder,
    animal: house.animal,
    colors: house.colors,
  })
  .then(() => {
    let studentPromises = house.students.map(student => {
        return createStudent(knex, student, house.id);
      });

    return Promise.all(studentPromises);
  });
}

const createStudent = (knex, student, house_id) => {
  return knex('students').insert({
    name: student.name,
    house_id
  });
}

exports.seed = function(knex) {
  return knex('students').del()
    .then(() => knex('houses').del())
    .then(() => {
      let housePromises = housesData.map(house => {
        return createHouse(knex, house);
      });

      return Promise.all(housePromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
