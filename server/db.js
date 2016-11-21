var mysql = require('mysql');

var pool = mysql.createPool({
    'connectionLimit': 5,
    'host': 'us-cdbr-iron-east-04.cleardb.net',
    'user': 'b7d1ee028b5ad9',
    'password': '2be9ecbb',
    'database': 'heroku_dd803884342ea93',
    'waitForConnections': true,
    'timezone': 'utc',
    'multipleStatements': 'true'
});

var createReservation = (reservation, done) => {
    // Read the properties of the reservation
    var user_id = reservation.user_id;
    var showtime_id = reservation.showtime_id;
    var quantity = reservation.quantity;

    // Check to make sure these properties are okay
    if (!user_id || !showtime_id || !quantity) return;

    pool.getShowtime(showtime_id, (showtime) => {
        if (showtime.max_capacity - showtime.current_capacity >= quantity) {
            // Okay they didn't request too many tickets
            pool.query(`
                INSERT INTO reservation (user_id, showtime_id, quantity)
                VALUE (${user_id}, ${showtime_id}, ${quantity})`,
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
        } else {
            done(null, null);
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

var getShowtime = (showtime_id, done) => {
    if (showtime_id == null) return;
    pool.query(`
        SELECT *, (SELECT COALESCE(SUM(quantity), 0)
        FROM reservation AS R
        WHERE R.showtime_id=S.showtime_id) as current_capacity
        FROM showtime AS S
        WHERE showtime_id=${showtime_id}`,
        (err, rows, fields) => {
            if (err) throw err;
            if (rows < 1) return;
            done(rows[0]);
        });
};

module.exports = pool
module.exports.createReservation = createReservation;
module.exports.deleteReservation = deleteReservation;
module.exports.updateReservation = updateReservation;
module.exports.getShowtime = getShowtime;