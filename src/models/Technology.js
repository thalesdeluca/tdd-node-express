'use strict';

const { Model } = require("objection");
const knex = require("../config/database");

Model.knex(knex);

class Technology extends Model {
  static get tableName() {
    return "technologies"
  }

  static get relationMappings() {
    const Candidate  = require("./Candidate");

    return {
      candidates: {
        relation: Model.ManyToManyRelation,
        modelClass: Candidate,
        join: {
          from: "technologies.id",
          through: {
            from: "candidates_technologies.technology_id",
            to: "candidates_technologies.candidate_id",
            extra: ['is_main']
          },
          to: "technologies.id"
        }
      }
    }
  }
}

module.exports = Technology;