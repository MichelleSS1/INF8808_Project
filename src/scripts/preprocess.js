export function preprocessOffense(data) {

    let new_data = []

    data.forEach((item) => {
        new_data.push({
            Team: item['Equipe'],
            Season: item['Saison'],
            Gls_per_game: item['Gls/match'],
            XG_per_game: item['xG/match'],
            Shot_target_pourcentage: item['% Tirs cadrés'],
            Completed_dribbles_pourcentage: item['% Dribbles complétés'],
            Received_passes_pourcentage: item['% Passes reçues'],
            Completed_passes_pourcentage: item['% Passes complétées'],
            Points_per_game: item['Pts/match']
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
            XGA: item['xGA'],
            Goals_against_per_90: item['GA90'],
            Save_pourcentage: item['Save%'],
            Clean_sheets_pourcentage: item['CS%'],
            Pressure_pourcentage: item['Pressure%'],
            Takle_pourcentage: item['Tkl%'],
            Inteception_per_90: item['Int90']
        })
    })

    return new_data
}