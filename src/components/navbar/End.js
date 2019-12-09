import React from 'react'
import Loader from '../animation/Loader'

const End = ({ currentUser, loading, isAuthenticated, logout }) => (
  <div className='navbar-end'>
    {loading && (
      <div className='navbar-item'>
        <Loader height={20} width={150} animation='SimpleLoader' />
      </div>
    )}
    {!loading && (
      <div className='navbar-item has-dropdown is-hoverable'>
        <a className='navbar-link is-arrowless'>
          <span>{currentUser.name}</span>
          <img src={currentUser.avatar} alt='' />
        </a>

        <div className='navbar-dropdown'>
          <a className='navbar-item' onClick={logout}>
            Logout
          </a>
        </div>
      </div>
    )}
  </div>
)

export default End
