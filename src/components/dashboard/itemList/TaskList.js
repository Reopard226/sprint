import React from 'react'
import { LeadItem, Item } from '../../common/Listtem'
import Loader from '../../animation/Loader'

const TaskList = ({ state, onChangeState, tasks, loading }) => {
  let active = state.curDeliverableId !== -1

  const onClickTaskItem = task => {
    state.selectedItem = Object.assign({}, task)
    state.selectedOriginItem = task
    state.selectedCategory = 'task'
    state.curTaskId = task.id
    onChangeState(state)
  }

  const onCreateTask = () => {
    if (!active) return
    const newTask = {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 1
    }
    state.selectedItem = newTask
    state.selectedCategory = 'task'
    onChangeState(state)
  }

  return (
    <div className='item-list'>
      <LeadItem text={'Task'} onAddItem={onCreateTask} active={active} />
      <div className='item-list-body'>
        {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
        {!loading &&
          tasks &&
          tasks.map(task => {
            return (
              <Item
                key={task.id}
                text={task.title}
                onClickItem={() => onClickTaskItem(task)}
                active={task.id === state.curTaskId}
                clicked={task === state.selectedItem}
              />
            )
          })}
      </div>
    </div>
  )
}
export default TaskList
