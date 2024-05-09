# *FLEXTRACK*

*FLEXTRACK* is a comprehensive fitness tracking web application, created as a final project for the Database Management Systems course (CS542) taught by Professor Ben Ngan during the Spring semester of 2024 at WPI. This application helps users track their fitness progress, manage workout plans, participate in fitness challenges, and engage with other fitness enthusiasts through social features.

## Website

The application is live and can be accessed at [flextrack.glitch.me](http://flextrack.glitch.me).

## Motivation

In the United States, 39% of the population are members of a commercial gym, predominantly younger generations [1]. Studies show that using a fitness tracker can significantly enhance fitness progress, leading users to walk an additional 40 minutes per day and lose an extra 2 pounds over 5 months. This underlines that there is a robust market for an integrated fitness tracking solution [2].

## Local Setup Instructions

### Launch the React Project Locally

- First, download this project and run `npm install`
- Then, navigate to the react app directory by typing `cd flextrack`
- Finally, run the project with `npm start`, and the project should load in your browser on localhost:3000!

### Launch the Backend Locally

- Open a new terminal, and from the main directory, type `cd backend`
- Update the libraries with `npm install`
- Reset the database schema with `npx mikro-orm-esm schema:drop --run`
- Remake the database schema with `npx mikro-orm-esm schema:create --run`
- Run the backend with `npm start`

## Features

- **Workout Tracking**: Users can create, manage, and track multiple workout plans with detailed sessions, each outlined by specific exercises, sets, and reps.

- **Challenges and Posts**: Engage in challenges with progress logs and competition setups among multiple participants. Users can create posts directly linked to their workout activities.

- **Profiles and Social Features**: Customize user profiles with fitness descriptions, add friends, share plans, and engage through posts and challenge invites.

- **User Dashboard**: Displays a summary of the user's fitness activities and upcoming workouts.

- **Navigation**: Easy access to all pages via a user-friendly navigation bar.

## Technology Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces, used for handling the view layer for web and mobile apps.
- **Axios**: A promise-based HTTP client for the browser and node.js, used for making requests to external resources.
- **Bootstrap**: An open-source CSS framework directed at responsive, mobile-first front-end web development.
- **CSS**: Styling language used to dictate the presentation of HTML elements.
- **Google Fonts**: A library of free licensed font families, an interactive web directory for browsing the library, and APIs for conveniently using the fonts via CSS and Android.
- **Font Awesome**: A font and icon toolkit based on CSS and Less, used for including scalable vector icons and social logos.

### Backend
- **TypeScript**: A strict syntactical superset of JavaScript that adds optional static typing to the language, used for writing clearer and error-free code.
- **Express**: A web application framework for Node.js, designed for building web applications and APIs.
- **Mikro-ORM**: A TypeScript ORM for Node.js based on Data Mapper, Unit of Work and Identity Map patterns. Used to interact with the database using object-oriented concepts.
- **SQLite**: A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.

## Future Development

Potential areas for expansion include:
- Full OAuth integration
- Enhanced user metrics
- AI-generated workout and challenge recommendations
- Implementation of daily and weekly challenges
- Expanded mobile support
- Verification methods for weights lifted, such as video capture or wearables

## References

[1] Godman, H. (2022, October 1). [Do activity trackers make us exercise more?](https://www.health.harvard.edu/exercise-and-fitness/do-activity-trackers-make-us-exercise-more) Harvard Health.
[2] Gough, C. (2024, January 22). [Frequency of using the gym by generation US 2023](https://www.statista.com/statistics/1445818/generational-share-workout-gym/) Statista.
