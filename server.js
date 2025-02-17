import express from 'express'

const server = express()

server.use(express.static('public'))
server.use(express.static('public/models'))

server.listen(3333,() => {
    console.log('listen port 3333')
})

