# Ticket Time

[Ticket Time](https://ticket-time.herokuapp.com)

[Github](https://github.com/jpherkness/Ticket-Time)

1. Create an account with an email and a password. If you don't want to make an account, use the email: `admin@gmail.com` and password: `password`.
2. Start making movie reservations! It's that simple.

> Note: The site may take a few moments to load. :sweat_smile:

# Running

1. Download Project
3. Run `npm install`
4. Run `gulp`
2. Run `npm start`
3. Go to `localhost:8080`

> Note: If this doesn't work, the database host might me down. :cry:

# Created Using :heart_eyes:

| Technology | Used for          |
| ---        | ---               |
| MySQL      | Database          |
| Node.js    | Server            |
| Angular 2  | Front-end         |
| Socket.io  | Real time updates |
| Express    | REST Service      |
| Heroku     | Server Hosting    |

# Project Requirement :clipboard:

This Ticket Reservation site only serves its own movie theater with showroom capacity of 50. However, it reserves 20 tickets for onsite purchase. Thus, at most 30 tickets for a specific show can be reserved online.

A visitor of the site can find what movies will be on in the coming week, their information (e.g. cast, description, rate and etc.), show times (one movie can be shown multiple times a day). Multiple movies can be played simultaneously, since the theater has several showrooms. The visitor needs to signup an account with name and email address to reserve tickets. After sign-in, he can reserve desired number of tickets for a show, as long as they are available. He can see all his reservations and edit them (e.g., delete, change quantity). There is no payment associated with any reservations from this site. 

**Completed**

- Movie Information (e.g. title, description, image, rating, runtime, cast, crew)
- Movie Showtimes
- User Authentication (e.g. login, create account, log out)
- User can reserve desired amount of tickets only if available.
- User can see their reservations and edit them (e.g. delete, change quantity).

**Additional**

- Implemented movie poster url, backdrop url
- Movie Information (Runtime)

# Group Member Contributions

 - **Joseph Herkness (Project Manager)** :crown: - 40%
  - Back-End Services (REST API, socket.io)
  - Database Design
  - Database Implementation
  - Front-End components
  - Project Environment Setup
  - Heroku Setup
  
 - **Joshua Herkness** :sunglasses: - 40%
  - Front-End components
  - Authentication Service
  - Front-End Api Service
  - Website Design
  - Database Design
  
 - **Kenneth Robinson** :grin: - 20%
  - Database Design
  - Website Design
  - Report and Power point contribution
