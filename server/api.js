var express = require('express');
var mysql = require('mysql');
var importer = require('./importer');
var db = require('./db');

// ============================================================================
// Initialize our router
// ============================================================================

var router = express.Router();

// ============================================================================
// Return all users
// ============================================================================

router.get('/user', (req, res, next) => {
    db.query(`
			SELECT * FROM  user`,
        (err, rows, fields) => {

            if (err) throw err
            res.send(rows);
        });
});

// ============================================================================
// Creates a user
// ============================================================================

router.post('/user', (req, res, next) => {

    var user = req.body;

    db.query(`
		SELECT * FROM user
		WHERE email='${user.email}';`,
        (err, rows, fields) => {
            if (err) throw err;
            if (rows.length == 1) {
                // User already exists
                res.send({
                    "success": false,
                    "message": "That email is already taken."
                })
            } else {
                // User doesn't exist
                db.query(`
					INSERT INTO user(first_name, last_name, email, password)
				    VALUES('${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}');`,
                    (err, rows, fields) => {
                        if (err) throw err;
                        if (rows.insertId) {
                            user.user_id = rows.insertId;
                            res.send({
                                "success": true,
                                "user": user
                            });
                        } else {
                            res.send({
                                "success": false,
                                "user": null,
                                "message": "User could not be created."
                            });
                        }
                    });
            }
        });
});

// ============================================================================
// Deletes a user
// ============================================================================

router.delete('/user', (req, res, next) => {

    var user_id = req.body.user_id;

    db.query(`
			DELETE FROM user
			WHERE user_id=${user_id}`,
        (err, result) => {
            if (err) throw err;
            res.send({
                "message": `deleted ${result.affectedRows} rows`
            });
        });
});

// ============================================================================
// Return a specific user object based on the id
// ============================================================================

router.get('/user/:id', (req, res, next) => {
    db.query(`
			SELECT * FROM user
			WHERE user_id=${req.params.id};`,
        (err, rows, fields) => {

            if (err) throw err
            if (rows.length < 1) res.send(null);
            res.send(rows[0]);
        });
});


// ============================================================================
// Return a specific user object based on the email and password
// ============================================================================

router.get('/auth', (req, res, next) => {

    // Read Params
    var email = req.query.email;
    var password = req.query.password;

    // Perform Query
    db.query(`
			SELECT * FROM user
			WHERE email='${email}'
			AND password='${password}'`,
        (err, rows, fields) => {

            if (err) throw err
            if (rows.length < 1) res.send(null);
            res.send(rows[0]);
        });
});

// ============================================================================
// Return all movies
// ============================================================================

router.get('/movie', (req, res, next) => {
    db.query(`
			SELECT * FROM  movie`,
        (err, rows, fields) => {

            if (err) throw err
            res.send(rows);
        });
});

// ============================================================================
// Return a specific movie object based on the id
// ============================================================================

router.get('/movie/:id', (req, res, next) => {
    db.query(`
			SELECT * FROM movie
			WHERE movie_id=${req.params.id}`,
        (err, rows, fields) => {

            if (err) throw err;
            if (rows.length < 1) res.send(null);
            res.send(rows[0]);
        });
});

// ============================================================================
// Return a list of showtimes for a movie between two times
// Params: movie_id, start_time, end_time
// ============================================================================

router.get('/showtimes', (req, res, next) => {

    // Read params
    var movie_id = req.query.movie_id;
    var start_time = req.query.start_time;
    var end_time = req.query.end_time;

    // Potential validation ???

    // Perform query
    db.query(`
			SELECT *, (SELECT SUM(quantity)
			FROM reservation AS R
			WHERE R.showtime_id=S.showtime_id) as current_capacity
			FROM showtime AS S
			WHERE movie_id=${movie_id}
			AND time BETWEEN '${start_time}' AND '${end_time}'
			ORDER BY time`,
        (err, rows, fields) => {

            if (err) throw err;
            // Return showtimes
            res.send(rows);
        });
});

router.get('/showtime', (req, res, next) => {

    // Read params
    var showtime_id = req.query.showtime_id;

    // Potential validation ???

    // Perform query
    db.getShowtime(showtime_id, (showtime) => {
        res.send(showtime);
    });
});

// ============================================================================
// Return a list of reservations for a showtime based on a user_id or showtime_id
// Params: user_id (optional), showtime_id (optional)
// ============================================================================

router.get('/reservations', (req, res, next) => {

    // Read params
    var user_id = req.query.user_id;

    // Potential validation ???

    // Perform query
    db.query(`
			SELECT * FROM reservation
			WHERE user_id=${user_id}`,
        (err, rows, fields) => {

            if (err) throw err
            res.send(rows);
        });
});

// ============================================================================
// Creates a new reservation for a user and a showtime, with a quantity
// ============================================================================

router.post('/reservation', (req, res, next) => {

    // Read the body
    var showtime_id = req.body.showtime_id;
    var user_id = req.body.user_id;
    var quantity = req.body.quantity;

    // Potential validation?

    // Perform query
    db.getShowtime(showtime_id, (showtime) => {
        console.log(showtime);
        if (showtime.max_capacity - showtime.current_capacity >= quantity) {
            // Okay they didn't request too many tickets
            db.query(`
                INSERT INTO reservation (user_id, showtime_id, quantity)
                VALUE (${user_id}, ${showtime_id}, ${quantity})`,
                (err, rows, fields) => {
                    if (err) throw err;
                    res.send({
                        success: true,
                        message: 'Successfully created'
                    });
                });
        } else {
            res.send({
                success: false,
                message: 'Exceeds capacity'
            });
        }
    });
});

// ============================================================================
// Deletes a reservation from a reservation_id
// ============================================================================

router.delete('/reservation', (req, res, next) => {

    // Read the body
    var reservation_id = req.body.reservation_id;

    db.query(`
			DELETE FROM reservation
			WHERE reservation_id=${reservation_id}`,
        (err, rows, fields) => {

            if (err) throw err;
            res.send({
                success: true,
                message: 'Successfully deleted'
            });
        });
});

// ============================================================================
// Creates a new reservation for a user and a showtime, with a quantity
// ============================================================================

router.patch('/reservation', (req, res, next) => {

    // Read the body
    var reservation_id = req.body.showtime_id;
    var quantity = req.body.quantity;

    // TODO: Implement this!!!
});

// ============================================================================
// Helper Functions
// ============================================================================

var currentCapacity = (showtime_id, done) => {
    db.query(`
			SELECT SUM(quantity)
			FROM reservation
			WHERE showtime_id=${showtime_id}`,
        (err, rows, fields) => {

            if (err) throw err;
            var capacity = rows[0]['SUM(quantity)'];
            done(capacity);
        });
}

var maximumCapacity = (showtime_id, done) => {
    db.query(`
			SELECT * FROM showtime
			WHERE showtime_id=${showtime_id}`,
        (err, rows, fields) => {

            if (err) throw err;
            if (rows.length == 0) done(0);
            var max_capacity = rows[0]['max_capacity'];
            done(max_capacity);
        });
}

var getShowtimeID = (reservation_id, done) => {
    db.query(`
			SELECT * FROM reservation
			WHERE reservation_id=${reservation_id}`,
        (err, rows, fields) => {

            if (err) throw err;
            if (rows.length == 0) done(null);
            var showtime_id = rows[0]['showtime_id'];
            done(showtime_id);
        });
}

// ============================================================================
// Causes the database to import new movie data from The Movie Database (TMDB)
// ============================================================================

router.post('/import', (req, res, next) => {
    importer.importMovies();
    res.send('Importing Movies...');
})

router.post('/update', (req, res, next) => {
    importer.updateShowtimes();
    res.send('Updating showtimes...');
})


module.exports = router;