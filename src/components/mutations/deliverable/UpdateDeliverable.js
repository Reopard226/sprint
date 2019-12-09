import React from 'react'
import { Mutation } from 'react-apollo'
import { UPDATE_DELIVERABLE } from '../mutations'
import { GET_DELIVERABLES } from '../../queries/queries'

export default function UpdateDeliverableMutation ({
  children,
  deliverable,
  projectId
}) {
  return (
    <Mutation
      update={(store, { data: { updateDeliverable } }) => {
        let query = { query: GET_DELIVERABLES }
        query.variables = { projectId }
        const data = store.readQuery(query)
        for (let i = 0; i < data.deliverables.length; i++) {
          if (data.deliverables[i].id === deliverable.id) {
            data.deliverables[i] = updateDeliverable
          }
        }
        store.writeQuery({ ...query, data })
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        updateDeliverable: {
          __typename: 'Deliverable',
          ...deliverable
        }
      }}
      mutation={UPDATE_DELIVERABLE}
    >
      {(updateDeliverable, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            updateDeliverable,
            loading
          })
        })
      }}
    </Mutation>
  )
}
