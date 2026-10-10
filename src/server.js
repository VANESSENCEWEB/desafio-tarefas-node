import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => route.method === method && route.path.test(url))

  if (route) {
    const { query, ...params } = url.match(route.path).groups
    req.params = params
    req.query = query ? extractQueryParams(query) : {}
    return route.handler(req, res)
  }

  return res.writeHead(404).end(JSON.stringify({ message: 'Rota não encontrada' }))
})

server.listen(3333, () => console.log('🚀 Servidor rodando em http://localhost:3333'))
