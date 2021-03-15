const { Technology } = require("../../models");
const CandidateService = require(".");
const { TechnologyService } = require("..");

describe('TechnologyService', () => {

  test("list technologies", async () => {
    expect.assertions(2);
    try {
      const technologies = await TechnologyService.getTechnologies();

      expect(typeof technologies).toBe("object");
      expect(Array.isArray(technologies)).toBe("array")
    } catch(err) {
      
    }

  });
  
})

