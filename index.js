const express = require('express'),
io = require('socket.io')(
    express().use(express.static('www')).listen(5500)
).on('connection', socket =>
    socket
    .on('chat', data =>
        io.to(`/${data.username}`).emit('chat', {
            username: socket.name,
            message: data.message
        })
    ).on('disconnect', fn =>{
        io.emit('people', people())
    }).on('join', name => {
        socket.name = name
        socket.join(`/${name}`)
        io.emit('people', people())
    })
)

function people(me){
    return Object.keys(io.adapter.rooms)
    .filter(name => name.startsWith('/'))
    .map(name => name.slice(1))
}

//node index.js