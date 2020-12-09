import calculateBalance from './calculateBalance'
import getUnifiedDate from './getUnifiedDate'

// Calculates net worth at a given day
const netWorthFixed = (transactions) => {
  const CAD_balance = calculateBalance(transactions, 'CAD')
  const BTC_balance = calculateBalance(transactions, 'BTC')
  const ETH_balance = calculateBalance(transactions, 'ETH')

  // Get today's rates
  const BTC_CAD_RATE_TODAY = transactions[0].BTC_RATE.midMarketRate
  const ETH_CAD_RATE_TODAY = transactions[0].ETH_RATE.midMarketRate

  return (
    CAD_balance +
    BTC_balance * BTC_CAD_RATE_TODAY +
    ETH_balance * ETH_CAD_RATE_TODAY
  )
}

// Return an object containing date of transaction and net worth at each day
const netWorthOverTime = (transactions, rates) => {
  // Initialize the most recent spot rates
  let last_found_CAD_ETH_rate = rates.CAD_ETH[0]
  let last_found_CAD_BTC_rate = rates.CAD_BTC[0]

  transactions.forEach((transaction) => {
    // Get the BTC spot rates and add them to the transactions object
    transaction.ETH_RATE = rates.CAD_ETH.find(
      (rate) =>
        getUnifiedDate(rate.createdAt) === getUnifiedDate(transaction.createdAt)
    )
    transaction.BTC_RATE = rates.CAD_BTC.find(
      (rate) =>
        getUnifiedDate(rate.createdAt) === getUnifiedDate(transaction.createdAt)
    )
    // If there is no spot rate, use the most recent one
    if (transaction.BTC_RATE) {
      last_found_CAD_BTC_rate = transaction.BTC_RATE
    } else {
      transaction.BTC_RATE = last_found_CAD_BTC_rate
    }
    if (transaction.ETH_RATE) {
      last_found_CAD_ETH_rate = transaction.ETH_RATE
    } else {
      transaction.ETH_RATE = last_found_CAD_ETH_rate
    }
  })

  return transactions
    .map((transaction, index) => {
      return {
        date: transaction.createdAt,
        netWorth: netWorthFixed(transactions.slice(index, transactions.length)),
      }
    })
    .sort((a, b) => a.date - b.date)
    .reverse()
}

export { netWorthFixed, netWorthOverTime }
