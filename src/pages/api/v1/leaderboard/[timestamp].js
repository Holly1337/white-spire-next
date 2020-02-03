const moment = require('moment')
const models = require('../../../../../models')

/**
 * returns all entries for the given exact timestamp. Ordered by position
 * :timestamp - 'YYYY-MM-DD HH:mm:ss'
 */
export default async (req, res, next) => {
  const timestampParam = req.query.timestamp
  const timestamp = moment(timestampParam, 'YYYY-MM-DD HH:mm:ss', true)
  if (!timestamp.isValid()) {
    res.json({ error: 'Invalid timestamp format. Must be YYYY-MM-DD HH:mm:ss' })
    return
  }

  models.RankEntry.findAll({
    where: { timestamp },
    order: [['position', 'ASC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
}
