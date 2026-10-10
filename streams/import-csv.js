import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('./tasks.csv', import.meta.url)

const parser = fs.createReadStream(csvPath).pipe(
  parse({ delimiter: ',', skipEmptyLines: true, fromLine: 2 }) // pula o cabeçalho
)

async function run() {
  for await (const [title, description] of parser) {
    const response = await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    })
    console.log(`${response.status} → ${title}`)
  }
  console.log('✅ Importação concluída')
}

run()
