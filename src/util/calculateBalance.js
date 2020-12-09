const calculateBalance = (data, currency) => {
  const debits = data.filter(
    (transaction) =>
      transaction.currency === currency && transaction.direction === 'debit'
  )
  const credits = data.filter(
    (transaction) =>
      transaction.currency === currency && transaction.direction === 'credit'
  )
  const debitSum = debits.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  )
  const creditSum = credits.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  )

  return creditSum - debitSum
}

export default calculateBalance
