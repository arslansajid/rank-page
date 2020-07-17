import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

// Configure routes
const Home = React.lazy(() => import('./containers/Home'));
const About = React.lazy(() => import('./containers/About'));
const SignUp = React.lazy(() => import('./components/SignUp'));
const Profile = React.lazy(() => import('./containers/Profile'));
const PageNotFound = React.lazy(() => import('./containers/PageNotFound'));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/SignUp" render={() => <SignUp />} />
        <Route exact path="/profile" render={() => <Profile />} />
        {/* <Route exact path="/about" render={() => <About />} /> */}
        <Route exact path='*' render={() => <PageNotFound />} />
      </Switch>
    </Suspense>
  )
}

export default Routes;