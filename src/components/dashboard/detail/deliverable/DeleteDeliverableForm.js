import React, { useState } from 'react'
import { createNotification } from '../../../common/notification'
import Loader from '../../../animation/Loader'

export default function DeleteDeliverableForm ({
  deleteDeliverable,
  loading,
  state,
  onChangeState
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const deliverable = state.selectedItem

  const handleDeleteDeliverable = () => {
    setShowConfirmModal(false)
    if (!deliverable.id) {
      state.selectedItem = null
      onChangeState(state)
      return
    }
    deleteDeliverable({ variables: { deliverableId: deliverable.id } })
      .then(result => {
        if (result.data.deleteDeliverable !== 1) {
          createNotification(
            'error',
            `Deliverable "${deliverable.title}" doesn't exist`
          )
        } else {
          createNotification(
            'success',
            `Deliverable "${deliverable.title}" has been deleted successfully`
          )
          state.selectedItem = null
          onChangeState(state)
        }
      })
      .catch(err => createNotification('error', err.message))
  }

  const onShowDeleteModal = () => {
    if (deliverable.outputs.length > 0) return
    setShowConfirmModal(true)
  }

  return (
    <div className='remove-item'>
      {loading && <Loader height={20} width={150} animation='SimpleLoader' />}
      {!loading && (
        <a
          className='button is-danger is-inverted'
          onClick={onShowDeleteModal}
          disabled={deliverable.outputs.length > 0}
        >
          DELETE DELIVERABLE
        </a>
      )}
      <div className={`modal ${showConfirmModal ? 'is-active' : ''}`}>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Delete Deliverable</p>
          </header>
          <section className='modal-card-body'>
            <h2>
              Do you want to delete the deliverable "{deliverable.title}"?
            </h2>
          </section>
          <footer className='modal-card-foot'>
            <button
              className='button is-success'
              onClick={handleDeleteDeliverable}
            >
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
