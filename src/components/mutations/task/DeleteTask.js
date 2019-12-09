import React from 'react'
import { Mutation } from 'react-apollo'
import { DELETE_TASK } from '../mutations'
import { GET_TASKS } from '../../queries/queries'

export default function DeleteTaskMutation ({
  children,
  deliverableId,
  taskId
}) {
  return (
    <Mutation
      update={(store, { data: { deleteTask: result } }) => {
        let query = { query: GET_TASKS }
        query.variables = { deliverableId }
        const data = store.readQuery(query)
        if (result === 1) {
          for (let i = 0; i < data.tasks.length; i++) {
            if (data.tasks[i].id === taskId) {
              data.tasks.splice(i, 1)
              break
            }
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={DELETE_TASK}
    >
      {(deleteTask, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            deleteTask,
            loading
          })
        })
      }}
    </Mutation>
  )
}
