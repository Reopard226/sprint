import React from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_TASK } from '../mutations'
import { GET_TASKS } from '../../queries/queries'

export default function CreateTaskMutation ({ children, task, deliverableId }) {
  return (
    <Mutation
      update={(store, { data: { createTask } }) => {
        let query = { query: GET_TASKS }
        query.variables = { deliverableId }
        const data = store.readQuery(query)
        data.tasks.push(createTask)
        store.writeQuery({ ...query, data })
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        createTask: {
          __typename: 'Task',
          id: -1,
          ...task
        }
      }}
      mutation={CREATE_TASK}
    >
      {(createTask, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            createTask,
            loading
          })
        })
      }}
    </Mutation>
  )
}
