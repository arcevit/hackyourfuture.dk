const express = require('express')
const next = require('next')
var enforce = require('express-sslify');

const port = parseInt(process.env.PORT, 10) || 3000

const dev = true

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  if (process.env.NODE_ENV === 'production') {
    server.use(enforce.HTTPS({ trustProtoHeader: true }));
  }

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
