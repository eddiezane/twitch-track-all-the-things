'use strict'

const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const locationMap = new Map()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Hello!')
})

io.on('connection', socket => {
  socket.on('updateLocation', pos => {
    locationMap.set(socket.id, pos)
  })

  socket.on('requestLocations', () => {
    socket.emit('locationsUpdate', Array.from(locationMap))
  })

  socket.on('disconnect', () => {
    locationMap.delete(socket.id)
  })
})

server.listen(3000, err => {
  if (err) {
    throw err
  }

  console.log('server started on port 3000')
})
