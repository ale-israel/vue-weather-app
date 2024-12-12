export const format12HourTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const format12Hours = hours % 12 ? hours % 12 : 12

  return `${format12Hours}:${minutes} ${ampm}`
}
