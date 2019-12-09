import React, { Component } from 'react'
import Menu from './Menu'
import Brand from './Brand'

class Navbar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isActive: false
    }

    this.onBurgerClick = this.onBurgerClick.bind(this)
  }

  onBurgerClick () {
    this.setState({ isActive: !this.state.isActive })
  }

  render () {
    const { logout, isAuthenticated } = this.props
    const { isActive } = this.state

    return (
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <Brand
          isActive={isActive}
          handler={this.onBurgerClick}
          isAuthenticated={isAuthenticated}
        />
        <Menu
          logout={logout}
          isAuthenticated={isAuthenticated}
          isActive={isActive}
          openModal={this.openModal}
        />
      </nav>
    )
  }
}

export default Navbar
