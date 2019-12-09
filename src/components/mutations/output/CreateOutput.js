import React from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_OUTPUT } from '../mutations'
import { GET_DELIVERABLES } from '../../queries/queries'

export default function CreateOutputMutation ({
  children,
  output,
  deliverableId,
  projectId,
  index
}) {
  return (
    <Mutation
      update={(store, { data: { createOutput } }) => {
        let query = { query: GET_DELIVERABLES }
        query.variables = { projectId }
        const data = store.readQuery(query)
        for (let i = 0; i < data.deliverables.length; i++) {
          if (data.deliverables[i].id === deliverableId) {
            data.deliverables[i].outputs[index] = createOutput
          }
        }
        store.writeQuery({ ...query, data })
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        createOutput: {
          __typename: 'Output',
          id: -1,
          ...output
        }
      }}
      mutation={CREATE_OUTPUT}
    >
      {(createOutput, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            createOutput,
            loading
          })
        })
      }}
    </Mutation>
  )
}
