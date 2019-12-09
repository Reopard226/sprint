import React, { useState } from 'react'
import { createNotification } from '../../../common/notification'
import Loader from '../../../animation/Loader'

export default function DeleteOutputForm ({
  deleteOutput,
  loading,
  index,
  state,
  onChangeState
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const output = state.selectedItem.outputs[index]

  const handleDeleteOutput = () => {
    setShowConfirmModal(false)
    if (!output.id) {
      state.selectedItem.outputs.splice(index, 1)
      onChangeState(state)
      return
    }
    deleteOutput({ variables: { outputId: output.id } })
      .then(result => {
        if (result.data.deleteOutput !== 1) {
          createNotification('error', `Output "${output.title}" doesn't exist`)
        } else {
          createNotification(
            'success',
            `Output "${output.title}" has been deleted successfully`
          )
          state.selectedItem.outputs.splice(index, 1)
          onChangeState(state)
        }
      })
      .catch(err => createNotification('error', err.message))
  }

  return (
    <React.Fragment>
      {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
      {!loading && (
        <a className='remove-link' onClick={() => setShowConfirmModal(true)}>
          REMOVE
        </a>
      )}
      <div className={`modal ${showConfirmModal ? 'is-active' : ''}`}>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Delete Output</p>
          </header>
          <section className='modal-card-body'>
            <h2>Do you want to delete the output "{output.title}"?</h2>
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success' onClick={handleDeleteOutput}>
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
    </React.Fragment>
  )
}
