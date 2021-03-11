'use strict';

const { Candidate, Technology } = require("../models");


class CandidateService {
  static calculatePoints(candidate, params) {

  }

  static async getCandidates({ city, min_xp, max_xp, tech }) {
    const candidates = await Candidate.query()
      .whereExists((builder) => {
        if(tech) {
          builder.where((Candidate.relatedQuery("technologies").where("name", "like", `%${tech}%`)))
        }
      })
      .joinEager(["technologies"])
  }
}

module.exports = CandidateService;