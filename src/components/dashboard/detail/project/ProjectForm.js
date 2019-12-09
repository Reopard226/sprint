import React from 'react'
import { createNotification } from '../../../common/notification'
import { convertDateToString, isEqualObject } from '../../../common/helpers'
import Loader from '../../../animation/Loader'

export default function ProjectForm ({
  createProject,
  updateProject,
  loading,
  state,
  metaUsers,
  onChangeState,
  validErr
}) {
  const project = state.selectedItem
  const companyId = state.curCompanyId
  const isEdited = !isEqualObject(project, state.selectedOriginItem)

  const getDefaultPM = (pms) => {
    const defaultPM = pms.filter(pm => pm.name === 'Sam Rowlands')
    if (defaultPM.length === 0) return pms[0].id
    return defaultPM[0].id
  }

  const handleProjectSubmit = () => {
    if (!isEdited) return
    if (validErr) {
      createNotification('error', 'Please input the project data correctly')
      return
    }
    const projectInput = Object.assign({}, project)
    delete projectInput.id
    delete projectInput.slug
    delete projectInput.__typename
    delete projectInput.requirement
    projectInput.startDate = convertDateToString(projectInput.startDate)
    projectInput.dueDate = convertDateToString(projectInput.dueDate)
    projectInput.deliveredDate = convertDateToString(projectInput.deliveredDate)
    if (!projectInput.status) projectInput.status = 1
    if (!projectInput.projectManager) {
      projectInput.projectManager = getDefaultPM(metaUsers.distributed_pm)
    }

    if (typeof updateProject !== typeof undefined) {
      updateProject({
        variables: { projectId: project.id, project: projectInput }
      })
        .then(result => {
          createNotification(
            'success',
            `Project "${project.title}" has been updated successfully`
          )
          state.selectedOriginItem = Object.assign({}, state.selectedItem)
          onChangeState(state)
        })
        .catch(err => createNotification('error', err.message))
    } else {
      createProject({ variables: { companyId, project: projectInput } })
        .then(result => {
          createNotification(
            'success',
            `New project "${project.title}" has been created successfully`
          )
          state.curProjectId = result.data.createProject.id
          state.selectedItem = result.data.createProject
          state.selectedOriginItem = Object.assign({}, state.selectedItem)
          onChangeState(state)
        })
        .catch(err => createNotification('error', err.message))
    }
  }

  return (
    <React.Fragment>
      <div className='item-category'>
        {'Project'}
        {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
        {!loading && (
          <a
            className={isEdited ? '' : 'disabled'}
            onClick={handleProjectSubmit}
          >
            SAVE
          </a>
        )}
      </div>
      <h2 className='item-name'>{project.title}</h2>
    </React.Fragment>
  )
}
