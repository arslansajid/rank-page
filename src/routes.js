import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingSpinner from './components/Common/LoadingSpinner';

// Configure routes
const Home = React.lazy(() => import('./containers/Home'));
const About = React.lazy(() => import('./containers/About'));
const SignUp = React.lazy(() => import('./components/SignUp'));
const Profile = React.lazy(() => import('./containers/Profile'));
const Messages = React.lazy(() => import('./containers/Chat'));
const Settings = React.lazy(() => import('./containers/Settings'));
const EditProfile = React.lazy(() => import('./containers/EditProfile'));
const PageNotFound = React.lazy(() => import('./containers/PageNotFound'));

const Routes = () => {
  return (
    <Suspense fallback={
      <LoadingSpinner
        loading={true}
        text="Loading..."
        size="large"
      />
    }>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/SignUp" render={() => <SignUp />} />
        <Route exact path="/profile" render={() => <Profile />} />
        <Route exact path="/messages" render={() => <Messages />} />
        <Route exact path="/settings" render={() => <Settings />} />
        <Route exact path="/edit-profile" render={() => <EditProfile />} />
        {/* <Route exact path="/about" render={() => <About />} /> */}
        <Route exact path='*' render={() => <PageNotFound />} />
      </Switch>
    </Suspense>
  )
}

export default Routes;