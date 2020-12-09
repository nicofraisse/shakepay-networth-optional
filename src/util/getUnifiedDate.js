const getUnifiedDate = (date) => {
  const dateObj = new Date(Date.parse(date))
  return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`
}

export default getUnifiedDate
