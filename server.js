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
        db.createReservation(reservation, (err, createdReservation) => {
            if (err) throw err;
            io.emit('reservation', {"event": "created", "reservation": createdReservation});
            db.getShowtime(createdReservation.showtime_id, (showtime) => {
                io.emit('showtime', {"event": "updated", "showtime": showtime});
            });
        });
    });

    // Delete a reservation
    socket.on('reservation:delete', (reservation) => {
        db.deleteReservation(reservation, (err, deletedReservation) => {
            if (err) throw err;
            io.emit('reservation', {"event": "deleted", "reservation": deletedReservation});
            db.getShowtime(deletedReservation.showtime_id, (showtime) => {
                io.emit('showtime', {"event": "updated", "showtime": showtime});
            });
        });
    });

    // Update a reservation
    socket.on('reservation:update', (reservation) => {
        db.updateReservation(reservation, (err, updatedReservation) => {
            if (err) throw err;
            io.emit('reservation', {"event": "updated", "reservation": updatedReservation});
            db.getShowtime(updatedReservation.showtime_id, (showtime) => {
                io.emit('showtime', {"event": "updated", "showtime": showtime});
            });
        });
    });

});

// Begin listening
server.listen(process.env.PORT || 8080);