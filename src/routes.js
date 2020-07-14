import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

// Configure routes
const Home = React.lazy(() => import('./containers/Home'));
const About = React.lazy(() => import('./containers/About'));
const PageNotFound = React.lazy(() => import('./containers/PageNotFound'));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path='*' component={PageNotFound} />
      </Switch>
    </Suspense>
  )
}

export default Routes;