import React from 'react'
import { Mutation } from 'react-apollo'
import { UPDATE_COMPANY_USER } from '../mutations'
import { GET_COMPANIES } from '../../queries/queries'

export default function UpdateCompanyUserMutation ({
  children,
  user,
  companyId,
  index
}) {
  return (
    <Mutation
      update={(store, { data: { updateCompanyUser } }) => {
        let query = { query: GET_COMPANIES }
        const data = store.readQuery(query)
        for (let i = 0; i < data.companies.length; i++) {
          if (data.companies[i].id === companyId) {
            data.companies[i].users[index] = updateCompanyUser
          }
        }
        store.writeQuery({ ...query, data })
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        updateCompanyUser: {
          __typename: 'CompanyUser',
          ...user
        }
      }}
      mutation={UPDATE_COMPANY_USER}
    >
      {(updateCompanyUser, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            updateCompanyUser,
            loading
          })
        })
      }}
    </Mutation>
  )
}
