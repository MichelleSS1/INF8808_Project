/**
 * @param {object} data The data to be displayed
 * @returns {string[]} The names of the teams to be displayed on the left side
 */
export function getLeftTeamNames(data) {
    let leftTeamNames = [];
    data['2019-2020'].forEach(ranking => {
        leftTeamNames.push(ranking.Team)
    });
    return leftTeamNames;
}
  
/**
 * @param {object} data The data to be displayed
 * @returns {string[]} The names of the teams to be displayed on the right side
 */
export function getRightTeamNames(data) {
    let rightTeamNames = [];
    data['2019-2020'].forEach(ranking => {
        rightTeamNames.push(ranking.Team)
    });
    return rightTeamNames;
}

/**
 * @param {object} data The json loaded
 * @returns {Array[]} The ranking matrix
 */
 export function getChartData(data) {
    const teams = getLeftTeamNames(data).sort();
    const seasons = Object.keys(data);

    const teamsIdx = new Map(teams.map((team, i) => [team, i]));
    console.log("ti ", teamsIdx)
    const seasonsIdx = new Map(seasons.map((season, i) => [season, i]));  
    
    // Initialize the ranking matrix
    const matrix = Array.from(teamsIdx, () => new Array(seasons.length).fill(null));  
    console.log("matrix0 ", matrix)
    
    for (const [season, rankings] of Object.entries(data).reverse()) {
        rankings.forEach((ranking, idx) => {
            const seasonIdx = seasonsIdx.get(season);
            const teamIdx = teamsIdx.get(ranking.Team);
            let next = null;
            if (seasonIdx !== seasons.length - 1)
                next = matrix[teamIdx][seasonIdx + 1];

            matrix[teamIdx][seasonIdx] = {rank: idx + 1, pts: ranking.Pts, next: next};
        })
    }
    
    // // The next ranking is the ranking of the season coming after
    // matrix.forEach((d) => {
    //     for (let i = 0; i<d.length - 1; i++) 
    //         d[i].next = d[i + 1];
    // });
    console.log("matrix ", matrix)
    return matrix;
      
}

