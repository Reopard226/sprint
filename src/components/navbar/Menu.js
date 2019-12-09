import React from 'react'
import CurrentUserQuery from '../queries/CurrentUser'
import End from './End'

const Menu = ({ isActive, isAuthenticated, logout, openModal }) => (
  <div id='right-menu' className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
    <CurrentUserQuery>
      <End isAuthenticated={isAuthenticated} logout={logout} />
    </CurrentUserQuery>
  </div>
)

export default Menu
