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