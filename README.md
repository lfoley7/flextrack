# CS542-Project

## Set up the React Project

- First, download this project and run ```npm install```
- Then, navigate to the react app directory by typring ```cd flextrack```
- Finally, run the project with ```npm start```, and the project should load in your browser on localhost:3000!

## Set up the Backend

- Open a new terminal, and from the main directory, type ```cd backend```
- Update the libraries ```npm install```
- Reset the database schema ```npx mikro-orm-esm schema:drop --run```
- Remake the database schema ```npx mikro-orm-esm schema:create --run```
- Run the backend with ```npm start```
