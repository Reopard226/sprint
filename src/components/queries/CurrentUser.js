import React from 'react'
import { Query } from 'react-apollo'
import { CURRENT_USER } from './queries'

const CurrentUserQuery = ({ children }) => (
  <Query query={CURRENT_USER}>
    {({ loading, error, data }) => {
      if (error) {
        console.log('[GraphQL Query] [CURRENT_USER] error: ', error)
        // error handler
        return <div />
      }
      const { currentUser } = data
      return React.Children.map(children, child =>
        React.cloneElement(child, { currentUser, loading })
      )
    }}
  </Query>
)

export default CurrentUserQuery
