import React from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_DELIVERABLE } from '../mutations'
import { GET_DELIVERABLES } from '../../queries/queries'

export default function CreateDeliverableMutation ({
  children,
  deliverable,
  projectId
}) {
  return (
    <Mutation
      update={(store, { data: { createDeliverable } }) => {
        let query = { query: GET_DELIVERABLES }
        query.variables = { projectId }
        const data = store.readQuery(query)
        data.deliverables.push(createDeliverable)
        store.writeQuery({ ...query, data })
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        createDeliverable: {
          __typename: 'Deliverable',
          id: -1,
          ...deliverable,
          outputs: []
        }
      }}
      mutation={CREATE_DELIVERABLE}
    >
      {(createDeliverable, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            createDeliverable,
            loading
          })
        })
      }}
    </Mutation>
  )
}
