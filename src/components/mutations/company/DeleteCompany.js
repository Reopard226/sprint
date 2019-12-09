import React from 'react'
import { Mutation } from 'react-apollo'
import { DELETE_COMPANY } from '../mutations'
import { GET_COMPANIES } from '../../queries/queries'

export default function DeleteCompanyMutation ({ children, companyId }) {
  return (
    <Mutation
      update={(store, { data: { deleteCompany: result } }) => {
        let query = { query: GET_COMPANIES }
        const data = store.readQuery(query)
        if (result === 1) {
          for (let i = 0; i < data.companies.length; i++) {
            if (data.companies[i].id === companyId) {
              data.companies.splice(i, 1)
              break
            }
          }
        }
        store.writeQuery({ ...query, data })
      }}
      mutation={DELETE_COMPANY}
    >
      {(deleteCompany, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            deleteCompany,
            loading
          })
        })
      }}
    </Mutation>
  )
}
