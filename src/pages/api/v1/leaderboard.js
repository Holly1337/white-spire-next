const { generateFullLeaderboard } = require('../../../../api-lib/generateFullLeaderboard')
const { getNewestTimestamps } = require('../../../../api-lib/queries')

const models = require('../../../../models')
const Sequelize = require('sequelize')
const moment = require('moment')

const Op = Sequelize.Op

const HOURS_IN_A_YEAR = 24 * 7 * 52
const MS_IN_A_DAY = 1000 * 60 * 60 * 12
const MAX_LEADERBOARD_LIMIT = 48

/**
 * returns all entries for the latest timestamp. Ordered by position
 */
export default async (req, res) => {
  const [timestamp] = await getNewestTimestamps(1)
  models.RankEntry.findAll({
    where: { timestamp },
    order: [['position', 'ASC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
}
