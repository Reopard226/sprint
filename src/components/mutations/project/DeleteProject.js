import React from 'react'
import { Mutation } from 'react-apollo'
import { DELETE_PROJECT } from '../mutations'
import { GET_PROJECTS } from '../../queries/queries'

export default function DeleteProjectMutation ({
  children,
  companyId,
  projectId
}) {
  return (
    <Mutation
      update={(store, { data: { deleteProject: result } }) => {
        let query = { query: GET_PROJECTS }
        query.variables = { companyId }
        const data = store.readQuery(query)
        if (result === 1) {
          for (let i = 0; i < data.projects.length; i++) {
            if (data.projects[i].id === projectId) {
              data.projects.splice(i, 1)
              break
            }
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={DELETE_PROJECT}
    >
      {(deleteProject, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            deleteProject,
            loading
          })
        })
      }}
    </Mutation>
  )
}
