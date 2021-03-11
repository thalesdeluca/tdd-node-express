
exports.up = function(knex) {
  return knex.schema.createTable("candidates_technologies", table => {
    table.increments("id");
    table.boolean("is_main").defaultsTo(false);

    table
      .integer('technology_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('technologies')
      .onDelete("cascade");

    table
      .integer('candidate_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('candidates')
      .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("candidates_technologies")
};
