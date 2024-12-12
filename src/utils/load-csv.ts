import Papa from 'papaparse'

interface Row {
  [key: string]: string | number
}

export const loadCsv = async (fileUrl: string, headerRow: boolean = true) => {
  const rawCsvData = await fetch(fileUrl)
  const rawCsvText = await rawCsvData.text()
  return new Promise((resolve, reject) => {
    Papa.parse<Row>(rawCsvText, {
      header: headerRow,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data)
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: (error: any) => {
        reject(`Error parsing CSV file: ${error.message}`)
      },
    })
  })
}
