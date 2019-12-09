import React, { useState } from 'react'
import Form from '../../../common/form'
import CreateTaskMutation from '../../../mutations/task/CreateTask'
import TaskForm from './TaskForm'
import UpdateTaskMutation from '../../../mutations/task/UpdateTask'
import DeleteTaskMutation from '../../../mutations/task/DeleteTask'
import DeleteTaskForm from './DeleteTaskForm'
import { mkLengthError } from '../../../common/error'
import { taskStatus } from '../../../queries/dummy-data'

const { TextField, Select } = Form

export default function Task ({ state, onChangeState }) {
  const [titleError, setTitleError] = useState(false)
  const task = state.selectedItem

  const onChangeTask = (name, value) => {
    state.selectedItem[name] = value
    onChangeState(state)
  }

  const onChangeTaskTitle = (name, value) => {
    if (value.length < 3) setTitleError(true)
    else setTitleError(false)
    onChangeTask(name, value)
  }

  const validationMsg = titleError ? mkLengthError('Task title') : ''

  return (
    <React.Fragment>
      <div className='detail-header'>
        {task.id && (
          <UpdateTaskMutation
            task={task}
            deliverableId={state.curDeliverableId}
          >
            <TaskForm state={state} onChangeState={onChangeState} />
          </UpdateTaskMutation>
        )}
        {!task.id && (
          <CreateTaskMutation
            task={task}
            deliverableId={state.curDeliverableId}
          >
            <TaskForm state={state} onChangeState={onChangeState} />
          </CreateTaskMutation>
        )}
      </div>
      <div className='detail-content'>
        <TextField
          label='Task title'
          name='title'
          placeholder='Title'
          onChange={onChangeTaskTitle}
          value={task.title}
          validationMsg={validationMsg}
        />
        <Select
          label='Task status'
          name='status'
          options={taskStatus}
          onChange={onChangeTask}
          value={task.status}
        />
        <DeleteTaskMutation
          deliverableId={state.curDeliverableId}
          taskId={task.id}
        >
          <DeleteTaskForm state={state} onChangeState={onChangeState} />
        </DeleteTaskMutation>
      </div>
    </React.Fragment>
  )
}
