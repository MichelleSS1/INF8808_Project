/**
 * Sanitizes the names from the data in the "Player" column.
 *
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
export function cleanNames (data) {
  // TODO: Clean the player name data
  data.forEach((line) => {
    line.Player = line.Player.charAt(0).toUpperCase() + line.Player.slice(1).toLowerCase()
  })
  return data
}
