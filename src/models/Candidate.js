'use strict';

const { Model } = require("objection");
const knex = require("../config/database");
const Technology  = require("./Technology");

Model.knex(knex);

class Candidate extends Model {
  static get tableName() {
    return "candidates"
  }

  static get relationMappings() {
    return {
      technologies: {
        relation: Model.ManyToManyRelation,
        modelClass: Technology,
        join: {
          from: "candidates.id",
          through: {
            from: "candidates_technologies.candidate_id",
            to: "candidates_techonologies.technology_id"
          },
          to: "technologies.id"
        }
      }
    }
  }
}

module.exports = Candidate;