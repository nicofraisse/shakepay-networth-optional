import calculateBalance from './calculateBalance'
import { BTC_CAD_RATE, ETH_CAD_rate } from '../constants/currencyRates'

const netWorthFixed = (transactions) => {
  const CAD_balance = calculateBalance(transactions, 'CAD')
  const BTC_balance = calculateBalance(transactions, 'BTC')
  const ETH_balance = calculateBalance(transactions, 'ETH')

  const net_worth =
    CAD_balance + BTC_balance * BTC_CAD_RATE + ETH_balance * ETH_CAD_rate

  return net_worth
}

const netWorthOverTime = (transactions) => {
  return transactions
    .map((transaction, index) => {
      return {
        date: transaction.createdAt,
        netWorth: netWorthFixed(
          transactions.slice(index, transactions.length - 1)
        ),
      }
    })
    .sort((a, b) => a.date - b.date)
    .reverse()
}

export { netWorthFixed, netWorthOverTime }
