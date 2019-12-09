import React from 'react'
import Burger from './Burger'
import Image from '../../assets/images'
import { Link } from 'react-router-dom'

const Brand = ({ isActive, handler, isAuthenticated }) => (
  <div className='navbar-brand'>
    <Link to='/' className='navbar-item'>
      <img src={Image.Logo} height='50' alt='' />
    </Link>

    <Burger
      isActive={isActive}
      handler={handler}
      isAuthenticated={isAuthenticated}
    />
  </div>
)

export default Brand
