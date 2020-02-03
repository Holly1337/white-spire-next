const { generateFullLeaderboard } = require('../../../../api-lib/generateFullLeaderboard')
const { getNewestTimestamps } = require('../../../../api-lib/queries')

const models = require('../../../../models')

/**
 * returns all entries for the latest timestamp and ads timeInLord and positionChange
 */
export default async (req, res) => {
  let [current, previous] = await getNewestTimestamps(2)

  const currentLeaderboard = await models.RankEntry.findAll({
    where: { timestamp: current },
    order: [['position', 'ASC']],
  })

  const previousLeaderboard = await models.RankEntry.findAll({
    where: { timestamp: previous },
    order: [['position', 'ASC']],
  })

  const fullLeaderboard = generateFullLeaderboard(currentLeaderboard, previousLeaderboard)
  res.setHeader('Content-Type', 'application/json')
  res.json(fullLeaderboard)
}
