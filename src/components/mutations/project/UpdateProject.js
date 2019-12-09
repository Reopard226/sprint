import React from 'react'
import { Mutation } from 'react-apollo'
import { UPDATE_PROJECT } from '../mutations'
import { GET_PROJECTS } from '../../queries/queries'

export default function UpdateProjectMutation ({
  children,
  project,
  companyId
}) {
  return (
    <Mutation
      update={(store, { data: { updateProject } }) => {
        let query = { query: GET_PROJECTS }
        query.variables = { companyId }
        const data = store.readQuery(query)
        for (let i = 0; i < data.projects.length; i++) {
          if (data.projects[i].id === updateProject.id) {
            data.projects[i] = updateProject
          }
        }
        store.writeQuery({ ...query, data })
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        updateProject: {
          __typename: 'Project',
          ...project
        }
      }}
      mutation={UPDATE_PROJECT}
    >
      {(updateProject, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            updateProject,
            loading
          })
        })
      }}
    </Mutation>
  )
}
