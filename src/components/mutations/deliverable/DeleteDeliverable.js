import React from 'react'
import { Mutation } from 'react-apollo'
import { DELETE_DELIVERABLE } from '../mutations'
import { GET_DELIVERABLES } from '../../queries/queries'

export default function DeleteDeliverableMutation ({
  children,
  deliverableId,
  projectId
}) {
  return (
    <Mutation
      update={(store, { data: { deleteDeliverable: result } }) => {
        let query = { query: GET_DELIVERABLES }
        query.variables = { projectId }
        const data = store.readQuery(query)
        if (result === 1) {
          for (let i = 0; i < data.deliverables.length; i++) {
            if (data.deliverables[i].id === deliverableId) {
              data.deliverables.splice(i, 1)
              break
            }
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={DELETE_DELIVERABLE}
    >
      {(deleteDeliverable, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            deleteDeliverable,
            loading
          })
        })
      }}
    </Mutation>
  )
}
