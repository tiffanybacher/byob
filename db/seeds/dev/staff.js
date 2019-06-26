const staffData = require('../../../datasets/staffData');

const createStaffMember = (knex, member) => {
  return knex('staff').insert({
    id: member.id,
    name: member.name,
    job_title: member.job_title
  })
  .then(() => {
    let classPromise;

    if (member.class) {
      classPromise = createClass(knex, member.class, member.id);

      return Promise.resolve(classPromise);
    }
  });
}

const createClass = (knex, className, instructor_id) => {
  return knex('classes').insert({
    class: className,
    instructor_id
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
