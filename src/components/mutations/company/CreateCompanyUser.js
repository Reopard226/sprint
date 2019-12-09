import React from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_COMPANY_USER } from '../mutations'
import { GET_COMPANIES } from '../../queries/queries'

export default function CreateCompanyUserMutation ({
  children,
  user,
  index,
  companyId
}) {
  return (
    <Mutation
      update={(store, { data: { createCompanyUser } }) => {
        let query = { query: GET_COMPANIES }
        const data = store.readQuery(query)
        for (let i = 0; i < data.companies.length; i++) {
          if (data.companies[i].id === companyId) {
            data.companies[i].users[index] = createCompanyUser
          }
        }
        store.writeQuery({ ...query, data })
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        createCompanyUser: {
          __typename: 'CompanyUser',
          id: -1,
          ...user
        }
      }}
      mutation={CREATE_COMPANY_USER}
    >
      {(createCompanyUser, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            createCompanyUser,
            loading
          })
        })
      }}
    </Mutation>
  )
}
