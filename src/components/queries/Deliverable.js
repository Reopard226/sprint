import React from 'react'
import { Query } from 'react-apollo'
import { GET_DELIVERABLES } from './queries'
import { createNotification } from '../common/notification'

function renderResult (children, deliverables, loading) {
  return React.Children.map(children, child =>
    React.cloneElement(child, { deliverables, loading })
  )
}

const DeliverableQuery = ({ children, variables }) => {
  if (variables.projectId === -1) {
    return renderResult(children, null, false)
  }

  return (
    <Query query={GET_DELIVERABLES} variables={variables}>
      {({ loading, error, data }) => {
        if (error) {
          console.log('[GraphQL Query] [GET_DELIVERABLES] error: ', error)
          createNotification('error', error.message)
          return renderResult(children, null, false)
        }
        const deliverables = data.deliverables
        return renderResult(children, deliverables, loading)
      }}
    </Query>
  )
}

export default DeliverableQuery
