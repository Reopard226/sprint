import React from 'react'
import { LeadItem, Item } from '../../common/Listtem'
import Loader from '../../animation/Loader'

const CompanyList = ({ state, onChangeState, companies, loading }) => {
  const onClickCompanyItem = company => {
    state.selectedItem = JSON.parse(JSON.stringify(company))
    state.selectedOriginItem = company
    state.selectedCategory = 'company'
    state.curCompanyId = company.id
    state.curProjectId = -1
    state.curDeliverableId = -1
    state.curTaskId = -1
    onChangeState(state)
  }

  const onCreateCompany = () => {
    const newCompany = {
      name: '',
      projectManager: 1,
      salesRep: 1,
      hours: 0,
      users: []
    }
    state.selectedItem = newCompany
    state.selectedCategory = 'company'
    onChangeState(state)
  }

  return (
    <div className='item-list'>
      <LeadItem text={'Company'} onAddItem={onCreateCompany} active />
      <div className='item-list-body'>
        {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
        {!loading &&
          companies &&
          companies.map(company => {
            return (
              <Item
                key={company.id}
                text={company.name}
                onClickItem={() => onClickCompanyItem(company)}
                active={company.id === state.curCompanyId}
                clicked={company === state.selectedItem}
              />
            )
          })}
      </div>
    </div>
  )
}
export default CompanyList
