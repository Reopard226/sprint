import React from 'react'

const Burger = ({ isActive, handler, isAuthenticated }) => (
  <a
    role='button'
    className={`navbar-burger burger ${isActive ? 'is-active' : ''} ${
      !isAuthenticated() ? 'hidden-buger' : ''
    }`}
    aria-label='menu'
    aria-expanded='false'
    data-target='right-menu'
    onClick={handler}
  >
    <span aria-hidden='true' />
    <span aria-hidden='true' />
    <span aria-hidden='true' />
  </a>
)

export default Burger
