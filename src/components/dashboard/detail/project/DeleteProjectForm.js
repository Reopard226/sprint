import React, { useState } from 'react'
import { createNotification } from '../../../common/notification'
import Loader from '../../../animation/Loader'

export default function DeleteProjectForm ({
  deleteProject,
  loading,
  state,
  onChangeState
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const project = state.selectedItem

  const handleDeleteProject = () => {
    setShowConfirmModal(false)
    if (!project.id) {
      state.selectedItem = null
      onChangeState(state)
      return
    }
    deleteProject({ variables: { projectId: project.id } })
      .then(result => {
        if (result.data.deleteProject !== 1) {
          createNotification(
            'error',
            `Project "${project.title}" doesn't exist`
          )
        } else {
          createNotification(
            'success',
            `Project "${project.title}" has been deleted successfully`
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
          DELETE PROJECT
        </a>
      )}
      <div className={`modal ${showConfirmModal ? 'is-active' : ''}`}>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Delete Project</p>
          </header>
          <section className='modal-card-body'>
            <h2>Do you want to delete the project "{project.title}"?</h2>
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success' onClick={handleDeleteProject}>
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
