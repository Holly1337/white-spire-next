const models = require('../../../../models')
const Sequelize = require('sequelize')
/**
 * returns a list of all players and how long (in hours) they have been a lord. Ordered by time.
 */
export default async (req, res) => {
  models.RankEntry.findAll({
    group: ['playername'],
    attributes: ['playername', [Sequelize.fn('COUNT', 'playername'), 'time']],
    order: [[Sequelize.col('time'), 'DESC']]
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
}
