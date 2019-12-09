import React from 'react'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import Dashboard from './components/dashboard'
import Auth from './components/auth'
import history from './history'
import Navbar from './components/navbar'
import Loader from './components/animation/Loader'

const auth = new Auth()

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}

const PrivateRoute = ({ component: Component }) => (
  <Route
    render={props =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/auth'
          }}
        />
      )
    }
  />
)

const LoginRoute = ({ component: Component }) => (
  <Route
    render={props =>
      !auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/dashboard'
          }}
        />
      )
    }
  />
)

const Routes = () => (
  <Router history={history}>
    <Switch>
      <LoginRoute
        exact
        path='/auth'
        component={() => {
          auth.login()
          return (
            <Loader
              animation='Loader'
              width={200}
              height={100}
              className='big-padding'
            />
          )
        }}
      />
      <Route
        path='/auth/callback'
        component={props => {
          handleAuthentication(props)
          return (
            <Loader
              animation='Loader'
              width={200}
              height={100}
              className='big-padding'
            />
          )
        }}
      />
      <PrivateRoute
        path='/dashboard'
        component={() => {
          return (
            <div className='app container'>
              <Navbar
                logout={auth.logout}
                isAuthenticated={auth.isAuthenticated}
              />
              <Dashboard />
            </div>
          )
        }}
      />
      <Route
        path='/'
        component={() => <Redirect to={{ pathname: '/dashboard' }} />}
      />
    </Switch>
  </Router>
)

export default Routes
