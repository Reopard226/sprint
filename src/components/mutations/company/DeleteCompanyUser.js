import React from 'react'
import { Mutation } from 'react-apollo'
import { DELETE_COMPANY_USER } from '../mutations'
import { GET_COMPANIES } from '../../queries/queries'

export default function DeleteCompanyUserMutation ({
  children,
  user,
  index,
  companyId
}) {
  return (
    <Mutation
      update={(store, { data: { deleteCompanyUser: result } }) => {
        let query = { query: GET_COMPANIES }
        const data = store.readQuery(query)
        if (result === 1) {
          for (let i = 0; i < data.companies.length; i++) {
            if (data.companies[i].id === companyId) {
              data.companies[i].users.splice(index, 1)
            }
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={DELETE_COMPANY_USER}
    >
      {(deleteCompanyUser, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            deleteCompanyUser,
            loading
          })
        })
      }}
    </Mutation>
  )
}
