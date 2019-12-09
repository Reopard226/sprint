import React from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_COMPANY } from '../mutations'
import { GET_COMPANIES } from '../../queries/queries'

export default function CreateCompanyMutation ({ children, company }) {
  return (
    <Mutation
      update={(store, { data: { createCompany } }) => {
        let query = { query: GET_COMPANIES }
        const data = store.readQuery(query)
        createCompany.users = []
        data.companies.push(createCompany)
        store.writeQuery({ ...query, data })
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        createCompany: {
          __typename: 'Company',
          id: -1,
          ...company
        }
      }}
      mutation={CREATE_COMPANY}
    >
      {(createCompany, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            createCompany,
            loading
          })
        })
      }}
    </Mutation>
  )
}
