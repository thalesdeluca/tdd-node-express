'use strict';

const { response } = require("express");
const { Candidate, Technology } = require("../../models");
const { raw } = require("objection");

const NUM_MATCHES = 5;

class CandidateService {
  static calculatePoints(candidate, { city, min_xp, max_xp, techs, state }, isMatch = false) {
    let points = 0;

    if (candidate.state === state) {
      points += 5;
      points += candidate.city === city ? 10 : 0;
    }

    points += candidate.min_experience;

    //Suggestions case not match
    if(!isMatch && candidate.min_experience <= max_xp) {
      points += candidate.min_experience - min_xp;
      points += !max_xp ?  0 : candidate.max_experience;
    }


    if(techs && Array.isArray(techs)) {
      techs.forEach((techName) => {
        const tech = candidate.technologies.find(({ name }) => name === techName);
  
        if(tech) {
          if(tech.is_main) {
            points += 10;
          }
          points += 2;
        }
      });
    }

    points += candidate.technologies.length / 2;

    return points;
  }

  static async getCandidates({ state, city, min_xp, max_xp, techs } = {}) {
    try {
      const matchesQuery = Candidate.query()
      .withGraphFetched("technologies");

      if(state) {
        matchesQuery.where("state", "like", `%${state}%`)
      }

      if(city) {
        matchesQuery.where("city", "like", `%${city}%`)
      }

      if(min_xp || max_xp) {
        const maxRange = max_xp || 12;
        const minRange = min_xp || 0;
        matchesQuery.whereBetween("min_experience", [minRange, maxRange])
      }

      if(techs) {
        matchesQuery.whereExists(Candidate.relatedQuery("technologies").whereIn("name", techs))
      }

      const matches = await matchesQuery.execute();
    
      let matchesPoints = matches.map((candidate) => ({
        candidate, 
        points: this.calculatePoints(candidate, { 
          state, 
          city, 
          min_xp, 
          max_xp, 
          techs 
        }, true) 
      }));

      matchesPoints = matchesPoints.sort(({ points: pointA }, { points: pointB }) => pointB - pointA ).slice(0, NUM_MATCHES);

      const candidates = await Candidate.query()
      .withGraphFetched("technologies");

      let candidatePoints = candidates.map((candidate) => ({
        candidate, 
        points: this.calculatePoints(candidate, { 
          state, 
          city, 
          min_xp, 
          max_xp, 
          techs 
        }) 
      }));

      return { matches: matchesPoints, candidates: candidatePoints };


    } catch(err) {
      console.log(err)
    }
  
  }
}

module.exports = CandidateService;