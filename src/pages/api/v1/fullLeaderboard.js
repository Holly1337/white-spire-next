const { getFullLeaderboard } = require('../../../../api-lib/queries')
const models = require('../../../../models')

/**
 * returns all entries for the latest timestamp and ads timeInLord and positionChange
 */
export default async (req, res) => {
  const fullLeaderboard = await getFullLeaderboard()
  res.setHeader('Content-Type', 'application/json')
  res.json(fullLeaderboard)
}
