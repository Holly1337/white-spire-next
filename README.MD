# WHITE SPIRE

### Recommended Requirements
Tested on Node.js (v12.14.1) and npm (v6.13.4)

### Installation
- setup a MySQL database that is compatible with [sequelize](https://sequelize.org/)
- create a `.env` file. You can copy the .env_example and go from there
  - add the database credentials
  - add a `PORT` for your web server. 80 should be fine
- run `npm install`
- run `node_modules/.bin/sequelize db:migrate` or `npx sequelize-cli db:migrate` to create your database tables
- create a cronjob to execute `loadAndRebuild.sh` every hour
- build the app by running `npm run build` (you should run `node scripts/loadLeaderboardData.js` at least once before you build)
- run `npm start`

The leaderboard can now be reached at your configured port

### Tech Stack

The data gets fetched by a simple JavaScript script that is executed every hour.
It scrapes https://underlords.com/leaderboard and writes the result into the database.

The frontend is a NextJS app that also serves the API endpoints. It uses sequelize for easy db access.
The leaderboard is be statically generated. A script creates a `json` file with the current leaderboard data, which is
then loaded in the index.tsx file. NextJS automatically generates a static page.

## API
API is reachable under '/api/v1/:endpoint'

### Endpoints

#### Full Leaderboard
`/fullLeaderboard` - returns the leaderboard for the latest timestamp. Ordered by position.
Includes total time a player is lord (currently disabled -> is always 0) and the rank change (null is new).

```json
[
  {
    "id": 33,
    "timestamp": "2019-11-01T16:03:57.000Z",
    "playername": "Player1",
    "position": 1,
    "score": 15261,
    "createdAt": "2019-11-01T16:03:57.000Z",
    "updatedAt": "2019-11-01T16:03:57.000Z",
    "timeInLord": 2,
    "positionChange": 5
  },
  {
    "id": 34,
    "timestamp": "2019-11-01T16:03:57.000Z",
    "playername": "Player2",
    "position": 2,
    "score": 15224,
    "createdAt": "2019-11-01T16:03:57.000Z",
    "updatedAt": "2019-11-01T16:03:57.000Z",
    "timeInLord": 4,
    "positionChange": -1
  },
  {
    "id": 35,
    "timestamp": "2019-11-01T16:03:57.000Z",
    "playername": "Player3",
    "position": 3,
    "score": 15143,
    "createdAt": "2019-11-01T16:03:57.000Z",
    "updatedAt": "2019-11-01T16:03:57.000Z",
    "timeInLord": 1,
    "positionChange": null
  }
]
```

#### Leaderboard
- `/leaderboard` - returns all entries for the latest timestamp. Ordered by position.

- `/leaderboard/:timestamp` - returns all entries for the given exact timestamp. Ordered by position

  - **:timestamp** - YYYY-MM-DD HH:mm:ss

- `/leaderboard/:date/:hour` - returns all entries for the given date and hour. Ordered by timestamp DESC; position ASC
  - **:date** - YYYY-MM-DD
  - **:hour** - number between 0 and 23

Be careful to respect daylight savings time when making requests with dates and timestamps.

```json
// example response for '/leaderboard'
[
  {
    "id": 135,
    "timestamp": "2019-10-30T14:15:03.000Z",
    "playername": "Player1",
    "position": 1,
    "score": 15142,
    "createdAt": "2019-10-30T14:15:03.000Z",
    "updatedAt": "2019-10-30T14:15:03.000Z"
  },
  {
    "id": 136,
    "timestamp": "2019-10-30T14:15:03.000Z",
    "playername": "Player2",
    "position": 2,
    "score": 15085,
    "createdAt": "2019-10-30T14:15:03.000Z",
    "updatedAt": "2019-10-30T14:15:03.000Z"
  }
]
```

#### Leaderboards
- `/leaderboards/:amount` - returns all entries for the latest n timestamps. Ordered by timestamp DESC; position ASC

  - **:amount** - number

- `/leaderboards/:date` - returns all entries for the given date. Ordered by position

  - **:date** - YYYY-MM-DD


```json
// example response for '/leaderbaords/2'
[
  {
    "id": 33,
    "timestamp": "2019-11-01T16:03:57.000Z",
    "playername": "Player1",
    "position": 1,
    "score": 15261,
    "createdAt": "2019-11-01T16:03:57.000Z",
    "updatedAt": "2019-11-01T16:03:57.000Z"
  },
  
  {
    "id": 23,
    "timestamp": "2019-10-30T14:06:59.000Z",
    "playername": "Player2",
    "position": 1,
    "score": 15114,
    "createdAt": "2019-10-30T14:06:59.000Z",
    "updatedAt": "2019-10-30T14:06:59.000Z"
  }
]
```

#### Time In Lord

`/timeInLord` - returns a list of all players and how long (in hours) they have been a lord. Ordered by time.

#### Player
`/player/:name` - Returns all entries for a single player up to 1 year back. Also returns the total count. Ordered by timestamp descending.

```json
// example response for '/player/Player1'
{
  "count": 2,
  "rows": [
    {
      "id": 139,
      "timestamp": "2019-10-30T14:15:03.000Z",
      "playername": "Player1",
      "position": 5,
      "score": 15043,
      "createdAt": "2019-10-30T14:15:03.000Z",
      "updatedAt": "2019-10-30T14:15:03.000Z"
    },
    {
      "id": 131,
      "timestamp": "2019-10-30T13:15:04.000Z",
      "playername": "Player1",
      "position": 7,
      "score": 15043,
      "createdAt": "2019-10-30T13:15:04.000Z",
      "updatedAt": "2019-10-30T13:15:04.000Z"
    }
  ]
}
```



#### Position
`/position/:position` - Returns all entries for a specified leaderboard position up to 1 year back. Ordered by timestamp descending.

```json
// example response for '/psition/1'
[
  {
    "id": 135,
    "timestamp": "2019-10-30T14:15:03.000Z",
    "playername": "Player1",
    "position": 1,
    "score": 15142,
    "createdAt": "2019-10-30T14:15:03.000Z",
    "updatedAt": "2019-10-30T14:15:03.000Z"
  },
  {
    "id": 125,
    "timestamp": "2019-10-30T13:15:04.000Z",
    "playername": "Player2",
    "position": 1,
    "score": 15114,
    "createdAt": "2019-10-30T13:15:04.000Z",
    "updatedAt": "2019-10-30T13:15:04.000Z"
  }
]
```

## TODO
- automatically generate docs for api
