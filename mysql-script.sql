CREATE TABLE `reservation` (
  `reservation_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `showtime_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`),
  FOREIGN KEY (`showtime_id`) REFERENCES showtime(`showtime_id`)
);

CREATE TABLE `showtime` (
  `showtime_id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `max_capacity` int(11) DEFAULT NULL,
  PRIMARY KEY (`showtime_id`),
  FOREIGN KEY (`movie_id`) REFERENCES movie(`movie_id`)
);

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `poster_url` varchar(200) DEFAULT NULL,
  `rating` decimal(4,2) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `runtime` int(11) DEFAULT NULL,
  `backdrop_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`movie_id`)
);

CREATE TABLE `crew_member` (
  `credit_id` int(11) DEFAULT NULL,
  `job` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`credit_id`),
  FOREIGN KEY (`credit_id`) REFERENCES credit(`credit_id`)
);

CREATE TABLE `credit` (
  `credit_id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) DEFAULT NULL,
  `is_crew_member` tinyint(1) DEFAULT NULL,
  `is_cast_member` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`credit_id`),
  FOREIGN KEY (`movie_id`) REFERENCES movie(`movie_id`)
);

CREATE TABLE `cast_member` (
  `credit_id` int(11) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`credit_id`),
  FOREIGN KEY (`credit_id`) REFERENCES credit(`credit_id`)
);
