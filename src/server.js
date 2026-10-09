import http from 'node:http'

const server = http.createServer((req, res) => {
 return res.end('Servidor funcionando!')
})

server.listen(3333, () => console.log('🚀 Servidor rodando em http://localhost:3333'))
