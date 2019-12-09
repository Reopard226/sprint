import React from 'react'
import Loader from '../../../animation/Loader'

const UserInfo = ({ currentUser, loading, logout }) => (
  <React.Fragment>
    <div className='detail-header'>
      <div className='item-category'>{'Account'}</div>
      {loading && (
        <div className='navbar-item'>
          <Loader height={20} width={150} animation='SimpleLoader' />
        </div>
      )}
      {!loading && <h2 className='item-name'>{currentUser.name}</h2>}
    </div>
    <div className='detail-content'>
      <a onClick={logout}>SIGN OUT</a>
    </div>
  </React.Fragment>
)

export default UserInfo
