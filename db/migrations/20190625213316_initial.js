
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('houses', table => {
      table.increments('id').primary();
      table.string('house');
      table.string('founder');
      table.string('animal');
      table.string('colors');
      table.timestamps(true, true);
    });

    knex.schema.createTable('staff', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('job_title');
    });

    knex.schema.createTable('students', table => {
      table.increments('id').primary();
      table.string('name');
      table.integer('house_id').unsigned().references('houses.id');
      table.timestamps(true, true);
    });

    knex.schema.createTable('classes', table => {
      table.increments('id').primary();
      table.string('class');
      table.integer('instructor_id').unsigned().references('staff.id');
      table.timestamps(true, true);
    });

    knex.schema.createTable('classrooms', table => {
      table.integer('class_id').unsigned().references('classes.id');
      table.integer('student_id').unsigned().references('students.id');
      table.timestamps(true, true);
    });
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('houses');
    knex.schema.dropTable('staff');
    knex.schema.dropTable('students');
    knex.schema.dropTable('classes');
    knex.schema.dropTable('classrooms');
  ]);
};
