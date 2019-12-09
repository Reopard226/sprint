import React from 'react'
import { createNotification } from '../../../common/notification'
import { convertDateToString, isEqualObject } from '../../../common/helpers'
import Loader from '../../../animation/Loader'

export default function TaskForm ({
  createTask,
  updateTask,
  loading,
  state,
  onChangeState
}) {
  const task = state.selectedItem
  const deliverableId = state.curDeliverableId
  const isEdited = !isEqualObject(task, state.selectedOriginItem)

  const handleTaskSubmit = () => {
    if (!isEdited) return
    if (task.title.length < 3) {
      createNotification('error', 'Please input the task data correctly')
      return
    }
    const taskInput = {
      title: task.title,
      description: task.description,
      startDate: convertDateToString(task.startDate),
      endDate: convertDateToString(task.endDate),
      status: task.status
    }

    if (typeof updateTask !== typeof undefined) {
      updateTask({ variables: { taskId: task.id, task: taskInput } })
        .then(result => {
          createNotification(
            'success',
            `Task "${task.title}" has been updated successfully`
          )
          state.selectedOriginItem = Object.assign({}, state.selectedItem)
          onChangeState(state)
        })
        .catch(err => createNotification('error', err.message))
    } else {
      createTask({ variables: { deliverableId, task: taskInput } })
        .then(result => {
          createNotification(
            'success',
            `New task "${task.title}" has been created successfully`
          )
          state.curTaskId = result.data.createTask.id
          state.selectedItem = result.data.createTask
          state.selectedOriginItem = Object.assign({}, state.selectedItem)
          onChangeState(state)
        })
        .catch(err => createNotification('error', err.message))
    }
  }

  return (
    <React.Fragment>
      <div className='item-category'>
        {'Task'}
        {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
        {!loading && (
          <a className={isEdited ? '' : 'disabled'} onClick={handleTaskSubmit}>
            SAVE
          </a>
        )}
      </div>
      <h2 className='item-name'>{task.title}</h2>
    </React.Fragment>
  )
}
