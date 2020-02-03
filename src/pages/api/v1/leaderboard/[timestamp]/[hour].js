const moment = require('moment')
const models = require('../../../../../../models')
const Sequelize = require('sequelize')

const Op = Sequelize.Op

export default async (req, res) => {
  const dateParam = req.query.timestamp
  const hourParam = req.query.hour
  const intHour = parseInt(hourParam)

  const date = moment(dateParam, 'YYYY-MM-DD', true)
  if (!date.isValid()) {
    res.json({ error: 'Invalid date format. Must be YYYY-MM-DD' })
    return
  }

  if (intHour < 0 || intHour > 23) {
    res.json({ error: 'hour must be between 0 and 23' })
    return
  }

  const from = `${dateParam} ${intHour}:00:00`
  const to = `${dateParam} ${intHour + 1}:00:00`

  models.RankEntry.findAll({
    where: { timestamp: { [Op.between]: [from, to] } },
    order: [['timestamp', 'DESC'], ['position', 'ASC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
}
