import React from 'react'
import { Query } from 'react-apollo'
import { GET_METAUSERS } from './queries'
import { createNotification } from '../common/notification'

const renderResult = (children, metaUsers, loading) => {
  return React.Children.map(children, child =>
    React.cloneElement(child, { metaUsers, loading })
  )
}

const MetaUserQuery = ({ children }) => (
  <Query query={GET_METAUSERS}>
    {({ loading, error, data }) => {
      if (error) {
        console.log('[GraphQL Query] [GET_COMPANIES] error: ', error)
        createNotification('error', error.message)
        return renderResult(children, null, false)
      }
      const metaUsers = data.dstbtdUsers
      return renderResult(children, metaUsers, loading)
    }}
  </Query>
)

export default MetaUserQuery
