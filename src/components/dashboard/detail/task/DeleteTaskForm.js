import React, { useState } from 'react'
import { createNotification } from '../../../common/notification'
import Loader from '../../../animation/Loader'

export default function DeleteTaskForm ({
  deleteTask,
  loading,
  state,
  onChangeState
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const task = state.selectedItem

  const handleDeleteTask = () => {
    setShowConfirmModal(false)
    if (!task.id) {
      state.selectedItem = null
      onChangeState(state)
      return
    }
    deleteTask({ variables: { taskId: task.id } })
      .then(result => {
        if (result.data.deleteTask !== 1) {
          createNotification('error', `Task "${task.title}" doesn't exist`)
        } else {
          createNotification(
            'success',
            `Task "${task.title}" has been deleted successfully`
          )
          state.selectedItem = null
          onChangeState(state)
        }
      })
      .catch(err => createNotification('error', err.message))
  }

  return (
    <div className='remove-item'>
      {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
      {!loading && (
        <a
          className='button is-danger is-inverted'
          onClick={() => setShowConfirmModal(true)}
        >
          DELETE TASK
        </a>
      )}
      <div className={`modal ${showConfirmModal ? 'is-active' : ''}`}>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Delete Task</p>
          </header>
          <section className='modal-card-body'>
            <h2>Do you want to delete the task "{task.title}"?</h2>
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success' onClick={handleDeleteTask}>
              Delete
            </button>
            <button
              className='button'
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  )
}
