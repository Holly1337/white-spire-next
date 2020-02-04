const { generateFullLeaderboard } = require('./generateFullLeaderboard')

const models = require('../models/index');

const getNewestTimestamps = async (limit = 1) => {
  const response = await models.RankEntry.findAll({
    attributes: ['timestamp'],
    group: ['timestamp'],
    order: [['timestamp', 'DESC']],
    limit
  })
  return response.map(
    entry => entry.timestamp
  )
}

const getFullLeaderboard = async () => {
  const [current, previous] = await getNewestTimestamps(2)

  const currentLeaderboard = await models.RankEntry.findAll({
    where: { timestamp: current },
    order: [['position', 'ASC']],
  })

  const previousLeaderboard = await models.RankEntry.findAll({
    where: { timestamp: previous },
    order: [['position', 'ASC']],
  })

  return generateFullLeaderboard(currentLeaderboard, previousLeaderboard)
}

module.exports = {
  getNewestTimestamps,
  getFullLeaderboard
}

