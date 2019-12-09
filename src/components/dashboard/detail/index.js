import React from 'react'
import User from './user'
import Company from './company'
import Project from './project'
import Deliverable from './deliverable'
import Task from './task'

const Detail = ({ state, onChangeState }) => {
  if (!state.selectedItem) return <User />
  switch (state.selectedCategory) {
    case 'company':
      return <Company state={state} onChangeState={onChangeState} />
    case 'project':
      return <Project state={state} onChangeState={onChangeState} />
    case 'deliverable':
      return <Deliverable state={state} onChangeState={onChangeState} />
    case 'task':
      return <Task state={state} onChangeState={onChangeState} />
    default:
      return null
  }
}

export default Detail
