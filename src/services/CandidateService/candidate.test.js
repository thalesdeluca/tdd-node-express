const { Candidate } = require("../../models");
const CandidateService = require("./");

describe('CandidateService', () => {
  test("calculate points: match state, city, tech, xp", async () => {
    expect.assertions(1);
    const candidateMock = {
      min_experience: 4,
      max_experience: 5,
      technologies: [
        { name: "Java", is_main: true },
        { name: "Java (Android)", is_main: false},
        { name:"Unity", is_main: false },
      ],
      city: "São Paulo",
      state: "SP",
    };

    const params = {
      city: "São Paulo",
      state: "SP",
      min_xp: 3,
      max_xp: 6,
      techs: [
        "Java",
        "Unity"
      ]
    }

    let resultExpected = 0;

    resultExpected += params.state === candidateMock.state ? 5 : 0;
    resultExpected += params.city === candidateMock.city ? 10 : 0;
    resultExpected += params.min_xp <= candidateMock.min_experience ? candidateMock.min_experience : 0;
    resultExpected += candidateMock.technologies.reduce((acc, { name, is_main }) => {
      if(params.techs.includes(name)) {
        if(is_main) {
          console.log(name);
          acc += 10;
        }
        acc += 2;
      }

      return acc;
    }, 0)

    resultExpected += candidateMock.technologies.length / 2;

    expect(CandidateService.calculatePoints(candidateMock, params, true)).toBe(resultExpected);
  });

  
  test("calculate points: match none", () => {
    expect.assertions(1);
    const candidateMock = {
      min_experience: 7,
      max_experience: 8,
      technologies: [
        { name: "C#", is_main: true },
        { name: "SQL", is_main: false},
        { name:"NodeJS", is_main: false },
      ],
      city: "Londrina",
      state: "PR",
    };

    const params = {
      city: "São Paulo",
      state: "SP",
      min_xp: 3,
      max_xp: 6,
      techs: [
        "Java",
        "Unity"
      ]
    }

    let resultExpected = 0;

    resultExpected += params.state === candidateMock.state ? 5 : 0;
    resultExpected += params.city === candidateMock.city ? 10 : 0;
    resultExpected += params.min_xp <= candidateMock.min_experience ? candidateMock.min_experience : 0;
    if(candidateMock.min_experience <= params.max_xp) {
      resultExpected += candidateMock.min_experience - min_xp;
      resultExpected += !params.max_xp ?  0 : candidateMock.max_experience;
    }

    resultExpected += candidateMock.technologies.reduce((acc, { name, is_main }) => {
      if(params.techs.includes(name)) {
        if(is_main) {
          console.log(name);
          acc += 10;
        }
        acc += 2;
      }

      return acc;
    }, 0)

    resultExpected += candidateMock.technologies.length / 2;

    expect(CandidateService.calculatePoints(candidateMock, params, true)).toBe(resultExpected);
  });
  
  test("list candidates", async () => {
    expect.assertions(2);
    try {
      const candidates = await CandidateService.getCandidates();

      expect(candidates).toHaveProperty("candidates");
      expect(candidates).toHaveProperty("matchers")
    } catch(err) {
      
    }

  });

  test("list technologies", async () => {
    expect.assertions(2);
    try {
      const candidates = await CandidateService.getCandidates();

      expect(candidates).toHaveProperty("candidates");
      expect(candidates).toHaveProperty("matchers")
    } catch(err) {
      
    }

  });
  
})

