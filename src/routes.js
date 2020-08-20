import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingSpinner from './components/Common/LoadingSpinner';

// Configure routes
const Home = React.lazy(() => import('./containers/Home'));
const About = React.lazy(() => import('./containers/About'));
const SignUp = React.lazy(() => import('./components/SignUp'));
const Search = React.lazy(() => import('./containers/Search'));
const Profile = React.lazy(() => import('./containers/Profile'));
const Newsfeed = React.lazy(() => import('./containers/Newsfeed'));
const Notifications = React.lazy(() => import('./containers/Notifications'));
const Messages = React.lazy(() => import('./containers/Chat'));
const Settings = React.lazy(() => import('./containers/Settings'));
const EditProfile = React.lazy(() => import('./containers/EditProfile'));
const Followers = React.lazy(() => import('./containers/Followers'));
const Fans = React.lazy(() => import('./containers/Fans'));
const BlockedUsers = React.lazy(() => import('./containers/BlockedUsers'));
const ReportedUsers = React.lazy(() => import('./containers/ReportedUsers'));
const UserDetail = React.lazy(() => import('./containers/UserDetail'));
const Explore = React.lazy(() => import('./containers/Explore'));
const CategoriesPage = React.lazy(() => import('./containers/CategoriesPage'));
const RecommendedPage = React.lazy(() => import('./containers/RecommendedPage'));
const TrendingPage = React.lazy(() => import('./containers/TrendingPage'));
const ListDetail = React.lazy(() => import('./containers/ListDetail'));
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
        <Route exact path="/" render={() => <Newsfeed />} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/SignUp" render={() => <SignUp />} />
        <Route exact path="/search/:query" render={() => <Search />} />
        <Route exact path="/profile/:tab" render={() => <Profile />} />
        <Route exact path="/newsfeed" render={() => <Newsfeed />} />
        <Route exact path="/notifications" render={() => <Notifications />} />
        <Route exact path="/messages" render={() => <Messages />} />
        <Route exact path="/settings" render={() => <Settings />} />
        <Route exact path="/edit-profile" render={() => <EditProfile />} />
        <Route exact path="/followers" render={() => <Followers />} />
        <Route exact path="/fans" render={() => <Fans />} />
        <Route exact path="/reported-users" render={() => <ReportedUsers />} />
        <Route exact path="/blocked-users" render={() => <BlockedUsers />} />
        <Route exact path="/user-detail/:id/:tab" render={() => <UserDetail />} />
        <Route exact path="/explore" render={() => <Explore />} />
        <Route exact path="/categories" render={() => <CategoriesPage />} />
        <Route exact path="/recommended" render={() => <RecommendedPage />} />
        <Route exact path="/trending" render={() => <TrendingPage />} />
        <Route exact path="/list-detail/:postId" render={() => <ListDetail />} />
        <Route exact path='*' render={() => <PageNotFound />} />
      </Switch>
    </Suspense>
  )
}

export default Routes;