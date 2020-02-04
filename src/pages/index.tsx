import React, { useEffect, useState, ChangeEvent } from 'react'
import fetch from 'isomorphic-unfetch'
// import '@fortawesome/fontawesome-free/scss/fontawesome.scss'
import Head from 'next/head'
import SiteWrapper from '../Components/Layout/SiteWrapper'
import Header from '../Components/Layout/Header'
import DataLoadingIndicator from '../Components/Notifications/DataLoadingIndicator'
import PlayerSearch from '../Components/PlayerSearch'
import LastUpdated from '../Components/LastUpdated'
import Table from '../Components/Table/Table'
import DataInfoFooter from '../Components/Layout/DataInfoFooter'
import leaderboard from '../data/leaderboard.json'

import '../assets/scss/index.scss'

const IndexPage = () => {
  const [searchText, setSearchText] = useState<string>('')
  // const [leaderboard, setLeaderboard] = useState<FullLeaderboardEntry[]>(props.leaderboard)

  if (leaderboard === null) {
    return (
      <SiteWrapper>
        <Header />
        <DataLoadingIndicator />
      </SiteWrapper>
    )
  }

  if (typeof leaderboard === 'undefined') {
    return (
      <SiteWrapper>
        <Header />
        <h1>Error loading data</h1>
      </SiteWrapper>
    )
  }

  const lowerCaseSearch = searchText.toLowerCase()
  const filteredLeaderboard: FullLeaderboardEntry[] = Object.values(leaderboard).filter(
    entry => entry.playername.toLowerCase().includes(lowerCaseSearch)
  ).sort(
    (p1, p2) => p1.position - p2.position
  )

  let lastUpdated
  if (leaderboard.length === 0) {
    lastUpdated = new Date()
  } else {
    lastUpdated = new Date(leaderboard[0].timestamp)
  }

  const onPlayerSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  return (
    <SiteWrapper>
      <Head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css' />
      </Head>
      <Header />
      <div className='table-wrapper'>
        <PlayerSearch value={searchText} onChange={onPlayerSearchChange} />
        <LastUpdated date={lastUpdated} />
        <Table entries={filteredLeaderboard} />
      </div>
      <DataInfoFooter />
    </SiteWrapper>
  )
}

// IndexPage.getInitialProps = async () => {
//   try {
//     const port = process.env.PORT ?? 3000
//     const res = await fetch(`http://localhost:${port}/api/v1/fullLeaderboard`)
//     const leaderboard: FullLeaderboardEntry[] = await res.json()
//     return { leaderboard }
//   } catch (e) {
//     console.error(e)
//     return { leaderboard: undefined }
//   }
// }

export default IndexPage
