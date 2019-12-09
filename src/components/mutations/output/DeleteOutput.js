import React from 'react'
import { Mutation } from 'react-apollo'
import { DELETE_OUTPUT } from '../mutations'
import { GET_DELIVERABLES } from '../../queries/queries'

export default function DeleteOutputMutation ({
  children,
  deliverableId,
  index,
  projectId
}) {
  return (
    <Mutation
      update={(store, { data: { deleteOutput: result } }) => {
        let query = { query: GET_DELIVERABLES }
        query.variables = { projectId }
        const data = store.readQuery(query)
        if (result === 1) {
          for (let i = 0; i < data.deliverables.length; i++) {
            if (data.deliverables[i].id === deliverableId) {
              data.deliverables[i].outputs.splice(index, 1)
            }
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={DELETE_OUTPUT}
    >
      {(deleteOutput, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            deleteOutput,
            loading
          })
        })
      }}
    </Mutation>
  )
}
