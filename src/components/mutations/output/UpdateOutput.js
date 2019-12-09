import React from 'react'
import { Mutation } from 'react-apollo'
import { UPDATE_OUTPUT } from '../mutations'
import { GET_DELIVERABLES } from '../../queries/queries'

export default function UpdateOutputMutation ({
  children,
  deliverableId,
  output,
  index,
  projectId
}) {
  return (
    <Mutation
      update={(store, { data: { updateOutput } }) => {
        let query = { query: GET_DELIVERABLES }
        query.variables = { projectId }
        const data = store.readQuery(query)
        for (let i = 0; i < data.deliverables.length; i++) {
          if (data.deliverables[i].id === deliverableId) {
            data.deliverables[i].outputs[index] = updateOutput
          }
        }
        store.writeQuery({ ...query, data })
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        updateOutput: {
          __typename: 'Output',
          ...output
        }
      }}
      mutation={UPDATE_OUTPUT}
    >
      {(updateOutput, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            updateOutput,
            loading
          })
        })
      }}
    </Mutation>
  )
}
