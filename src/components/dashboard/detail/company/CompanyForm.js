import React from 'react'
import { createNotification } from '../../../common/notification'
import { isEqualObject } from '../../../common/helpers'
import Loader from '../../../animation/Loader'

export default function CompanyForm ({
  createCompany,
  updateCompany,
  loading,
  state,
  onChangeState
}) {
  const company = state.selectedItem
  const isEdited = !isEqualObject(company, state.selectedOriginItem)

  const handleCompanySubmit = () => {
    if (!isEdited) return
    if (company.name.length < 3) {
      createNotification('error', 'Please input the company data correctly')
      return
    }
    const companyInput = {
      name: company.name,
      projectManager: company.projectManager,
      salesRep: company.salesRep,
      hours: company.hours
    }
    if (typeof updateCompany !== typeof undefined) {
      updateCompany({ variables: { company: companyInput, id: company.id } })
        .then(result => {
          createNotification(
            'success',
            `Company "${company.name}" has been updated successfully`
          )
          state.selectedOriginItem = Object.assign({}, state.selectedItem)
          onChangeState(state)
        })
        .catch(err => createNotification('error', err.message))
    } else {
      createCompany({ variables: { company: companyInput } })
        .then(result => {
          createNotification(
            'success',
            `New company "${company.name}" has been created successfully`
          )
          state.selectedItem = result.data.createCompany
          state.selectedOriginItem = Object.assign({}, state.selectedItem)
          state.curCompanyId = result.data.createCompany.id
          onChangeState(state)
        })
        .catch(err => createNotification('error', err.message))
    }
  }

  return (
    <React.Fragment>
      <div className='item-category'>
        {'Company'}
        {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
        {!loading && (
          <a
            className={isEdited ? '' : 'disabled'}
            onClick={handleCompanySubmit}
          >
            SAVE
          </a>
        )}
      </div>
      <h2 className='item-name'>{company.name}</h2>
    </React.Fragment>
  )
}
