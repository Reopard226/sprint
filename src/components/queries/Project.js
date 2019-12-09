import React from 'react'
import { Query } from 'react-apollo'
import { GET_PROJECTS } from './queries'
import { createNotification } from '../common/notification'

function renderResult (children, projects, loading) {
  return React.Children.map(children, child =>
    React.cloneElement(child, { projects, loading })
  )
}

const ProjectQuery = ({ children, variables }) => {
  if (variables.companyId === -1) {
    return renderResult(children, null, false)
  }

  return (
    <Query query={GET_PROJECTS} variables={variables}>
      {({ loading, error, data }) => {
        if (error) {
          console.log('[GraphQL Query] [GET_PROJECTS] error: ', error)
          createNotification('error', error.message)
          return renderResult(children, null, false)
        }
        let projects = data.projects
        if (projects && projects.length > 0) {
          projects = projects.map(project => {
            if (!project.status) project.status = 1
            return project
          })
        }
        return renderResult(children, projects, loading)
      }}
    </Query>
  )
}

export default ProjectQuery
