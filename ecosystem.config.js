require('dotenv').config()

module.exports = {
  apps : [{
    name: 'whitespire',
    script: `PORT=${process.env.PORT} npm run start:next`,
    instances: 1,
    autorestart: true,
  }]
}
