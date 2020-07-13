# cra-boilerplate


This project is an [Create React App - v3.2.0](https://facebook.github.io/create-react-app/) boilerplate
with integration of Redux, React Router, Redux thunk, Reactstrap(Bootstrap v4) & Redux Forms


Before starting with project, please headover to [CRA](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md
) documentation.


#### Features

- [Domain-style](https://github.com/reactjs/redux/blob/master/docs/faq/CodeStructure.md) for code structure

## Getting Started

1. Clone this repo

`https://github.com/yasserzubair/THE-BOILERPLATE.git`

2. To run, go to project folder and run

`$ yarn install` (if you are using yarn)

3. Now start dev server by running -

`$ yarn start`

4. visit - http://localhost:3000/

To create production ready codes -

`$ yarn build`

5. Analyze source code / bundle size

`$ yarn analyze`

for more commands refer `package.json`


## Roadmap

Before starting development please go through -

- [Presentational and Container Components
](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [All the fundamental React.js concepts, jammed into this single Medium article](https://medium.freecodecamp.org/all-the-fundamental-react-js-concepts-jammed-into-this-single-medium-article-c83f9b53eac2)
- [When do I know I’m ready for Redux?](https://medium.com/dailyjs/when-do-i-know-im-ready-for-redux-f34da253c85f)

## Code Structure

### Containers
Containers are presentational components. Usually we plug in containers to our redux-router. Containers folder has multiple subdirectories, each for a new route. These subdirectories have their own style.css and index.js files. In addition to that, any other non-reusable components will be place in the container subdirectory i.e containers/home/form.js as can be seen.

### Components
Components folder contains all the dumb components that we need to add to our containers and are reusable

### Actions & Reducers
Before you start, find out your entities, the main enitities your application reloves around, that'll be helpful for creating actions and reducers. Each entity gets its own reducer and action file, which can have multiple actions & reducers per file related to the same entitiy.

### Routes
All routes are in the routes files. You can make routes in your containers if you need to implement IndexRoute behaviour. 
