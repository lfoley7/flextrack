# *Flextrack*

*Flextrack* is a comprehensive fitness tracking web application, initially created as a final project for the Database Management Systems course (CS542) during the Spring semester of 2024. This application helps users track their fitness progress, manage workout plans, participate in fitness challenges, and engage with other fitness enthusiasts through social features.

## Website

The application is live and can be accessed at [flextrack.glitch.me](http://flextrack.glitch.me).

## Motivation

In the United States, 39% of the population are members of a commercial gym, predominantly younger generations[1]. Studies show that using a fitness tracker can significantly enhance fitness progress, leading users to walk an additional 40 minutes per day and lose an extra 2 pounds over 5 months. This underscores a robust market for an integrated fitness tracking solution[2].

## Setup Instructions

### Set up the React Project

1. **Download the project and install dependencies:**
   ```bash
   npm install
   ```

2. **Navigate to the React app directory:**
   ```bash
   cd flextrack
   ```

3. **Run the project:**
   ```bash
   npm start
   ```
   This will load the project in your browser at `localhost:3000`.

### Set up the Backend

1. **Open a new terminal and navigate to the backend directory from the main directory:**
   ```bash
   cd backend
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Reset and recreate the database schema:**
   ```bash
   npx mikro-orm-esm schema:drop --run
   npx mikro-orm-esm schema:create --run
   ```

4. **Run the backend server:**
   ```bash
   npm start
   ```

## Features

- **Workout Tracking**: Users can create, manage, and track multiple workout plans with detailed sessions, each outlined by specific exercises, sets, and reps.

- **Challenges and Posts**: Engage in challenges with progress logs and competition setups among multiple participants. Users can create posts directly linked to their workout activities.

- **Profiles and Social Features**: Customize user profiles with fitness descriptions, add friends, share plans, and engage through posts and challenge invites.

- **User Dashboard**: Displays a summary of the user's fitness activities and upcoming workouts.

- **Navigation**: Easy access to all pages via a user-friendly navigation bar.

## Technology Stack

- **Frontend**: React.js, Axios, Bootstrap, CSS, Google Fonts, Font Awesome
- **Backend**: TypeScript, Express, Mikro-ORM, SQLite

## Future Development

Potential areas for expansion include:
- Full OAuth integration.
- Enhanced user metrics.
- AI-generated workout and challenge recommendations.
- Implementation of daily and weekly challenges.
- Expanded mobile support.
- Verification methods for weights lifted.

## References

[1] Godman, H. (2022, October 1). [Do activity trackers make us exercise more?](https://www.health.harvard.edu/exercise-and-fitness/do-activity-trackers-make-us-exercise-more) Harvard Health.
[2] Gough, C. (2024, January 22). [Frequency of using the gym by generation US 2023](https://www.statista.com/statistics/1445818/generational-share-workout-gym/) Statista.
