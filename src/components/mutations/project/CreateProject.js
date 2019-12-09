import React from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_PROJECT } from '../mutations'
import { GET_PROJECTS } from '../../queries/queries'

export default function CreateProjectMutation ({
  children,
  project,
  companyId
}) {
  return (
    <Mutation
      update={(store, { data: { createProject } }) => {
        let query = { query: GET_PROJECTS }
        query.variables = { companyId }
        const data = store.readQuery(query)
        data.projects.push(createProject)
        store.writeQuery({ ...query, data })
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        createProject: {
          __typename: 'Project',
          id: -1,
          ...project,
          requirement: null
        }
      }}
      mutation={CREATE_PROJECT}
    >
      {(createProject, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            createProject,
            loading
          })
        })
      }}
    </Mutation>
  )
}
