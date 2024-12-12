export const kelvinToCelsius = (temp: number, decimals?: number = 0) => {
  return (temp - 273.15).toFixed(decimals)
}
