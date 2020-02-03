const models = require('../../../../../models')

const HOURS_IN_A_YEAR = 24 * 7 * 52

export default (req, res) => {
  const playername = req.query.name
  models.RankEntry.findAndCountAll({
    where: { playername },
    limit: HOURS_IN_A_YEAR,
    order: [['timestamp', 'DESC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
}
