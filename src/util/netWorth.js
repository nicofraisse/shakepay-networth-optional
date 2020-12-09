import calculateBalance from './calculateBalance'
import { BTC_CAD_RATE, ETH_CAD_RATE } from '../constants/currencyRates'
import axios from 'axios'

const netWorthFixed = (transactions, todayRates) => {
  const CAD_balance = calculateBalance(transactions, 'CAD')
  const BTC_balance = calculateBalance(transactions, 'BTC')
  const ETH_balance = calculateBalance(transactions, 'ETH')
  const dateToday = transactions[0]
  const ETH_CAD_REATE_TODAY = todayRates.CAD_ETH.find(
    (rate) => rate.createdAt === dateToday
  )
  console.log(ETH_CAD_REATE_TODAY)

  const net_worth =
    CAD_balance + BTC_balance * BTC_CAD_RATE + ETH_balance * ETH_CAD_RATE

  return net_worth
}

const getData = async () => {
  const data = await axios.get(
    'https://shakepay.github.io/programming-exercise/web/rates_CAD_ETH.json'
  )
  return data
}

const netWorthOverTime = async (transactions) => {
  const res = await getData()
  await console.log(res)
  let CAD_ETH = 0

  await console.log(
    transactions
      .map((transaction, index) => {
        return {
          date: transaction.createdAt,
          netWorth: netWorthFixed(
            transactions.slice(index, transactions.length - 1),
            {
              CAD_ETH: res.data,
            }
          ),
        }
      })
      .sort((a, b) => a.date - b.date)
      .reverse()
  )
}

export { netWorthFixed, netWorthOverTime }
