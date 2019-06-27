const staffData = require('../../../datasets/staffData');
const classesData = require('../../../datasets/classesData');

const createStaffMember = (knex, member) => {
  return knex('staff').insert({
    id: member.id,
    name: member.name,
    job_title: member.job_title
  });
}

exports.seed = function(knex) {
  return knex('classes').del()
    .then(() => knex('staff').del())
    .then(() => {
      let staffPromises = staffData.map(member => {
        return createStaffMember(knex, member);
      });

      return Promise.all(staffPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

const createClass = (knex, classItem) => {
  return knex('classes').insert({
    id: classItem.id,
    class: classItem.class,
    instructor_id: classItem.instructor_id
  });
}

exports.seed = function(knex) {
  return knex('classes').del()
    .then(() => {
      let classesPromises = classesData.map(classItem => {
        return createClass(knex, classItem);
      });

      return Promise.all(classesPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
