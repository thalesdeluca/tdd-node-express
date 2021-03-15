const { Technology } = require("../../models");

class TechnologyService {
  static async getTechnologies() {
    return await Technology.query();
  }

}

module.exports = TechnologyService; 