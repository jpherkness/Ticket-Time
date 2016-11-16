var mysql = require('mysql');

var pool = mysql.createPool({
    'connectionLimit': 10,
    'host': 'us-cdbr-iron-east-04.cleardb.net',
    'user': 'b7d1ee028b5ad9',
    'password': '2be9ecbb',
    'database': 'heroku_dd803884342ea93',
    'waitForConnections': true,
    'timezone': 'utc'
});

var createReservation = (reservation, done) => {
    // Read the properties of the reservation
    var user_id = reservation.user_id;
    var showtime_id = reservation.showtime_id;
    var quantity = reservation.quantity;

    // Check to make sure these properties are okay
    if (!user_id || !showtime_id || !quantity) return;

    // Perform operation
    pool.query(`
  		INSERT INTO reservation (user_id, showtime_id, quantity)
  		VALUE (${user_id}, ${showtime_id}, ${quantity});`,
        (err, results) => {
            if (err) done(err, null);
            if (results.insertId) {
                pool.query(`
                  SELECT * FROM reservation
                  WHERE reservation_id=${results.insertId}`,
                    (err, rows, fields) => {
                        if (err) done(err, null);
                        if (rows.length > 0) done(null, rows[0]);
                    });
            }
        });
};

var deleteReservation = (reservation, done) => {

    // Read the properties of the reservation
    var reservation_id = reservation.reservation_id;

    // Check to make sure these properties are okay
    if (!reservation_id) return;

    // Perform operation
    pool.query(`
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
    pool.query(`
    UPDATE reservation SET quantity=${reservation.quantity}
    WHERE reservation_id=${reservation.reservation_id}`,
        (err, rows, fields) => {
            done(err, reservation)
        });
};

module.exports = pool
module.exports.createReservation = createReservation;
module.exports.deleteReservation = deleteReservation;
module.exports.updateReservation = updateReservation;