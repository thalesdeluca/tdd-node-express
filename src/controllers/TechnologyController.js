'use strict';
const express = require("express");
const { TechnologyService } = require("../services");

class TechnologyController {
  constructor() {
    this.router = express.Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/technologies", this.index)
  }

  async index(req, res) {
    try {
      const technologies = await TechnologyService.getTechnologies();
      
      return res.status(200).send(technologies);
    } catch(err) {
      console.log(err)
      return res.status(500).send(err);
    }
  }
}

module.exports = TechnologyController