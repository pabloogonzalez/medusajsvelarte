module.exports = {
  up: async (knex) => {
    await knex.schema.table('product', (table) => {
      table.date('pickup_date');
      table.string('time_slot');
    });
  },
  down: async (knex) => {
    await knex.schema.table('product', (table) => {
      table.dropColumn('pickup_date');
      table.dropColumn('time_slot');
    });
  },
};
