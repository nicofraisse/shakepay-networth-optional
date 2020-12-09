import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { netWorthOverTime } from '../util/netWorth'
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
      .get(
        'https://shakepay.github.io/programming-exercise/web/transaction_history.json'
      )
      .then((res) => {
        setNetWorthHistory(netWorthOverTime(res.data)).then((res) =>
          console.log(res)
        )
        setLoading(false)
        setError({ presence: false, message: '' })
        console.log(netWorthHistory)
      })
      .catch((err) => {
        setLoading(false)
        if (err.message) {
          setError({ presence: true, message: err.message })
        }
      })
  }, [])

  return (
    <div className={classes.ChartContainer}>
      {loading && <Spinner />}
      {error.presence ? <Alert type='danger' message={error.message} /> : null}
    </div>
  )
}

export default ChartContainer
