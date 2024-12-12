import Papa from 'papaparse'
import path from 'path'
import fs from 'fs'

interface Row {
  [key: string]: string | number
}

export const loadCsv = (filePath: string, headerRow: boolean = true) => {
  const absolutePath = path.resolve(filePath)

  return new Promise((resolve, reject) => {
    fs.readFile(absolutePath, 'utf8', (err, csvData) => {
      if (err) {
        reject(`Error reading CSV file: ${err.message}`)
        return
      }

      Papa.parse<Row>(csvData, {
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
  })
}
