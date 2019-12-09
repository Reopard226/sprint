import history from '../../history'
import auth0 from 'auth0-js'
import Config from '../../config/config'

export default class Auth {
  accessToken
  idToken
  expiresAt

  auth0 = new auth0.WebAuth(Config.auth0)

  constructor () {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getIdToken = this.getIdToken.bind(this)
    this.renewSession = this.renewSession.bind(this)
  }

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        history.replace('/')
        console.log(err)
        window.alert(
          `Error: ${err.error}. Check the console for further details.`
        )
      }
    })
  }

  getAccessToken () {
    return this.accessToken
  }

  getIdToken () {
    return this.idToken
  }

  setSession (authResult) {
    // Set isLoggedIn flag in localStorage
    window.localStorage.setItem('isLoggedIn', 'true')

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    window.localStorage.setItem('expiresAt', expiresAt)
    this.accessToken = authResult.accessToken
    window.localStorage.setItem('accessToken', this.accessToken)
    this.idToken = authResult.idToken
    this.expiresAt = expiresAt

    // navigate to the home route
    history.replace('/dashboard')
  }

  renewSession () {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        this.logout()
        console.log(err)
        window.alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        )
      }
    })
  }

  logout () {
    // Remove tokens and expiry time
    this.accessToken = null
    this.idToken = null
    this.expiresAt = 0

    // Remove isLoggedIn flag from localStorage
    window.localStorage.removeItem('isLoggedIn')
    window.localStorage.removeItem('expiresAt')

    // navigate to the home route
    // history.replace('/');
    this.auth0.logout()
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt
    if (!expiresAt) {
      expiresAt = window.localStorage.getItem('expiresAt')
    }
    let isLoggedIn = window.localStorage.getItem('isLoggedIn')
    return isLoggedIn && new Date().getTime() < expiresAt
  }
}
