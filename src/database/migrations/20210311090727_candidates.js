
exports.up = function(knex) {
  return knex.schema.createTable("candidates", (table) => {
    table.increments('id');
    table.string("city");
    table.integer("external_id")
    table.integer("min_experience").defaultsTo(0);
    table.integer("max_experience").defaultsTo(0);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("candidates")
};
