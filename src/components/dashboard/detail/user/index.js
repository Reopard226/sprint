import React from 'react'
import CurrentUserQuery from '../../../queries/CurrentUser'
import UserInfo from './userInfo'
import Auth from '../../../auth'

const auth = new Auth()

const User = () => (
  <CurrentUserQuery>
    <UserInfo logout={auth.logout} />
  </CurrentUserQuery>
)

export default User
