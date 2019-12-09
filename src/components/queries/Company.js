import React from 'react'
import { Query } from 'react-apollo'
import { GET_COMPANIES } from './queries'
import { createNotification } from '../common/notification'

const renderResult = (children, companies, loading) => {
  return React.Children.map(children, child =>
    React.cloneElement(child, { companies, loading })
  )
}

const CompanyQuery = ({ children }) => (
  <Query query={GET_COMPANIES}>
    {({ loading, error, data }) => {
      if (error) {
        console.log('[GraphQL Query] [GET_COMPANIES] error: ', error)
        createNotification('error', error.message)
        return renderResult(children, null, false)
      }
      const companies = data.companies
      return renderResult(children, companies, loading)
    }}
  </Query>
)

export default CompanyQuery
