
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('', table => {

    })
  ]);
};

exports.down = function(knex) {
  return Promises.all([
    knex.schema.createTable('', table => {

    })
  ]);
};
