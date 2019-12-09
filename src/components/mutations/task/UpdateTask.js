import React from 'react'
import { Mutation } from 'react-apollo'
import { UPDATE_TASK } from '../mutations'
import { GET_TASKS } from '../../queries/queries'

export default function UpdateTaskMutation ({ children, deliverableId, task }) {
  return (
    <Mutation
      update={(store, { data: { updateTask } }) => {
        let query = { query: GET_TASKS }
        query.variables = { deliverableId }
        const data = store.readQuery(query)
        for (let i = 0; i < data.tasks.length; i++) {
          if (data.tasks[i].id === task.id) {
            data.tasks[i] = updateTask
          }
        }
        store.writeQuery({ ...query, data })
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        updateTask: {
          __typename: 'Task',
          ...task
        }
      }}
      mutation={UPDATE_TASK}
    >
      {(updateTask, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            updateTask,
            loading
          })
        })
      }}
    </Mutation>
  )
}
