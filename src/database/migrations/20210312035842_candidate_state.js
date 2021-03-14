
exports.up = function(knex) {
  return knex.schema.alterTable("candidates", (table) => {
    table.string("state");
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable("candidates", (table) => {
    table.dropColumn("state");
  })
};
