/************************************** V1/2 - RADAR CHART *************************************/

export function preprocessOffense(data) {

    let new_data = []

    data.forEach((item) => {
        new_data.push({
            Team: item['Equipe'],
            Season: item['Saison'],
            'Gls/90': item['Gls/match'],
            'xG/90': item['xG/match'],
            'SoT%': item['% Tirs cadrés'],
            'Drib%': item['% Dribbles complétés'],
            'Rec%': item['% Passes reçues'],
            'Cmp%': item['% Passes complétées'],
            'Pts/90': item['Pts/match']
        })
    })

    return new_data
}

export function preprocessDefense(data) {

    let new_data = []

    data.forEach((item) => {
        new_data.push({
            Team: item['Equipe'],
            Season: item['Saison'],
            xGA: item['xGA'],
            GA90: item['GA90'],
            'Save%': item['Save%'],
            'CS%': item['CS%'],
            'Pressure%': item['Pressure%'],
            'Tkl%': item['Tkl%'],
            'Int90': item['Int90']
        })
    })

    return new_data
}


/************************************** V4 - BUMP CHART *************************************/

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
    data['2021-2022'].forEach(ranking => {
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
    
    console.log("matrix ", matrix)
    return matrix;
      
}

