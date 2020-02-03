import { getNewestTimestamps } from '../../../../../api-lib/queries'

const moment = require('moment')
const models = require('../../../../../models')
const Sequelize = require('sequelize')

const Op = Sequelize.Op

const byAmount = async (req, res) => {
  let amount = parseInt(req.query.param, 10)
  if (isNaN(amount)) amount = 1 // Just to be safe. Should be protected by express
  amount = Math.max(amount, 1)
  const timestamps = await getNewestTimestamps(amount)

  models.RankEntry.findAll({
    where: { timestamp: { [Op.or]: timestamps } },
    order: [['timestamp', 'DESC'], ['position', 'ASC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
}

const byDate = async (req, res, next) => {
  const dateParam = req.query.param
  const date = moment(dateParam, 'YYYY-MM-DD', true)
  if (!date.isValid()) {
    res.json({ error: 'Invalid date format. Must be YYYY-MM-DD' })
    return
  }

  const from = `${dateParam} 00:00:00`
  const to = `${dateParam} 23:59:59`

  models.RankEntry.findAll({
    where: { timestamp: { [Op.between]: [from, to] } },
    order: [['position', 'ASC']],
  }).then(entries => {
    res.setHeader('Content-Type', 'application/json')
    res.json(entries)
  })
}

export default async (req, res) => {
  const param = req.query.param
  if (isNaN(parseInt(param, 10))) {
    return await byDate(req, res)
  }
  return await byAmount(req, res)
}
