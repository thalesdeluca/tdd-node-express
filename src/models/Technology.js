'use strict';

const { Model } = require("objection");
const knex = require("../config/database");
const Candidate  = require("./Candidate");

Model.knex(knex);

class Technology extends Model {
  static get tableName() {
    return "technologies"
  }

  static get relationMappings() {
    return {
      candidates: {
        relation: Model.ManyToManyRelation,
        modelClass: Candidate,
        join: {
          from: "technologies.id",
          through: {
            from: "candidates_technologies.technology_id",
            to: "candidates_techonologies.candidate_id"
          },
          to: "technologies.id"
        }
      }
    }
  }
}

module.exports = Technology;