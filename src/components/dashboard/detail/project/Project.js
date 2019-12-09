import React, { useState } from 'react'
import Form from '../../../common/form'
import { projectStatus } from '../../../queries/dummy-data'
import CreateProjectMutation from '../../../mutations/project/CreateProject'
import ProjectForm from './ProjectForm'
import UpdateProjectMutation from '../../../mutations/project/UpdateProject'
import DeleteProjectMutation from '../../../mutations/project/DeleteProject'
import DeleteProjectForm from './DeleteProjectForm'
import { mkLengthError } from '../../../common/error'
import { getDateFromString } from '../../../common/helpers'
import Loader from '../../../animation/Loader'

const { TextField, Select, DatePicker } = Form

export default function ProjectPage ({
  metaUsers,
  loading,
  state,
  onChangeState,
  goToRequirement
}) {
  const [validErr, setValidErr] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [reportLinkError, setReportLinkError] = useState(false)
  const project = state.selectedItem

  const onChangeProject = (name, value) => {
    state.selectedItem[name] = value
    onChangeState(state)
  }

  const onChangeProjectTitle = (name, value) => {
    if (value.length < 3) {
      setTitleError(true)
      setValidErr(true)
    } else {
      setTitleError(false)
      if (!reportLinkError) setValidErr(false)
    }
    onChangeProject(name, value)
  }

  const onChangeProjectReportLink = (name, value) => {
    if (
      value &&
      value.indexOf('http://') !== 0 &&
      value.indexOf('https://') !== 0
    ) {
      setReportLinkError(true)
      setValidErr(true)
    } else {
      setReportLinkError(false)
      if (!titleError) setValidErr(false)
    }
    onChangeProject(name, value)
  }

  const validationMsg = titleError ? mkLengthError('Project title') : ''
  const validationURLMsg = reportLinkError
    ? 'Please input full url address'
    : ''

  return (
    <React.Fragment>
      <div className='detail-header'>
        {project.id && (
          <UpdateProjectMutation
            project={project}
            companyId={state.curCompanyId}
          >
            <ProjectForm
              state={state}
              onChangeState={onChangeState}
              metaUsers={metaUsers}
              validErr={validErr}
            />
          </UpdateProjectMutation>
        )}
        {!project.id && (
          <CreateProjectMutation
            project={project}
            companyId={state.curCompanyId}
          >
            <ProjectForm
              state={state}
              onChangeState={onChangeState}
              metaUsers={metaUsers}
              validErr={validErr}
            />
          </CreateProjectMutation>
        )}
      </div>
      <div className='detail-content'>
        {project.requirement && (
          <a onClick={goToRequirement}>VIEW REQUIREMENTS</a>
        )}
        <Select
          label='Project status'
          name='status'
          options={projectStatus}
          onChange={onChangeProject}
          value={project.status}
        />
        {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
        {!loading && (
          <Select
            label='PM assigned'
            name='projectManager'
            options={metaUsers.distributed_pm}
            onChange={onChangeProject}
            value={
              !project.projectManager
                ? metaUsers.distributed_pm[0].id
                : project.projectManager
            }
          />
        )}
        <TextField
          label='Project title'
          name='title'
          placeholder='Title'
          onChange={onChangeProjectTitle}
          value={project.title}
          validationMsg={validationMsg}
        />
        <DatePicker
          label='Start date'
          name='startDate'
          placeholderText='Click to select start date'
          onChange={onChangeProject}
          value={getDateFromString(project.startDate)}
        />
        <DatePicker
          label='Deadline date'
          name='dueDate'
          placeholderText='Click to select due date'
          onChange={onChangeProject}
          value={getDateFromString(project.dueDate)}
        />
        <DatePicker
          label='Delivered date'
          name='deliveredDate'
          placeholderText='Click to select delivered date'
          onChange={onChangeProject}
          value={getDateFromString(project.deliveredDate)}
        />
        <TextField
          label='Allocated hours'
          name='hoursAllocated'
          placeholder={0}
          type='number'
          onChange={onChangeProject}
          value={project.hoursAllocated}
        />
        <TextField
          label='Number of Front-End Developers'
          name='feDevs'
          placeholder={0}
          type='number'
          onChange={onChangeProject}
          value={project.feDevs}
        />
        <TextField
          label='Number of Back-End Developers'
          name='beDevs'
          type='number'
          placeholder={0}
          onChange={onChangeProject}
          value={project.beDevs}
        />
        <TextField
          label='Number of UX Designer'
          name='uiDevs'
          type='number'
          placeholder={0}
          onChange={onChangeProject}
          value={project.uiDevs}
        />
        <TextField
          label='Number of Specialists'
          name='specialists'
          type='number'
          placeholder={0}
          onChange={onChangeProject}
          value={project.specialists}
        />
        <TextField
          label='Project report link'
          name='reportLink'
          placeholder='Report Link'
          onChange={onChangeProjectReportLink}
          value={project.reportLink}
          validationMsg={validationURLMsg}
        />
        <DeleteProjectMutation
          projectId={project.id}
          companyId={state.curCompanyId}
        >
          <DeleteProjectForm state={state} onChangeState={onChangeState} />
        </DeleteProjectMutation>
      </div>
    </React.Fragment>
  )
}
