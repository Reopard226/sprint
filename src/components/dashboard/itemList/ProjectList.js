import React from 'react'
import { LeadItem, Item } from '../../common/Listtem'
import Loader from '../../animation/Loader'

const ProjectList = ({ state, onChangeState, projects, loading }) => {
  const active = state.curCompanyId !== -1

  const onClickProjectItem = project => {
    state.selectedItem = Object.assign({}, project)
    state.selectedOriginItem = project
    state.selectedCategory = 'project'
    state.curProjectId = project.id
    state.curDeliverableId = -1
    state.curTaskId = -1
    onChangeState(state)
  }

  const onCreateProject = () => {
    if (!active) return
    const newProject = {
      title: '',
      projectManager: null,
      status: 1,
      startDate: '',
      dueDate: '',
      hoursAllocated: 0,
      deliveredDate: '',
      slug: '',
      beDevs: 0,
      feDevs: 0,
      uiDevs: 0,
      specialists: 0,
      reportLink: ''
    }
    state.selectedItem = newProject
    state.selectedCategory = 'project'
    onChangeState(state)
  }

  return (
    <div className='item-list'>
      <LeadItem text={'Project'} onAddItem={onCreateProject} active={active} />
      <div className='item-list-body'>
        {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
        {!loading &&
          projects &&
          projects.map(project => {
            return (
              <Item
                key={project.id}
                text={project.title}
                onClickItem={() => onClickProjectItem(project)}
                active={project.id === state.curProjectId}
                clicked={project === state.selectedItem}
              />
            )
          })}
      </div>
    </div>
  )
}
export default ProjectList
