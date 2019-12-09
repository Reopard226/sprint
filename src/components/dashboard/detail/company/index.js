import React from 'react'
import CompanyForm from './CompanyForm'
import CompanyFormBody from './CompanyFormBody'
import CompanyUserForm from './CompanyUserForm'
import CreateCompanyMutation from '../../../mutations/company/CreateCompany'
import UpdateCompanyMutation from '../../../mutations/company/UpdateCompany'
import CreateCompanyUserMutation from '../../../mutations/company/CreateCompanyUser'
import UpdateCompanyUserMutation from '../../../mutations/company/UpdateCompanyUser'
import DeleteCompanyMutation from '../../../mutations/company/DeleteCompany'
import DeleteCompanyForm from './DeleteCompanyForm'
import MetaUserQuery from '../../../queries/MetaUser'

export default function Company ({ state, onChangeState }) {
  const company = state.selectedItem

  const onAddCompanyUser = () => {
    state.selectedItem.users.push({
      name: '',
      role: '',
      email: '',
      phone: '',
      password: ''
    })
    onChangeState(state)
  }

  return (
    <React.Fragment>
      <div className='detail-header'>
        {company.id && (
          <UpdateCompanyMutation company={company}>
            <CompanyForm state={state} onChangeState={onChangeState} />
          </UpdateCompanyMutation>
        )}
        {!company.id && (
          <CreateCompanyMutation company={company}>
            <CompanyForm state={state} onChangeState={onChangeState} />
          </CreateCompanyMutation>
        )}
      </div>
      <div className='detail-content'>
        <MetaUserQuery>
          <CompanyFormBody state={state} onChangeState={onChangeState} />
        </MetaUserQuery>
        <DeleteCompanyMutation companyId={company.id}>
          <DeleteCompanyForm state={state} onChangeState={onChangeState} />
        </DeleteCompanyMutation>
        {
          company.users && company.users.map((user, index) => {
            if (user.id) {
              return (
                <UpdateCompanyUserMutation key={index} user={user} index={index} companyId={company.id} >
                  <CompanyUserForm index={index} state={state} onChangeState={onChangeState} />
                </UpdateCompanyUserMutation>
              )
            } else {
              return (
                <CreateCompanyUserMutation key={index} index={index} user={user} companyId={company.id} >
                  <CompanyUserForm index={index} state={state} onChangeState={onChangeState} />
                </CreateCompanyUserMutation>
              )
            }
          })
        }
        {company.id && (
          <div className='btn-purple cursor' onClick={onAddCompanyUser}>
            ADD NEW USER
          </div>
        )}
      </div>
    </React.Fragment>
  )
}
