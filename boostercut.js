// boostercut.js

/**
* @param {array} run_x List of friend ids
* @param {number} total_cut Age of the user
* @returns {number} runs
* boostercut function!
*/
module.exports = async (run_x, total_cut) => {
    let runs = run_x.split('/')[1]
    let runs_booster_do = run_x.split('/')[0]
    runs = ((runs_booster_do/runs)*total_cut)/4
  return runs;
}