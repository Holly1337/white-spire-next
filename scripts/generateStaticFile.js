const { getFullLeaderboard } = require('../api-lib/queries')
const fs = require('fs')

const generateStaticFile = async () => {
  const leaderboard = await getFullLeaderboard()
  try {
    fs.writeFileSync(`${__dirname}/../src/data/leaderboard.json`, JSON.stringify(leaderboard))
    console.log('Wrote static file')
  } catch (e) {
    console.error('error writing static file', e)
  }
}

generateStaticFile()
  .then(() => { console.log('success') })
