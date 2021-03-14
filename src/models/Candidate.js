'use strict';

const { Model } = require("objection");
const knex = require("../config/database");

Model.knex(knex);

class Candidate extends Model {
  static tableName() {
    return "candidates"
  }

  static get relationMappings() {
    const Technology  = require("./Technology");


    return {
      technologies: {
        relation: Model.ManyToManyRelation,
        modelClass: Technology,
        join: {
          from: "candidates.id",
          through: {
            from: "candidates_technologies.candidate_id",
            to: "candidates_technologies.technology_id",
            extra: ['is_main']
          },
          to: "technologies.id"
        }
      }
    }
  }
}

module.exports = Candidate;