// Import our modules
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
var api = require('./server/api');
var db = require('./server/db');

// Setup out express application
app.use(bodyParser.json());
app.use('/api', api);
app.use(express.static('./'));
  
// Sockets
io.on('connection', (socket) => {
  
  // Create a reservation
  socket.on('reservation:create', (reservation) => {
    db.createReservation(reservation, (err, reservation) => {
      if(err) throw err;
      io.emit('reservation:created', reservation);
    })
  });
  
  // Delete a reservation
  socket.on('reservation:delete', (reservation) => {
    db.deleteReservation(reservation, (err, reservation) => {
      if (err) throw err;
      io.emit('reservation:deleted', reservation);
    })
  });
  
  // Update a reservation
  socket.on('reservation:update', (reservation) => {
    db.updateReservation(reservation, (err, reservation) => {
      if (err) throw err;
      io.emit('reservation:updated', reservation);
    })
  });
  
});

// Begin listening
server.listen(process.env.PORT || 8080);
