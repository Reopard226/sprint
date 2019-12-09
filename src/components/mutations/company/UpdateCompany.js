import React from 'react'
import { Mutation } from 'react-apollo'
import { UPDATE_COMPANY } from '../mutations'
import { GET_COMPANIES } from '../../queries/queries'

export default function UpdateCompanyMutation ({ children, company }) {
  return (
    <Mutation
      update={(store, { data: { updateCompany } }) => {
        let query = { query: GET_COMPANIES }
        const data = store.readQuery(query)
        for (let i = 0; i < data.companies.length; i++) {
          if (data.companies[i].id === company.id) {
            data.companies[i].name = updateCompany.name
            data.companies[i].projectManager = updateCompany.projectManager
            data.companies[i].salesRep = updateCompany.salesRep
            data.companies[i].hours = updateCompany.hours
          }
        }
        store.writeQuery({ ...query, data })
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        updateCompany: {
          __typename: 'Company',
          ...company
        }
      }}
      mutation={UPDATE_COMPANY}
    >
      {(updateCompany, { loading }) => {
        return React.Children.map(children, function (child) {
          return React.cloneElement(child, {
            updateCompany,
            loading
          })
        })
      }}
    </Mutation>
  )
}
