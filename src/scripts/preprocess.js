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

export function preprocessTooltipOff(labels, description) {
    let tooltips = []
    labels.forEach((label, i) => {
        tooltips.push({
            label: label,
            description: description[i]
        })
    })

    return tooltips
}

export function preprocessTooltipDef(labels, description) {
    let tooltips = []
    labels.forEach((label, i) => {
        tooltips.push({
            label: label,
            description: description[i]
        })
    })

    return tooltips
}