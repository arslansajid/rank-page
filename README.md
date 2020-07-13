# Rank Page - FE

## Getting Started

1. To run, go to project folder and run

`$ npm install` (if you are using npm)

2. Now start dev server by running -

`$ npm start`

3. visit - http://localhost:3000/

To create production ready codes -

`$ npm build`

4. Analyze source code / bundle size

`$ npm analyze`

for more commands refer `package.json`


## Code Structure

### Containers
Containers are presentational components. Usually we plug in containers to our redux-router. Containers folder has multiple subdirectories, each for a new route. These subdirectories have their own style.css and index.js files. In addition to that, any other non-reusable components will be place in the container subdirectory i.e containers/home/form.js as can be seen.

### Components
Components folder contains all the dumb components that we need to add to our containers and are reusable

### Actions & Reducers
Before you start, find out your entities, the main enitities your application reloves around, that'll be helpful for creating actions and reducers. Each entity gets its own reducer and action file, which can have multiple actions & reducers per file related to the same entitiy.

### Routes
All routes are in the routes files. You can make routes in your containers if you need to implement IndexRoute behaviour. 
