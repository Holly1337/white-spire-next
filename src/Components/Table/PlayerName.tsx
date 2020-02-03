import React from 'react'
// import douyuIcon from '../../assets/images/douyu-icon.png'
import { KNOWN_TWITCH_STREAMERS } from '../../constants'
const douyuIcon = "data:image / png;base64, iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAC / 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"

interface Props {
  playerName: string
}

const TWITCH = 'tv/'
const DOYU = '斗鱼'
// const HUYA = '虎牙'

const DOUYO_REGEXP = /(\d[\d]+)/g

type StreamTypes = 'twitch' | 'douyu' | 'huya' | null

const getStreamtype = (playerName: string): StreamTypes => {
  if (playerName.includes(TWITCH)) {
    return 'twitch'
  }
  if (playerName.includes(DOYU) && playerName.match(DOUYO_REGEXP)) {
    return 'douyu'
  }
  // if (playerName.includes(HUYA)) {
  //   return 'huya'
  // }
  return null
}

interface StreamerProps {
  playerName: string
  link?: string
}

const TwitchName = ({ playerName, link }: StreamerProps) => {
  if (typeof link === 'undefined') {
    const startIndex = playerName.indexOf(TWITCH) + 3
    const channel = playerName.substr(startIndex)
    link = `https://twitch.tv/${channel}`
  }
  return (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      style={{ color: 'white' }}
    >
      {playerName}
      <span style={{ marginLeft: 10 }}>
        <i className='fab fa-twitch' />
      </span>
    </a>
  )
}

const DouyuName = ({ playerName }: Props) => {
  const matches = playerName.match(DOUYO_REGEXP)
  if (!matches || matches.length === 0) {
    return <BasicName playerName={playerName} />
  }
  let channelID = matches.pop()
  const link = `https://www.douyu.com/${channelID}`
  return (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      style={{ color: 'white' }}
    >
      {playerName}
      <img src={douyuIcon} alt={`douyu ${playerName}`} style={{ marginLeft: 8, height: 19}} />
    </a>
  )
}

const PlayerName = ({ playerName }: Props) => {
  const twitchLink = KNOWN_TWITCH_STREAMERS[playerName.toLowerCase()]
  if (typeof twitchLink !== 'undefined') {
    return <TwitchName playerName={playerName} link={twitchLink} />
  }

  const streamType = getStreamtype(playerName)
  switch (streamType) {
    case 'douyu':
      return <DouyuName playerName={playerName} />
    case 'twitch':
      return <TwitchName playerName={playerName} />
    case null:
    default:
      return <BasicName playerName={playerName} />
  }
}

const BasicName = ({ playerName }: Props) => {
  return <span>{playerName}</span>
}

export default PlayerName
