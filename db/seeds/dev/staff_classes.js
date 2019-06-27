const staffData = require('../../../datasets/staffData');

const createStaffMember = (knex, member) => {
  return knex('staff').insert({
    name: member.name,
    job_title: member.job_title
  }, 'id')
  .then(memberID => {
    let className = member.class;
    let classPromise;

    if (className) {
      classPromise = createClass(knex, className, memberID[0]);

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
