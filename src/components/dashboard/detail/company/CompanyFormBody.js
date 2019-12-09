import React, { useState } from 'react'
import { mkLengthError } from '../../../common/error'
import Form from '../../../common/form'
import Loader from '../../../animation/Loader'

const { TextField, Select } = Form

export default function CompanyFormBody ({
  metaUsers,
  loading,
  state,
  onChangeState
}) {
  const [nameError, setNameError] = useState(false)
  const company = state.selectedItem

  const onChangeCompany = (name, value) => {
    state.selectedItem[name] = value
    onChangeState(state)
  }

  const onChangeCompanyName = (name, value) => {
    if (value.length < 3) setNameError(true)
    else setNameError(false)
    onChangeCompany(name, value)
  }

  const validationMsg = nameError ? mkLengthError('Company name') : ''

  return (
    <React.Fragment>
      {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
      {!loading && (
        <React.Fragment>
          <TextField
            label='Company name'
            placeholder='Name'
            name='name'
            onChange={onChangeCompanyName}
            value={company.name}
            validationMsg={validationMsg}
          />
          <Select
            label='Project Manager assigned'
            name='projectManager'
            options={metaUsers.distributed_pm}
            onChange={onChangeCompany}
            value={!company.projectManager ? metaUsers.distributed_pm[0].id : company.projectManager}
          />
          <Select
            label='Sales Rep assigned'
            name='salesRep'
            options={metaUsers.distributed_sr}
            onChange={onChangeCompany}
            value={!company.salesRep ? metaUsers.distributed_sr[0].id : company.salesRep}
          />
          <TextField
            label='Hours'
            type='number'
            name='hours'
            placeholder={0}
            onChange={onChangeCompany}
            value={company.hours}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
