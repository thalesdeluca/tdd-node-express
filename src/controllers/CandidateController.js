'use strict';
const express = require("express");
const CandidateService = require("../services/CandidateService");

class CandidateController {
  constructor() {
    this.router = express.Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/candidates", this.index)
  }

  async index(req, res) {
    const query = req.query;
    try {
      console.log(query)
      const candidates = await CandidateService.getCandidates(query);
      
      return res.status(200).send(candidates);
    } catch(err) {
      return res.status(500).send(err);
    }
  }
}

module.exports = CandidateController