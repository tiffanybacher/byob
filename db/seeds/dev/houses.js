const housesData = require('../../../datasets/housesData.js');

const createHouse = (knex, house) => {
  return knex('houses').insert({
    house: house.house,
    founder: house.founder,
    animal: house.animal,
    colors: house.colors,
  }, 'id');
}

exports.seed = function(knex, Promise) {
  return knex('houses').del()
    .then(() => {
      let housePromises = [];

      housesData.forEach(house => {
        housePromises.push(createHouse(knex, house));
      });

      return Promise.all(housePromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
