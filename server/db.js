var mysql = require('mysql');

var connection = mysql.createConnection({
	'host'     : 'us-cdbr-iron-east-04.cleardb.net/heroku_dd803884342ea93?reconnect=true',
	'user'     : 'b7d1ee028b5ad9',
	'password' : '2be9ecbb',
	'database' : 'ticket_time'
});

connection.connect((err) => {
	if (err) throw err
	console.log('Successfully connected with id: ' + connection.threadId);
});

var createReservation = (reservation, done) => {
  // Read the properties of the reservation
  var user_id = reservation.user_id;
  var showtime_id = reservation.showtime_id;
  var quantity = reservation.quantity;
  
  // Check to make sure these properties are okay
  if (!user_id || !showtime_id || !quantity) return;
  
  // Perform operation
  connection.query(`
		INSERT INTO reservation (user_id, showtime_id, quantity)
		VALUE (${user_id}, ${showtime_id}, ${quantity});`,
		(err, rows, fields) => {
		  if (err){
		    done(err, null);
		  }
			connection.query(`
    		SELECT * FROM reservation
    		WHERE reservation_id=LAST_INSERT_ID();`,
    		(err, rows, fields) => {
    			if (err) {
    			  done(err, null);
    			}
    			if (rows.length < 1) return;
    			done(null, rows[0]);
    		});
		}); 
};

var deleteReservation = (reservation, done) => {
  
  // Read the properties of the reservation
  var reservation_id = reservation.reservation_id;
  
  // Check to make sure these properties are okay
  if (!reservation_id) return;
  
  // Perform operation
  connection.query(`
		DELETE FROM reservation 
		WHERE reservation_id=${reservation.reservation_id}`,
		(err, rows, fields) => {
			done(err, reservation);
		});
};

var updateReservation = (reservation, done) => {
  
  // Read the properties of the reservation
  var user_id = reservation.user_id;
  var showtime_id = reservation.showtime_id;
  var quantity = reservation.quantity;
  
  // Check to make sure these properties are okay
  if (!user_id || !showtime_id || !quantity) return;
  
  // Perform operation
  connection.query(`
    INSERT INTO reservation (user_id, showtime_id, quantity)
  	VALUE (${user_id}, ${showtime_id}, ${quantity})`, 
    (err, rows, fields) => {
      done(err, reservation)
    });
};

module.exports = connection;
module.exports.createReservation = createReservation;
module.exports.deleteReservation = deleteReservation;