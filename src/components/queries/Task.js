import React from 'react'
import { Query } from 'react-apollo'
import { GET_TASKS } from './queries'
import { createNotification } from '../common/notification'

function renderResult (children, tasks, loading) {
  return React.Children.map(children, child =>
    React.cloneElement(child, { tasks, loading })
  )
}

const TaskQuery = ({ children, variables }) => {
  if (variables.deliverableId === -1) {
    return renderResult(children, null, false)
  }

  return (
    <Query query={GET_TASKS} variables={variables}>
      {({ loading, error, data }) => {
        if (error) {
          console.log('[GraphQL Query] [GET_TASKS] error: ', error)
          createNotification('error', error.message)
          return renderResult(children, null, false)
        }
        const tasks = data.tasks
        return renderResult(children, tasks, loading)
      }}
    </Query>
  )
}

export default TaskQuery
