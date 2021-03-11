'use strict';

const { Model } = require("objection");
const knex = require("../config/database");
const Candidate  = require("./Candidate");
const Technology = require("./Technology");

Model.knex(knex);

class CandidateTechnology extends Model {
  static get tableName() {
    return "candidates_technologies"
  }

  static get relationMappings() {
    return {
      candidate: {
        relation: Model.BelongsToOneRelation,
        modelClass: Candidate,
        join: {
          from: "candidates_technologies.candidate_id",
          to: "candidates.id"
        }
      },
      techonology: {
        relation: Model.BelongsToOneRelation,
        modelClass: Technology,
        join: {
          from: "candidates_technologies.technology_id",
          to: "technologies.id"
        }
      }
    }
  }
}

module.exports = CandidateTechnology;