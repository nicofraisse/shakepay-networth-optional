import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { netWorthOverTime } from '../util/netWorth'
import {
  TRANSACTION_HIST_URL,
  BTC_RATES_URL,
  ETH_RATES_URL,
} from '../constants/API_URLs'
import Chart from '../components/Chart'
import Spinner from '../components/UI/Spinner'
import Alert from '../components/UI/Alert'
import classes from '../styles/layouts/ChartContainer.module.css'

const ChartContainer = () => {
  const [netWorthHistory, setNetWorthHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({ presence: false, message: '' })

  useEffect(() => {
    axios
      .all([
        axios.get(TRANSACTION_HIST_URL),
        axios.get(BTC_RATES_URL),
        axios.get(ETH_RATES_URL),
      ])
      .then(
        axios.spread((...responses) => {
          const transactions = responses[0].data
          const rates = {
            CAD_BTC: responses[1].data,
            CAD_ETH: responses[2].data,
          }
          setNetWorthHistory(netWorthOverTime(transactions, rates))
          setLoading(false)
        })
      )
      .catch((errors) => {
        setLoading(false)

        setError({ presence: true, message: errors.message })
      })
  }, [])

  return (
    <div className={classes.ChartContainer}>
      {loading && <Spinner />}
      {error.presence ? <Alert type='danger' message={error.message} /> : null}
      <Chart data={netWorthHistory} />
    </div>
  )
}

export default ChartContainer
