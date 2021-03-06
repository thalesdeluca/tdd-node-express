
const json = require("../../assets/code_challenge.json");
const { Candidate, Technology, CandidateTechnology } = require("../../models");


exports.seed = async function(knex) {
  return await json.candidates.reduce( async (previousCandidate, { id, technologies, experience, city: address }) => {
    
    await previousCandidate;
    console.log("teste", previousCandidate);
    const candidateRegistered = await Candidate.query().findOne("external_id", id);
  

    if(candidateRegistered) {
      return candidateRegistered;
    }

    const xp = experience.replace("years", "").trim().split(/-| |\+/);
    const min_experience = Number(xp[0])
    const max_experience = Number(xp[1]) !== NaN ? Number(xp[1]) : null;

    const addressSplitted = address.split("-");
    const city = addressSplitted[0].trim();
    const state = city === "Remote" ? null : addressSplitted[1].trim();

    try {
      const candidateSaved = await Candidate.transaction(async trx => {
       
        const candidate = await Candidate.query(trx).insert({
          external_id: id,
          min_experience,
          max_experience,
          city,
          state,
        })

        const technologiesSaved = []

        return await technologies.reduce(async (previousTech, { name, is_main_tech }) => {
          await previousTech;
          const technologyRegistered = await Technology.query(trx).findOne("name", name);
          console.log(technologyRegistered)
          

          let technology = technologyRegistered ? technologyRegistered : await Technology.query(trx).insert({
            name,
          })

          await CandidateTechnology.query(trx).insert({
            technology_id: technology.id,
            candidate_id: candidate.id,
            is_main: is_main_tech
          })
        })
      })
    } catch(err) {
      console.log(err);
    }
  })
};
