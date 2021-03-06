var unirest = require("unirest");
var mysql = require('mysql');
var db = require('./db');

// ============================================================================
// Declare the api key 
// ============================================================================

const key = "cc57d6cc4c472b1758409d956d5f2702";

// ============================================================================
// Look for most recent movie id's
// ============================================================================

var importMovies = () => {

  unirest("GET", "https://api.themoviedb.org/3/movie/now_playing")
  .query({"language": "en-US", "api_key": key})
  .headers({"content-type": "application/json"})
  .type("json")
  .send({})
  .end( function (res) {

    if (res.error) throw new Error(res.error);
    
    for (var result of res.body.results) {
      importMovieDetails(result.id, (movie) => {
        insertMovieIntoDatabase(movie);
      });
    }
  });
};

var importMovieDetails = (movie_id, done) => {
  unirest("GET", `https://api.themoviedb.org/3/movie/${movie_id}`)
  .query({"language": "en-US", "api_key": key})
  .headers({"content-type": "application/json"})
  .type("json")
  .send({})
  .end( function (res) {
    if (res.error) throw new Error(res.error);
    var movie = { 
      'movie_id': res.body.id,
      'title':  res.body.title,
      'description':  res.body.overview,
      'release_date':  res.body.release_date,
      'rating':  res.body.vote_average,
      'poster_url': res.body.poster_path ? `https://image.tmdb.org/t/p/w500${res.body.poster_path}` : null,
      'runtime' :  res.body.runtime,
      'backdrop_url': res.body.backdrop_path ? `https://image.tmdb.org/t/p/original${res.body.backdrop_path}` : null
    };
    done(movie);
  });
};

// ============================================================================
// Adds a movie object to the database
// ============================================================================

var insertMovieIntoDatabase = (movie) => {
  db.query(
    `INSERT IGNORE INTO movie 
    SET ?`, movie, 
    (err, result) => {
      if (err) throw err
        console.log(`MOVIE: Imported movie with id ${movie.movie_id}`);
      importActors(movie.movie_id);
    });
}

// ============================================================================
// Import all actors from a given movie into the database
// ============================================================================

var importActors = (movie_id) => {
  var x = () => {
    unirest('GET', `https://api.themoviedb.org/3/movie/${movie_id}/credits`)
    .query({'language': 'en-US', 'api_key': key})
    .headers({'content-type': 'application/json'})
    .type('json')
    .send({})
    .end((res) => {
      if (res.error) x();
      if (!res.body.crew || !res.body.cast) return;
      for (var c of res.body.cast) {
        if (c.order > 5) continue;
        var cast_member = { 
          'name': c.name,
          'role': c.character,
          'movie_id': movie_id
        };
        db.query(`
          INSERT INTO credit(movie_id, name, is_cast_member, is_crew_member)
          VALUES(?, ?, ?, ?);
          INSERT INTO cast_member(credit_id, role)
          VALUES((SELECT LAST_INSERT_ID()), ?);`,
          [cast_member.movie_id, cast_member.name, true, false, cast_member.role],
          (err, results) => {
            if (err) throw err;
          });
      }
      for (var c of res.body.crew) {
        if (c.job != 'Director') continue;
        var crew_member = { 
          'name': c.name,
          'job': c.job,
          'movie_id': movie_id
        };
      db.query(`
          INSERT INTO credit(movie_id, name, is_cast_member, is_crew_member)
          VALUES(?, ?, ?, ?);
          INSERT INTO crew_member(credit_id, job)
          VALUES((SELECT LAST_INSERT_ID()), ?);`,
          [crew_member.movie_id, crew_member.name, false, true, crew_member.job],
          (err, results) => {
            if (err) throw err;
          });
    }
  });
  }
  x();
};


var updateShowtimes = () => {
  // Get the current date
  var now = new Date();
  db.query(`delete from showtime`, null);
  db.query(`
    SELECT movie_id FROM movie`, 
    (err, rows, fields) => {
      if (err) throw err
        for (var row of rows) {
          for (var day = 0; day < 7; day++) {
            for (var hour = 0; hour < 4; hour++) {

              var showtimeDate = new Date(
                now.getFullYear(), 
                now.getMonth(),
                now.getDate() + day, 
                23 + hour, 
                15 * hour, 
                0, 
                0);

              showtimeDate.setMinutes(showtimeDate.getMinutes() - showtimeDate.getTimezoneOffset());
              insertShowtimeIntoDatabase(row.movie_id, showtimeDate);
            }
          }
        }
      });
}

var insertShowtimeIntoDatabase = (movie_id, date) => {
  db.query(`
    INSERT INTO showtime (movie_id, time, max_capacity) 
    VALUES (${movie_id}, '${date.toISOString()}', 30)`, 
    (err, rows, fields) => {
      if (err) throw err
        console.log(`SHOWTIME: Created new showtime ` + date + date.toISOString());
    });
}

function escapeStringForMySQL(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char;                   
        }
    });
}

module.exports.importMovies = importMovies;
module.exports.updateShowtimes = updateShowtimes;
